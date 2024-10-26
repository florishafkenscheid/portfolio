<?php

include 'controller/DatabaseController.php';

// Refactored with the help of Claude 3.5 Sonnet. I chose this LLM based on so called "LLM leaderboards", where Claude 3.5 Sonnet scored highest among its peers in terms of code refactoring. I gave Claude this file at commit "3d41d278" and told it to refactor it while letting its imagination run wild. It then proceeded to add a lot of very nice features like type safety and splitting this code into a BlogViewRenderer class and a BlogService class, which I told it to not do seeing as that would be way out of scope of my abilities. It proceeded to give me examples of how I could improve my methods which I then implemented into working code. The website was working correctly and without problems at the given commit, but I found the code hard to maintain and not readable, which is why I asked Claude for help.

class BlogController extends BaseController { 
    private $dbConn;

    /**
     * Constructs a new DatabaseController and saves the db connection in private $dbConn variable.
     */
    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();
    }

    /**
     * Calls parents index but with the correct path.
     * @param mixed $path
     * @return void
     */
    public function index($path = 'blog') {
        parent::index($path);
    }
    
    /**
     * Renders all posts and comments onto the blog page.
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

    /**
     * Renders a single post onto the blog page. For use in a loop.
     * @param mixed $post
     * @return void
     */
    private function renderSinglePost($post) {
        ?>
        <div class="blog-post">
            <h4><?php echo htmlspecialchars($post['title']); ?></h4>
            <sub><?php echo htmlspecialchars($post['author']); ?></sub>
            <p><?php echo htmlspecialchars($post['messageContent']); ?></p>
            <?php $this->renderBlogControls($post['id'], 'post'); ?>
        </div>
        <?php
    }

    /**
     * Renders all of the comments of a given post.
     * @param mixed $post
     * @param mixed $comments
     * @return void
     */
    private function renderPostComments($post, $comments) {
        ?>
        <div class="comments-div">
        <?php
        foreach ($comments as $comment) {
            if ($comment['id'] == $post['id']) {
                $this->renderSingleComment($comment);
            }
        }
        ?>
        </div>
        <?php
    }

    /**
     * Renders a single comment given that comment as an input.
     * @param mixed $comment
     * @return void
     */
    private function renderSingleComment($comment) {
        ?>
        <div class="comment-div">
            <sub><?php echo htmlspecialchars($comment['author']) ?></sub>
            <sub><?php echo htmlspecialchars($comment['messageContent']) ?></sub>
            <?php $this->renderBlogControls($comment['commentId'], 'comment'); ?>
        </div>
        <?php
    }
    
    /**
     * Renders the blog controls
     * @param mixed $id
     * @param mixed $type
     * @return void
     */
    private function renderBlogControls($id, $type) {
        // There's supposed to be input validation as to who can see this but due to time contraints and it being out of the scope of what I want to implement, I have decided to just leave a note here.
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
     * A method for the router to call, takes in a type and optional id to validate input and then actually create said post or comment.
     * @param mixed $type
     * @param mixed $id
     * @return void
     */
    public function create($type, $id = 0) {
        if ($type === 'post' && $this->validatePostInput()) {
            $this->createPost();
        } elseif ($type === 'comment' && $this->validateCommentInput()) {
            $this->createComment($id);
        }
        
        $this->redirectToBlog();
    }

    /**
     * Creates a new post in the database.
     * @return void
     */
    private function createPost() {
        $query = "INSERT INTO posts (title, author, messageContent) 
                 VALUES (:title, :author, :content)";
                 
        $this->executeQuery($query, [
            ':title' => $_POST['title'],
            ':author' => $_POST['author'],
            ':content' => $_POST['messageContent']
        ]);
    }

    /**
     * Creates a new comment in the database.
     * @param mixed $id
     * @return void
     */
    private function createComment($id) {
        $query = "INSERT INTO comments (id, author, messageContent) 
                 VALUES (:id, :author, :content)";
                 
        $this->executeQuery($query, [
            ':id' => $id,
            ':author' => $_POST['author'],
            ':content' => $_POST['messageContent']
        ]);
    }
    
    /**
     * Soft deletes a post or comment depending on the given parameters with the id, also given in the parameters.
     * @param mixed $type
     * @param mixed $id
     * @return void
     */
    public function delete($type, $id) {
        // This is a soft delete, an "undo within x seconds" feature could be implemented but due to time constraints I will just leave this note here.
        $table = $type === 'post' ? 'posts' : 'comments';
        $idField = $type === 'post' ? 'id' : 'commentId';
        
        $query = "UPDATE $table SET deleted_at = CURRENT_TIMESTAMP 
                    WHERE $idField = :id";
                    
        $this->executeQuery($query, [':id' => $id]);
        $this->redirectToBlog();
    }

    /**
     * A method to be called by the router. Calls the correct view depending on given type.
     * @param mixed $type
     * @param mixed $id
     * @return void
     */
    public function edit($type, $id) {
        $view = $type === 'post' ? 'views/editpost.view.php' : 'views/editcomment.view.php'; // If type = post -> editpost else editcomment
        require $view;
    }
    
    /**
     * A method to be called by the router. Calls the comment view file. Takes in $type and $id which the view uses.
     * @param mixed $type
     * @param mixed $id
     * @return void
     */
    public function comment($type, $id) : void {
        // Remove title field
        require 'views/comment.view.php';
    }
    
    /**
     * Updates a post in the database given a id. Takes $_POST data for the message content.
     * @param mixed $id
     * @return void
     */
    public function updatePost($id) {
        $query = "UPDATE posts SET messageContent = :content 
                 WHERE id = :id";
                 
        $this->executeQuery($query, [
            ':content' => $_POST['messageContent'],
            ':id' => $id
        ]);
        
        $this->redirectToBlog();
    }

    /**
     * Updates a comment in the database given a commentId. Takes $_POST data for the message content.
     * @param mixed $commentId
     * @return void
     */
    public function updateComment($commentId) {
        $query = "UPDATE comments SET messageContent = :content 
                 WHERE commentId = :commentId";
                 
        $this->executeQuery($query, [
            ':content' => $_POST['messageContent'],
            ':commentId' => $commentId
        ]);
        
        $this->redirectToBlog();
    }
    
    // Getters
    /**
     * Gets all posts from the database which are not deleted, ordered by id ascending.
     * @return array
     */
    public function getPosts() {
        $query = "SELECT id, title, author, messageContent 
                 FROM posts 
                 WHERE deleted_at IS NULL 
                 ORDER BY id";
                 
        return $this->executeQuery($query)->fetchAll(PDO::FETCH_ASSOC);
        // big one liner; executes the query made above, then fetches the answers to the query and returns this as an array.
    }

    /**
     * Gets a post from the database by id.
     * @param mixed $id
     * @return mixed
     */
    public function getPostById($id) {
        $query = "SELECT * FROM posts WHERE id = :id";
        return $this->executeQuery($query, [':id' => $id])->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Gets a comment from the database by commentId
     * @param mixed $commentId
     * @return mixed
     */
    public function getCommentById($commentId) {
        $query = "SELECT * FROM comments WHERE commentId = :commentId";
        return $this->executeQuery($query, [':commentId' => $commentId])->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Gets all comments from the database which are not deleted.
     * @return array
     */
    public function getComments() {
        $query = "SELECT * FROM comments WHERE deleted_at IS NULL";
        return $this->executeQuery($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Input validation methods
    /**
     * Validates the $_POST data with regards to a post.
     * @return bool
     */
    private function validatePostInput() {
        return isset($_POST['title'], $_POST['author'], $_POST['messageContent']) &&
               !empty($_POST['title']) &&
               !empty($_POST['author']) &&
               !empty($_POST['messageContent']);
    }
    
    /**
     * Validates the $_POST data with regards to a comment.
     * @return bool
     */
    private function validateCommentInput() {
        return isset($_POST['author'], $_POST['messageContent']) &&
               !empty($_POST['author']) &&
               !empty($_POST['messageContent']);
    }

    // DB methods
    /**
     * Simply removes repeated code everywhere with a clean function, consider it a mini query builder.
     * @param mixed $query
     * @param mixed $params
     * @return bool|PDOStatement
     */
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
    /**
     * Sets the URL back to /blog, if not done causes problems with rendering the correct view.
     * @return never
     */
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