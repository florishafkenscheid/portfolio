<?php
$headerTitle = 'Lobby';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('lobby');

$info = [
    'how' => 'Built using Java and the Bukkit/Spigot API, the plugin implements a custom command system and SQLite database integration. It features:
    <br>
    <br>&gt; A robust command architecture using abstract classes for standardized command handling
    <br>&gt; SQLite database integration for persistent storage of player coordinates
    World-specific location tracking and restoration
    <br>&gt; Smart teleportation that checks if players are already in their requested destination
    <br>&gt; Configurable interval settings for server operations',
    'what' => 'A Minecraft server plugin that manages player world transitions and coordinates storage, built with Java and Maven. The plugin tracks players’ last known locations in different worlds and provides seamless teleportation between them, with a special focus on lobby functionality. Part of a two-plugin system working in tandem with the World Manager plugin to create a complete multi-world management solution.',
    'why' => 'A friend of mine runs a Minecraft server where our friend group regularly plays together. To enhance our gaming experience, I developed this plugin to make navigating between different worlds smoother. Instead of losing our positions or having to remember coordinates when switching between survival, creative, or minigame worlds, the plugin automatically handles all of this for us. Since our group actively plays on the server, it was a perfect opportunity to create something that directly benefits our gaming sessions.',
];

require './views/layout/project.php';

require './views/layout/footer.php';