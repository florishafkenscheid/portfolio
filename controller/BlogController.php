<?php

class BlogController extends BaseController { 
    private $postModel;

    /**
     * Constructs a new PostModel and saves this in a private variable $postModel.
     */
    function __construct() {
        require_once 'model/PostModel.php';
        $this->postModel = new PostModel();
    }

    
    /**
     * Turns all of the posts in the database into divs with class blog-post.
     * 
     * First calls getPosts from the stored postModel, then reverses the array which it got, so the posts are from latest -> oldest. Then turns on output buffering to construct html code, which it then flushes to send it to the blog.view. The whole proces of buffering is done in a loop so every post gets rendered.
     * 
     * @return void
     */
    public function renderPosts() {
        $posts = array_reverse($this->postModel->getPosts());
        foreach ($posts as $post) {
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
    }
    
    /**
     * Takes in the info from the $_POST variable and passes that onto the postModel createPost method, then refreshes the page so the changes actually load.
     * @return void
     */
    public function createPost() : void {
        $this->postModel->createPost($_POST['title'], $_POST['author'], $_POST['messageContent']);
        self::index();
    }

    public function deletePost() : void {
        
    }
}


/**
 * When the form is submitted the request method gets changed to post. When this happens it triggers the createPost method.
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $blogController = new BlogController();
    $blogController->createPost();
}