<?php

class BlogController extends Controller { 
    private $postModel;

    function __construct() {
        require_once 'model/PostModel.php';
        $this->postModel = new PostModel();
    }

    public static function index($path = 'blog') : void {
        parent::index($path);
    }

    public function getPosts() : array {
        return $this->postModel->getPosts();
    }

    public function renderPost($post) {
        ob_start(); // Start output buffering for constructing html code
        ?>
        <div class="blog-post">
            <h4><?php echo $post['title']; ?></h4>
            <sub><?php echo $post['author']; ?></sub>
            <p><?php echo $post['messageContent']; ?></p>
            <!-- <img src="views/assets/x-solid.svg" id="delete-svg"></img> -->
        </div>
        <?php
        ob_end_flush(); // Flush the html to actually render it
    }

    public function createPost() : void {
        $this->postModel->createPost($_POST['title'], $_POST['author'], $_POST['messageContent']);
        self::index();
    }

    public function deletePost() : void {
        
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $blogController = new BlogController();
    $blogController->createPost();
}