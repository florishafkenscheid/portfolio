<?php

require_once 'controller/DatabaseController.php';

/**
 * Connects to the database and handles post logic.
 */
class PostModel extends DatabaseController {
    /**
     * Sets up the query which fetches the title, author and messageContent from posts that aren't deleted. It then returns this info as an array.
     * @throws \Exception
     * @return array
     */
    public function getPosts() : array {
        try {
            $sqlQuery = $this->dbConn->prepare("SELECT title, author, messageContent FROM posts WHERE is_deleted = 0 ORDER BY postId");
            $sqlQuery->execute();
            return $sqlQuery->fetchAll(PDO::FETCH_ASSOC);  
        } catch (PDOException $err) {
            throw new Exception("Failed to get posts: " . $err);
        }
    }

    /**
     * Takes parameters to construct a new entry in the posts table.
     * @param string $title
     * @param string $author
     * @param string $messageContent
     * @throws \Exception
     * @return void
     */
    public function createPost(string $title, string $author, string $messageContent) : void {
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

    /**
     * Soft deletes a post from the posts table given a postId.
     * @param int $postId
     * @throws \Exception
     * @return void
     */
    public function deletePost(int $postId) : void {
        try {
            $sqlQuery = $this->dbConn->prepare("UPDATE posts SET is_deleted = 1 WHERE postId = :postId ");

            $sqlQuery->bindParam(":postId", $postId);

            $sqlQuery->execute();
        } catch (PDOException $err) {
            throw new Exception("Failed to delete post: " . $err);
        }
    }
}