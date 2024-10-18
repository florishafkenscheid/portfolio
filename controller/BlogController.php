<?php

include 'controller/DatabaseController.php';

class BlogController extends BaseController { 
    private $dbConn;

    /**
     * Constructs a new DatabaseController and saves the db connection in private $dbConn variable.
     */
    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();
    }

    public function index($path = 'blog') {
        parent::index($path);
    }
    
    /**
     * Turns all of the posts in the database into divs with class blog-post.
     * 
     * First calls getPosts from the stored dbConn, then reverses the array which it got, so the posts are from latest -> oldest. Then turns on output buffering to construct html code, which it then flushes to send it to the blog.view. The whole proces of buffering is done in a loop so every post gets rendered.
     * 
     * @return void
     */
    public function renderPosts() {
        $posts = array_reverse(self::getPosts());
        $comments = self::getComments();
        
        foreach ($posts as $post) {
            ob_start(); // Start output buffering for constructing html code
            ?>
            <div class="blog-post">
                <h4><?php echo $post['title']; ?></h4>
                <sub><?php echo $post['author']; ?></sub>
                <p><?php echo $post['messageContent']; ?></p>
                <?php self::renderBlogPostControls($post); ?>
            </div>
            <div class="comments-div"> <?php
                self::renderComments($post, $comments);
          ?></div>
            <?php
            ob_end_flush(); // Flush the html to actually render it
        }
    }

    // There's supposed to be input validation as to who can see this but due to time contraints and it being out of the scope of what I want to implement, I have decided to just leave a note here.
    public function renderBlogPostControls($post) {
        ob_start(); ?>
        <div class="blog-controls"> 
            <img src="/views/assets/x-solid.svg" class="blog-control-svg" id="delete-svg" title="Delete" data-id="<?php echo $post['postId']; ?>" data-type="post">
            <img src="/views/assets/pen-solid.svg" class="blog-control-svg" id="edit-svg" title="Edit" data-id="<?php echo $post['postId']; ?>" data-type="post">
            <img src="/views/assets/comment-solid.svg" class="blog-control-svg" id="comment-svg" title="Comment" data-id="<?php echo $post['postId']; ?>" data-type="post">
        </div>

        <?php
        ob_end_flush();
    }

    public function renderBlogCommentControls($comment) {
        ob_start(); ?>
        <div class="blog-controls"> 
            <img src="/views/assets/x-solid.svg" class="blog-control-svg" id="delete-svg" title="Delete" data-id="<?php echo $comment['commentId']; ?>" data-type="comment">
            <img src="/views/assets/pen-solid.svg" class="blog-control-svg" id="edit-svg" title="Edit" data-id="<?php echo $comment['commentId']; ?>" data-type="comment">
        </div>

        <?php
        ob_end_flush();
    }

    /**
     * Renders all of the comments to the screen. To be called only in renderPosts()
     * 
     * Takes in an array posts, array of comments and loops over the comments array, then pairs every relevant comment to the postId given. This then starts the output buffering and constructs the relevant html code. This code gets flushed which makes it visible on the website.
     * 
     * @param array $post
     * @param array $comments
     * @return void
     */
    public function renderComments(array $post, array $comments) {
        foreach ($comments as $comment) {
            if ($comment['postId'] == $post['postId']) {
                ob_start();
                ?>
                <div class="comment-div">
                    <sub><?php echo $comment['author'] ?></sub>
                    <sub><?php echo $comment['messageContent'] ?></sub>
                    <?php self::renderBlogCommentControls($comment); ?>
                </div>
                <?php
                ob_end_flush();
            }
        }
    }
    
    /**
     * Takes $_POST info to construct a new entry in the posts table. 
     * 
     * Takes in the info from the $_POST variable and checks type with arguments sends sqlQuery to the DB, then refreshes the page so the changes actually load.
     * 
     * @param string $title
     * @param string $author
     * @param string $messageContent
     * @throws \Exception
     * @return void
     */
    public function create($type, $postId = 0) : void {
        if ($type == 'post') {
            if (isset($_POST['title']) && isset($_POST['author']) && isset($_POST['messageContent'])) {
                try {
                    $sqlQuery = $this->dbConn->prepare("INSERT INTO posts (title, author, messageContent) VALUES (:title, :author, :content)");

                    $sqlQuery->bindParam(":title", $_POST['title']);
                    $sqlQuery->bindParam(":author", $_POST['author']);
                    $sqlQuery->bindParam(":content", $_POST['messageContent']);

                    $sqlQuery->execute();
                } catch (PDOException $err) {
                    throw new Exception("Failed to create post: " . $err);
                }
            }
        } elseif ($type == 'comment') {
            if (isset($_POST['author']) && isset($_POST['messageContent'])) {
                try {
                    $sqlQuery = $this->dbConn->prepare("INSERT INTO comments (postId, author, messageContent) VALUES (:postId, :author, :content)");

                    $sqlQuery->bindParam(":postId", $postId);
                    $sqlQuery->bindParam(":author", $_POST['author']);
                    $sqlQuery->bindParam(":content", $_POST['messageContent']);

                    $sqlQuery->execute();
                } catch (PDOException $err) {
                    throw new Exception("Failed to create post: " . $err);
                }
            }
        }
        header("Location: /blog"); // Couldn't put this into the index function because it causes problems, so I have to write un-DRY code.. :(
        exit();
    }
    
    /**
     * Soft deletes a post from the posts table given a postId.
     * @param int $postId
     * @throws \Exception
     * @return void
     */
    public function delete($type, $id) : void {
        // This is a soft delete, an "undo within x seconds" feature could be implemented but due to time constraints I will just leave this note here.
        if ($type == 'post') {
            try {
                $sqlQuery = $this->dbConn->prepare("UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE postId = :postId");

                $sqlQuery->bindParam(":postId", $id);

                $sqlQuery->execute();
            } catch (PDOException $err) {
                throw new Exception("Failed to delete post: " . $err);
            }
        } elseif ($type == 'comment') {
            try {
                $sqlQuery = $this->dbConn->prepare("UPDATE comments SET deleted_at = CURRENT_TIMESTAMP where commentId = :commentId");

                $sqlQuery->bindParam(":commentId", $id);

                $sqlQuery->execute();
            } catch (PDOException $err) {
                throw new Exception("Failed to delete comment: " . $err);
            }
        }
        header("Location: /blog");
        exit();
    }

    public function edit($type, $id) : void {
        // Edit the form fields
        if ($type == 'post') {
            require 'views/editpost.view.php';
        } else {
           require 'views/editcomment.view.php';
        }
    }
    
    public function comment($type, $id) : void {
        // Remove title field
        require 'views/comment.view.php';
    }
    
    public function updatePost($postId) : never {
        try {
        $sqlQuery = $this->dbConn->prepare("UPDATE posts SET messageContent = :content WHERE postId = :postId");
        $sqlQuery->bindParam(":content", $_POST['messageContent']);
        $sqlQuery->bindParam(":postId", $postId);
        $sqlQuery->execute();
        } catch (PDOException $err) {
            "Failed to update post: " . $err;
        }
        header("Location: /blog");
        exit();
    }

    public function updateComment($commentId) : never {
        try {
        $sqlQuery = $this->dbConn->prepare("UPDATE comments SET messageContent = :content WHERE commentId = :commentId");
        $sqlQuery->bindParam(":content", $_POST['messageContent']);
        $sqlQuery->bindParam(":commentId", $commentId);
        $sqlQuery->execute();
        } catch (PDOException $err) {
            "Failed to update post: " . $err;
        }
        header("Location: /blog");
        exit();
    }
    
    // Getters
    
    /**
     * Sets up the query which fetches the title, author and messageContent from posts that aren't deleted. It then returns this info as an array.
     * @throws \Exception
     * @return array
     */
    public function getPosts() : array {
        try {
            $sqlQuery = $this->dbConn->prepare("SELECT postId, title, author, messageContent FROM posts WHERE deleted_at IS NULL ORDER BY postId");
            $sqlQuery->execute();
            return $sqlQuery->fetchAll(PDO::FETCH_ASSOC);  
        } catch (PDOException $err) {
            throw new Exception("Failed to get posts: " . $err);
        }
    }

    public function getPostById($postId) {
        $sqlQuery = $this->dbConn->prepare("SELECT * FROM posts WHERE postId = :postId");
        $sqlQuery->bindParam(":postId", $postId);
        $sqlQuery->execute();
        return $sqlQuery->fetch(PDO::FETCH_ASSOC);
    }

    public function getCommentById($commentId) {
        $sqlQuery = $this->dbConn->prepare("SELECT * FROM comments WHERE commentId = :commentId");
        $sqlQuery->bindParam(":commentId", $commentId);
        $sqlQuery->execute();
        return $sqlQuery->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getComments() : array {
        try {
            $sqlQuery = $this->dbConn->prepare("SELECT * FROM comments WHERE deleted_at IS NULL");

            $sqlQuery->execute();
            
            return $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $err) {
            throw new Exception("Failed to get comments: " . $err);
        }
    }
}


/**
 * When the form is submitted the request method gets changed to post. When this happens it triggers the createPost method.
 */
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $blogController = new BlogController();
//     $blogController->create();
// }