<?php

require './views/layout/head.php';

?>

<div class="blog">
    <div class="form-div" id="blog-form-div">
        <form method="post" class="form" id="blog-form" action="">
            <h3>Post new message</h3>
            <label for="author">Author</label>
            <textarea id="author" name="author" required></textarea>
            <label for="title">Title</label>
            <textarea id="title" name="title" required></textarea>
            <label for="messageContent">Message</label>
            <textarea id="messageContent" name="messageContent" required></textarea>
            <input type="submit" value="Post">
        </form>
    </div>
    <div class="posts-div" id="blog-posts-div">
        <?php /* Display posts */
        $blogController = new BlogController();

        $blogController->renderPosts();
        
        ?>
    </div>
</div>

<?php

require './views/layout/footer.php';