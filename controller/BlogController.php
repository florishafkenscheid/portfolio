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
    
    public function delete($type, $id) {
        // This is a soft delete, an "undo within x seconds" feature could be implemented but due to time constraints I will just leave this note here.
        $table = $type === 'post' ? 'posts' : 'comments';
        $idField = $type === 'post' ? 'postId' : 'commentId';
        
        $query = "UPDATE $table SET deleted_at = CURRENT_TIMESTAMP 
                    WHERE $idField = :id";
                    
        $this->executeQuery($query, [':id' => $id]);
        $this->redirectToBlog();
    }

    public function edit($type, $id) {
        $view = $type === 'post' ? 'views/editpost.view.php' : 'views/editcomment.view.php'; // If type = post -> editpost else editcomment
        require $view;
    }
    
    public function comment($type, $id) : void {
        // Remove title field
        require 'views/comment.view.php';
    }
    
    public function updatePost($postId) {
        $query = "UPDATE posts SET messageContent = :content 
                 WHERE postId = :postId";
                 
        $this->executeQuery($query, [
            ':content' => $_POST['messageContent'],
            ':postId' => $postId
        ]);
        
        $this->redirectToBlog();
    }

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