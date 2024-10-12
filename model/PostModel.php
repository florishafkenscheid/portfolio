<?php

require_once 'controller/DatabaseController.php';

class PostModel {
    private $dbConn;

    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();

        $createTable = $this->dbConn->prepare("CREATE TABLE IF NOT EXISTS posts (
        postId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(64) NOT NULL,
        messageContent TEXT NOT NULL,
        author VARCHAR(32) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )");

        $createTable->execute();
    }

    public function getPosts() : array {
        $sqlQuery = $this->dbConn->prepare("SELECT * from posts");
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
            throw new Exception("Failed to create post: " . $err->getMessage());
        }
    }
}