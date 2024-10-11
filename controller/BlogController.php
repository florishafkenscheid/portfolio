<?php

class BlogController extends Controller { 
    private $postModel;

    function __construct() {
        require 'model/PostModel.php';
        $this->postModel = new PostModel();
    }

    public static function index($path = 'home') : void {
        $controller = new self();
        $controller->getPosts();
        parent::index($path);
    }

    public function getPosts() : array {
        return $this->postModel->getPosts();
    }

    public function createPost() : void {
        $this->postModel->createPost($_POST['title'], $_POST['author'], $_POST['messageContent']);
        self::index();
    }
}