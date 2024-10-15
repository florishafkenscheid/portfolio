<?php

class BaseController {
    // Methods
    /**
     * Takes in a variable $path and puts this into a require statement that links to the relevant view.
     * @param string $path
     * @return void
     */
    public static function index(string $path = 'home') {
        $title = $path;
        require "./views/$path.view.php";
    }
}