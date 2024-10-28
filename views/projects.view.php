<?php
require './views/layout/head.php';

$projectController = new ProjectsController();
$projectController->renderProjects();

// <?php
require './views/layout/footer.php';