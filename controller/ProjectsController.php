<?php

class ProjectsController extends BaseController {
    private $dbConn;

    function __construct() {
        $dbController = new DatabaseController();
        $this->dbConn = $dbController->dbConnect();
    }

    public function index(string $path = 'projects') {
        parent::index($path);
    }

    public function renderProjects() {
        $projects = self::getProjects();
        ?>
        <div class="projects-div">
            <?php foreach ($projects as $project): ?>
            <a href="/projects/project/<?php echo $project['id']; ?>" class="project">
                <p><?php echo htmlspecialchars($project['title']); ?></p>
                <img 
                    src="<?php echo htmlspecialchars($project['image_path']); ?>"
                    alt="Code preview for <?php echo htmlspecialchars($project['title']); ?>"
                    class="project-preview">
            </a>
            <?php endforeach; ?>
        </div>
        <?php
    }

    // Individual projects, I know this isn't automated and whenever I add a new project I need to add it manually, but I dont like seeing /projects/project/{projectName} in my URL, so I decided to just do /projects/{projectName}
    public function factorio(string $path = 'fz-bot') {
        parent::index($path);
    }

    public function lobby(string $path = 'lobby') {
        parent::index($path);
    }

    public function worldmanager(string $path = 'worldmanager') {
        parent::index($path);
    }

    public function pluginhider(string $path = 'pluginhider') {
        parent::index($path);
    }

    // Getters
    public function getProjects() : array {
        $query = "SELECT id, title, image_path
                  FROM projects";
        
        return $this->executeQuery($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    // DB methods
    /**
     * Simply removes repeated code everywhere with a clean function, consider it a mini query builder.
     * @param mixed $query
     * @param mixed $params
     * @return bool|PDOStatement
     */
    private function executeQuery($query, $params = []) {
        try {
            $sqlQuery = $this->dbConn->prepare($query);
            $sqlQuery->execute($params);
            return $sqlQuery;
        } catch (PDOException $err) {
            echo "Database error: " . $err->getMessage();
            exit();
        }
    }
}