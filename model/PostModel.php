<?php

require_once 'controller/DatabaseController.php';

class PostModel {
    private $dbConn;

    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();

        // Ik heb overwogen om hier een "create table posts if not exists" in de error handling te maken maar heb besloten dit niet te doen omdat bij het instellen van de webpagina ook database prep hoort.
    }

    public function getPosts() : array {
        $sqlQuery = $this->dbConn->prepare("SELECT title, author, messageContent FROM posts WHERE isDeleted = 0 ORDER BY postId");
        $sqlQuery->execute();
        return $sqlQuery->fetchAll(PDO::FETCH_ASSOC);  
    }

    public function createPost($title, $author, $messageContent) : void {
        try {
            $sqlQuery = $this->dbConn->prepare("INSERT INTO posts (title, author, messageContent) VALUES (:title, :author, :content)");

            $sqlQuery->bindParam(":title", $title);
            $sqlQuery->bindParam(":author", $author);
            $sqlQuery->bindParam(":content", $messageContent);

            $sqlQuery->execute();
        } catch (PDOException $err) {
            throw new Exception("Failed to create post: " . $err);
        }
    }

    public function deletePost($postId) : void {
        try {
            $sqlQuery = $this->dbConn->prepare("DELETE * FROM posts WHERE postId = :postId");

            $sqlQuery->bindParam(":postId", $postId);

            $sqlQuery->execute();
        } catch (PDOException $err) {
            throw new Exception("Failed to delete post: ". $err);
        }
    }
}