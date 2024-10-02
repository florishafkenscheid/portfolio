<?php

class Controller {
    // Methods
    public static function redirect($path = 'home') {
        require "./views/$path.view.php";
    }
}