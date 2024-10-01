<?php

class Controller {
    function redirect($path) {
        require "./views/$path.view.php";
    }
}