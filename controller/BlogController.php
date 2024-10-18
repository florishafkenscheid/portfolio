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
        $posts = array_reverse($this->getPosts());
        $comments = $this->getComments();
        
        foreach ($posts as $post) {
            $this->renderSinglePost($post);
            $this->renderPostComments($post, $comments);
        }
    }

    private function renderSinglePost($post) {
        ?>
        <div class="blog-post">
            <h4><?php echo htmlspecialchars($post['title']); ?></h4>
            <sub><?php echo htmlspecialchars($post['author']); ?></sub>
            <p><?php echo htmlspecialchars($post['messageContent']); ?></p>
            <?php $this->renderBlogControls($post['postId'], 'post'); ?>
        </div>
        <?php
    }

    private function renderPostComments($post, $comments) {
        ?>
        <div class="comments-div">
        <?php
        foreach ($comments as $comment) {
            if ($comment['postId'] == $post['postId']) {
                $this->renderSingleComment($comment);
            }
        }
        ?>
        </div>
        <?php
    }

    private function renderSingleComment($comment) {
        ?>
        <div class="comment-div">
            <sub><?php echo htmlspecialchars($comment['author']) ?></sub>
            <sub><?php echo htmlspecialchars($comment['messageContent']) ?></sub>
            <?php $this->renderBlogControls($comment['commentId'], 'comment'); ?>
        </div>
        <?php
    }
    
    // There's supposed to be input validation as to who can see this but due to time contraints and it being out of the scope of what I want to implement, I have decided to just leave a note here.
    private function renderBlogControls($id, $type) {
        $controls = [
            ['icon' => 'x-solid.svg', 'title' => 'Delete', 'id' => 'delete-svg'],
            ['icon' => 'pen-solid.svg', 'title' => 'Edit', 'id' => 'edit-svg'],
        ];
        
        // Add comment button only for posts
        if ($type === 'post') {
            $controls[] = ['icon' => 'comment-solid.svg', 'title' => 'Comment', 'id' => 'comment-svg'];
        }
        ?>
        <div class="blog-controls"> 
            <?php foreach ($controls as $control): ?>
                <img src="/views/assets/<?php echo $control['icon']; ?>" 
                     class="blog-control-svg" 
                     id="<?php echo $control['id']; ?>" 
                     title="<?php echo $control['title']; ?>" 
                     data-id="<?php echo $id; ?>" 
                     data-type="<?php echo $type; ?>">
            <?php endforeach; ?>
        </div>
        <?php
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
    public function create($type, $postId = 0) {
        if ($type === 'post' && $this->validatePostInput()) {
            $this->createPost();
        } elseif ($type === 'comment' && $this->validateCommentInput()) {
            $this->createComment($postId);
        }
        
        $this->redirectToBlog();
    }

    private function createPost() {
        $query = "INSERT INTO posts (title, author, messageContent) 
                 VALUES (:title, :author, :content)";
                 
        $this->executeQuery($query, [
            ':title' => $_POST['title'],
            ':author' => $_POST['author'],
            ':content' => $_POST['messageContent']
        ]);
    }

    private function createComment($postId) {
        $query = "INSERT INTO comments (postId, author, messageContent) 
                 VALUES (:postId, :author, :content)";
                 
        $this->executeQuery($query, [
            ':postId' => $postId,
            ':author' => $_POST['author'],
            ':content' => $_POST['messageContent']
        ]);
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
    public function getPosts() {
        $query = "SELECT postId, title, author, messageContent 
                 FROM posts 
                 WHERE deleted_at IS NULL 
                 ORDER BY postId";
                 
        return $this->executeQuery($query)->fetchAll(PDO::FETCH_ASSOC);
        // big one liner; executes the query made above, then fetches the answers to the query and returns this as an array.
    }

    public function getPostById($postId) {
        $query = "SELECT * FROM posts WHERE postId = :postId";
        return $this->executeQuery($query, [':postId' => $postId])->fetch(PDO::FETCH_ASSOC);
    }

    public function getCommentById($commentId) {
        $query = "SELECT * FROM comments WHERE commentId = :commentId";
        return $this->executeQuery($query, [':commentId' => $commentId])->fetch(PDO::FETCH_ASSOC);
    }

    public function getComments() {
        $query = "SELECT * FROM comments WHERE deleted_at IS NULL";
        return $this->executeQuery($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Input validation methods
    private function validatePostInput() {
        return isset($_POST['title'], $_POST['author'], $_POST['messageContent']) &&
               !empty($_POST['title']) &&
               !empty($_POST['author']) &&
               !empty($_POST['messageContent']);
    }
    
    private function validateCommentInput() {
        return isset($_POST['author'], $_POST['messageContent']) &&
               !empty($_POST['author']) &&
               !empty($_POST['messageContent']);
    }

    // DB methods
    private function executeQuery($query, $params = []) {
        try {
            $sqlQuery = $this->dbConn->prepare($query);
            $sqlQuery->execute($params);
            return $sqlQuery;
        } catch (PDOException $err) {
            echo "Database error: " . $err->getMessage();
            exit();
        }
    }

    // Misc
    private function redirectToBlog() {
        header("Location: /blog");
        exit();
    }
}


/**
 * When the form is submitted the request method gets changed to post. When this happens it triggers the createPost method.
 */
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $blogController = new BlogController();
//     $blogController->create();
// }