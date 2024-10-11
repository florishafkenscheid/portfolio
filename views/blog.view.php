<?php

require './views/layout/head.php';

?>

<div class="form-div" id="blog-form-div">
    <form method="post" action="" class="form" id="blog-form">
        <h2>Create new message</h2>
        <label>Author</label>
        <textarea id="author" required></textarea>
        <label>Title</label>
        <textarea id="title" required></textarea>
        <label>Message</label>
        <textarea id="messageContent" required></textarea>
        <input type="submit" value="Submit">
    </form>
</div>

<?php

require './views/layout/footer.php';