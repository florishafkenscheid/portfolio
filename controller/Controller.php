<?php

class Controller {
    // Methods
    public static function index($path = 'home') {
        $title = $path;
        require "./views/$path.view.php";
    }
}