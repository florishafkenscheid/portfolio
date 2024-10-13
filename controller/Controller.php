<?php

class Controller {
    // Methods
    public static function index($path = 'error') {
        $title = ucfirst($path);

        require "./views/$path.view.php";
    }
}