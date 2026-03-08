<?php
$headerTitle = 'BELT';
require './views/layout/head.php';

$project = (new ProjectsController())->getProjectByTitle('belt');

$info = [
    'how' => 'Built in Rust as a cross-platform CLI, BELT automates Factorio performance testing through a set of focused commands for benchmarking, blueprint stamping, chart generation, and sanitizer output parsing. It supports parallel execution, pattern-based save selection, CSV and Markdown report generation, SVG chart output, and optional verbose metrics so benchmark data can be inspected in much more detail.',
    'what' => 'A benchmarking and testing suite for Factorio that helps measure UPS performance, batch-test save files, stamp blueprints into base saves, and analyze results through reports and generated charts. The goal is to make repeated performance testing and comparison easier, faster, and more reproducible.',
    'why' => 'I wanted a more universal and reusable way to benchmark Factorio saves than the ad-hoc scripts I had seen before. Building BELT let me create a proper tool that works across platforms, is easy to automate, and is useful both for my own testing workflow and for other players who want clearer performance data.',
];

require './views/layout/project.php';

require './views/layout/footer.php';