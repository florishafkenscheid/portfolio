<?php

// require './views/layout/head.php';

switch ($_SERVER['REQUEST_URI']) {
    case '/info':
        require './views/info/info.view.php';

    default:
        require './views/home/home.view.php';
    
}

?>