<?php

require './views/layout/head.php';

?>

<div class="blog">
    <div class="form-div" id="blog-form-div">
        <form method="post" class="form" id="blog-form" action="/blog/create/comment/<?php echo $id ?>">
            <h3>Comment on message</h3>
            <label for="author">Author</label>
            <textarea id="author" name="author"  maxlength="64" required></textarea>
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