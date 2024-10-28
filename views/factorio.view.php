<?php
$headerTitle = 'Factorio Zone Bot';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('factorio');

$info = [
    'how' => 'Built using Python and discord.py, the bot communicates between our Discord server and the Factorio Zone API. When someone types a command, the bot processes it and sends the appropriate requests to the API, handling everything from server startup to status checks. The result is a seamless integration that feels like a natural part of our Discord server.',
    'what' => 'A Discord bot that lets my friends and me control our Factorio game server directly through Discord chat commands. No more switching between applications or dealing with complex server management - just simple commands to start and manage our gaming sessions.',
    'why' => 'Managing a Factorio server usually requires visiting different websites and dealing with APIs directly. The traditional way through the Factorio Zone website needs a specific browser cookie to consistently start the same server instance - meaning only one person could effectively manage it. With our bot, anyone in the Discord can start the exact same server without sharing sensitive cookie data, making server management accessible for everyone in our gaming group.',
];

require './views/layout/project.php';

require './views/layout/footer.php';