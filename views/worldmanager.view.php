<?php
$headerTitle = 'WorldManager';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('worldmanager');

$info = [
    'how' => 'Built using Java and the Bukkit/Spigot API, the plugin offers extensive world management features:
    <br>
    <br>
    &gt; Dynamic world creation with support for different environments (Normal, Nether, End)
    <br>
    &gt; World state management (open/close worlds without deletion)
    <br>
    &gt; Coordinate-based teleportation system
    <br>
    &gt; Persistent storage of player locations across worlds
    <br>
    &gt; Automatic player redirection to lobby on world closure
    <br>
    &gt; Integration with existing SQLite database from the Lobby plugin',
    'what' => 'A complementary Minecraft plugin to the Lobby system that provides comprehensive world management capabilities. It allows server administrators to create, delete, close, and manage multiple worlds dynamically, while maintaining player positions and managing world states. The plugin adds powerful commands for world manipulation and integrates seamlessly with the Lobby plugin for a complete multi-world management solution.',
    'why' => 'While developing the Lobby plugin for our friend group’s server, we realized we needed more robust world management capabilities. A single lobby wasn’t enough - we needed the ability to create temporary worlds, close worlds for maintenance, and manage player transitions between different game environments. This plugin works in tandem with the Lobby plugin to create a complete world management ecosystem, giving our server admin (my friend) the tools needed to maintain multiple worlds efficiently.',
];

require './views/layout/project.php';

require './views/layout/footer.php';