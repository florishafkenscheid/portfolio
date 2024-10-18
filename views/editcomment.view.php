<?php

require './views/layout/head.php';

$blogController = new BlogController();
$comment = $blogController->getCommentById($id);

?>

<div class="blog">
    <div class="form-div" id="blog-form-div">
        <form method="post" class="form" id="blog-form" action="/blog/updateComment/<?php echo $id ?>">
            <h3>Edit comment</h3>
            <label for="author">Author</label>
            <textarea id="author" name="author"  maxlength="64" spellcheck="false" readonly><?php echo htmlspecialchars($comment['author']); ?></textarea>
            <label for="messageContent">Message</label>
            <textarea id="messageContent" name="messageContent" spellcheck="false" required><?php echo htmlspecialchars($comment['messageContent']); ?></textarea>
            <input type="submit" value="Edit">
        </form>
    </div>
    <div class="posts-div" id="blog-posts-div">
        <?php /* Display posts */
        $blogController->renderPosts();
        ?>
    </div>
</div>

<?php

require './views/layout/footer.php';