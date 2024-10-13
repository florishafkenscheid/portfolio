<?php

class DatabaseController {
    public function dbConnect() : PDO { // Return PDO for later usage, instead of doing everything in 1 method.
        $servername = "localhost";
        $username = "root";
        $dbName = "profileapp";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username);

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $err) {
            $conn->rollBack();
            throw new Exception($err);
        }        
    }

    public function dbDisconnect(&$conn) : bool { // Pass $conn by reference, so it actually references the PDO and not just a copy.
        try {
            $conn = null;
            return true;
        } catch (PDOException $err) {
            throw new Exception($err);
        }
    }
    
    private static function processQueryString(): array {
        $queryString = explode('&', $_SERVER['QUERY_STRING']);
        
        return [
            'name' => $queryString[0],
            'email' => $queryString[1],
            'messageContent' => $queryString[2]
        ];
    }
}
// $queryString = self::processQueryString();

// $conn->beginTransaction();
// $conn->exec(
//     "CREATE TABLE IF NOT EXISTS messages (
//         postId INT AUTO_INCREMENT PRIMARY KEY,
//         fullName VARCHAR(32) NOT NULL,
//         email VARCHAR(64) NOT NULL,
//         messageContent TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )"
// );
// $conn->exec(
//     "INSERT INTO messages (fullName, email, messageContent)
//     VALUES (".$queryString['name'].", ".$queryString['email'].", ".$queryString['messageContent'].")" // The dots are for concats, I haven't found a nicer / more readable solution.
// );

// $conn->commit();
// echo "New record created successfully";