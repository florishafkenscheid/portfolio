<?php

require './views/layout/head.php';

?>

<form method="post" action="">
    <label>Your Name</label><br>
    <input type="text" name="name"><br>
    <label>Your E-Mail</label><br>
    <input type="text" name="email"><br>
    <label>Message</label><br>
    <input type="text" name="messageContent"><br>
    <input type="submit" value="submit">
</form>

<?php

require './views/layout/footer.php';
