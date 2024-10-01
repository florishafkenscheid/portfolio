<?php

switch ($_SERVER['REQUEST_URI']) {
    case '/projects':
        require './views/projects/projects.view.php';
    
    case '/info':
        require './views/info/info.view.php';

    case '/contact':
        require './views/contact/contact.view.php';

    default:
        require './views/home/home.view.php';
}

