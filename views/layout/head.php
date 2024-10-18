<?php 
$uri = explode('/', $_SERVER['REQUEST_URI']);
$title = ucfirst($uri[1]);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Discover the portfolio of a dedicated web development student showcasing innovative projects, skills, and a passion for creating dynamic web solutions."> <!-- AI Generated; https://ahrefs.com/writing-tools/meta-description-generator prompt: Portfolio for web development student-->
        <title><?php echo $title;?></title> <!-- Set the title to what was passed at the top of this file, with the first letter being uppercase. -->
        <link href="/views/assets/light-mode-favicon.ico" rel="icon" media="(prefers-color-scheme: light)">
        <link href="/views/assets/dark-mode-favicon.ico" rel="icon" media="(prefers-color-scheme: dark)">
        <link rel="stylesheet" href="/views/css/style.css">

        <script type="module" src="/views/js/main.js" defer></script>
        <script>
            /*to prevent Firefox FOUC, this must be here*/
        </script>
    </head>
    <body>
        <main>
            <div class="container">
                <div class="content">
                    <div class="themes" onclick="toggleTheme()">
                        <div class="theme_button">
                            <div class="box"></div>
                            <div class="text">LIGHT</div>
                        </div>
                        <div class="theme_button is-selected">
                            <div class="box"></div>
                            <div class="text">DARK</div>
                        </div>
                    </div>
                    <header class="siteHeader">
                        <h1 class="nameHeader">Floris Hafkenscheid</h1>
                        <nav class="navbar">
                            <ul>
                                <li>
                                    <span class="nav-link" onclick="transitionToPage('/')">Home</span>
                                </li>
                                <li>
                                    <span class="nav-link" onclick="transitionToPage('/projects')">Projects</span>
                                </li>
                                <li>
                                    <span class="nav-link" onclick="transitionToPage('/info')">Info</span>
                                </li>
                                <li>
                                    <span class="nav-link" onclick="transitionToPage('/contact')">Contact</span>
                                </li>
                                <li>
                                    <span class="nav-link" onclick="transitionToPage('/blog')">Blog</span>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div class="background background-dark" id="background">
                        <div class="sun-container sun-filter-dark">
                            <img draggable="false" src="/views/assets/sun.webp" alt="Sun, purple or blue depending on theme">
                        </div>
                    </div>