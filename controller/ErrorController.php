<?php

class ErrorController extends BaseController {
    public static function index($path = 'error') {
        parent::index($path);
        $h1Title = '404 Page not found';
    }
}