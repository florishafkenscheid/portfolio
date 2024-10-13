<?php

class ErrorController extends Controller {
    public static function index($path = 'error') {
        parent::index($path);
        $h1Title = '404 Page not found';
    }
}