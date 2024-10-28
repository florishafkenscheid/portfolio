<?php
$headerTitle = 'PluginHider';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('pluginhider');

$info = [
    'how' => 'Built with Java and the Bukkit/Spigot API, the plugin customizes default Minecraft commands with features such as:
    <br>
    <br>&gt; Command override functionality to replace standard server commands with custom actions
    <br>&gt; Standalone deployment without the need for additional plugins
    <br>&gt; Extensible command handling to easily add or modify actions
    <br>&gt; Integration with server configuration for flexible command management and updates
    <br>&gt; Lightweight implementation that doesn’t interfere with other server plugins',
    
    'what' => 'A Minecraft server plugin focused on replacing default commands with custom functionalities. Developed purely out of curiosity, it offers a framework to override and experiment with default commands, giving more control and flexibility to server admins. This plugin operates independently, allowing seamless command customization without the need for other plugins.',
    
    'why' => 'I created this plugin to explore command overriding in Minecraft servers. Even though our server didn’t require custom commands, it provided a fun challenge and a chance to learn more about the Bukkit API. With friends on the server, it was a great environment to experiment and see how custom commands could make gameplay unique and enjoyable.',
];


require './views/layout/project.php';

require './views/layout/footer.php';