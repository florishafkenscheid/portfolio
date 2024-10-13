<?php

require './views/layout/head.php';

?>

<div class="form-div" id="contact-form-div">
    <form method="post" action="" class="form" id="contact-form">
        <h3>Contact me!</h3>
        <label>Your Name</label>
        <textarea id="name" required></textarea>
        <label>Your E-Mail</label>
        <textarea id="email" required></textarea>
        <label>Message</label>
        <textarea id="messageContent" required></textarea>
        <input type="submit" value="Submit">
    </form>
</div>

<?php

require './views/layout/footer.php';