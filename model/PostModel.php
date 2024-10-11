<?php

include 'controller/DatabaseController.php';

class PostModel {
    private $dbConn;

    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();
    }

    public function getPosts() : array {
        $sqlQuery = $this->dbConn->prepare("SELECT * from posts");
        $sqlQuery->execute();
        return $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createPost($title, $author, $content) : void {
        try {
            $sqlQuery = $this->dbConn->prepare("INSERT INTO posts (title, author, content) VALUES (:title, :author, :content");

            $sqlQuery->bindParam(":title", $title);
            $sqlQuery->bindParam(":author", $author);
            $sqlQuery->bindParam(":content", $content);

            $sqlQuery->execute();
        } catch (PDOException $err) {
            throw new Exception("Failed to create post: " . $err->getMessage());
        }
    }
}