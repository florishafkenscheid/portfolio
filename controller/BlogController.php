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
        $comments = $this->postModel->getComments();
        
        foreach ($posts as $post) {
            ob_start(); // Start output buffering for constructing html code
            ?>
            <div class="blog-post">
                <h4><?php echo $post['title']; ?></h4>
                <sub><?php echo $post['author']; ?></sub>
                <p><?php echo $post['messageContent']; ?></p>
                <div class="blog-controls"> <!-- There's supposed to be input validation as to who can see this but due to time contraints and it being out of the scope of what I want to implement, I have decided to just leave a note here. -->
                    <img src="views/assets/x-solid.svg" class="blog-control-svg" id="delete-svg" style="opacity: 1;"></img>
                    <img src="views/assets/pen-solid.svg" class="blog-control-svg" id="edit-svg">
                    <img src="views/assets/comment-solid.svg" class="blog-control-svg" id="comment-svg">
                </div>
            </div>
            <div class="comments-div"> <?php
                self::renderComments($post['postId'], $comments);
          ?></div>
            <?php
            ob_end_flush(); // Flush the html to actually render it
        }
    }

    /**
     * Renders all of the comments to the screen. To be called only in renderPosts()
     * 
     * Takes in an int postId, array of comments and loops over the comments array, then pairs every relevant comment to the postId given. This then starts the output buffering and constructs the relevant html code. This code gets flushed which makes it visible on the website.
     * 
     * @param int $postId
     * @param array $comments
     * @return void
     */
    public function renderComments(int $postId, array $comments) {
        foreach ($comments as $comment) {
            if ($comment['postId'] == $postId) {
                ob_start();
                ?>
                <div class="comment-div">
                    <sub><?php echo $comment['author'] ?></sub>
                    <sub><?php echo $comment['messageContent'] ?></sub>
                </div>
                <?php
                ob_end_flush();
            }
        }
    }
    
    /**
     * Takes in the info from the $_POST variable and passes that onto the postModel createPost method, then refreshes the page so the changes actually load.
     * @return void
     */
    public function createPost() : void {
        $this->postModel->createPost($_POST['title'], $_POST['author'], $_POST['messageContent']);
        parent::index('blog');
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