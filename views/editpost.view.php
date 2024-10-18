<?php

require './views/layout/head.php';

$blogController = new BlogController();
$post = $blogController->getPostById($id);

?>

<div class="blog">
    <div class="form-div" id="blog-form-div">
        <form method="post" class="form" id="blog-form" action="/blog/updatePost/<?php echo $id ?>">
            <h3>Edit post</h3>
            <label for="author">Author</label>
            <textarea id="author" name="author"  maxlength="64" spellcheck="false" readonly disabled><?php echo htmlspecialchars($post['author']); ?></textarea>
            <label for="title">Title</label>
            <textarea id="title" name="title"  maxlength="32" spellcheck="false" readonly disabled><?php echo htmlspecialchars($post['title']); ?></textarea>
            <label for="messageContent">Message</label>
            <textarea id="messageContent" name="messageContent" spellcheck="false" required><?php echo htmlspecialchars($post['messageContent']); ?></textarea>
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