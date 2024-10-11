<?php

require './views/layout/head.php';

?>
<div class="form-div" id="contact-form-div">
    <form method="post" action="" class="form" id="contact-form">
        <label>Your Name</label>
        <input type="text" name="name">
        <label>Your E-Mail</label>
        <input type="text" name="email">
        <label>Message</label>
        <input type="text" name="messageContent">
        <input type="submit" value="Submit">
    </form>
</div>

<?php

require './views/layout/footer.php';