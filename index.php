<?php

include './controller/Controller.php';
include './controller/HomeController.php';
include './controller/ProjectsController.php';
include './controller/InfoController.php';
include './controller/ContactController.php';

switch ($_SERVER['REQUEST_URI']) {
    case '/projects':
        $projectsController = new ProjectsController();
        $projectsController->redirect('projects');
    
    case '/info':
        $infoController = new InfoController();
        $infoController->redirect('info');

    case '/contact':
        $contactController = new ContactController();
        $contactController->redirect('contact');

    default:
        $homeController = new HomeController();
        $homeController->redirect('home');
}