
<?php

/**
 * Controls the database connection. Connects on __construct and stores the connection.
 */
class DatabaseController {
    /**
     * Connects to the database and stores the connection and returns the connection
     * @throws \Exception
     * @return PDO
     */
    function dbConnect() : PDO { // Return PDO for later usage, instead of doing everything in 1 method.
        $servername = "localhost";
        $username = "floris";
	    $password = "root";
        $dbName = "floris_portfolio";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $err) {
            throw new Exception("Failed to connect to database: " . $err);
            // Ik heb overwogen om hier een "create table posts if not exists" in de error handling te maken maar heb besloten dit niet te doen omdat bij het instellen van de webpagina ook database prep hoort.
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
// private static function processQueryString(): array {
//     $queryString = explode('&', $_SERVER['QUERY_STRING']);
    
//     return [
//         'name' => $queryString[0],
//         'email' => $queryString[1],
//         'messageContent' => $queryString[2]
//     ];
// }
