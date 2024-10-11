<?php

include 'controller/DatabaseController.php';

class ContactController extends Controller { 
    public static function index($path = 'home') {
        $dbController = new DatabaseController();
        $dbConnection = $dbController->dbConnect();



        parent::index($path);
    }
}