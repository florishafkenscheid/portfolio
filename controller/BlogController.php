<?php

class BlogController extends Controller { 
    private $postModel;

    function __construct() {
        require_once 'model/PostModel.php';
        $this->postModel = new PostModel();
    }

    public static function index($path = 'blog') : void {
        parent::index($path);
        
        $controller = new self();
        $controller->showPosts();
    }

    public function showPosts() {
        $posts = $this->postModel->getPosts();
        foreach ($posts as &$post) {
            ?>
            
            <?php
        }
    }

    public function createPost() : void {
        $this->postModel->createPost($_POST['title'], $_POST['author'], $_POST['messageContent']);
        self::index();
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $blogController = new BlogController();
    $blogController->createPost();
}