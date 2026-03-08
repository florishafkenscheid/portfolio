<?php
$headerTitle = 'Sharpfish';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('sharpfish');

$info = [
    'how' => 'Built in C# as a wrapper around a UCI chess engine process, Sharpfish focuses on turning raw engine communication into a simpler API. It manages the engine executable, sends commands such as setting a FEN position, and exposes intuitive asynchronous methods for reading the engine response and retrieving data like the best move.',
    'what' => 'A .NET wrapper library for interacting with UCI chess engines such as Stockfish. Instead of manually handling low-level stdin and stdout communication every time, the library provides a cleaner interface for common engine tasks inside C# applications.',
    'why' => 'I made Sharpfish to simplify engine integration in .NET projects. UCI engines are powerful, but the communication layer is repetitive and awkward to rebuild for every project. Wrapping that protocol in a small library makes experimentation and reuse much easier.',
];

require './views/layout/project.php';

require './views/layout/footer.php';