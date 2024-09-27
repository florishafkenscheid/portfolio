<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio</title>
        <link href="/assets/light-mode-favicon.ico" rel="icon" media="(prefers-color-scheme: light)">
        <link href="/assets/dark-mode-favicon.ico" rel="icon" media="(prefers-color-scheme: dark)">
        <link rel="stylesheet" href="/views/css/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

        <script type="module" src="/views/js/main.js" defer></script>
        <script>
            /*to prevent Firefox FOUC, this must be here*/
        </script>
    </head>
    <body>
        <main>
            <div class="container">
                <div class="themes" onclick="toggleTheme('projects')">
                    <div class="theme_button">
                        <div class="box"></div>
                        <div class="text">LIGHT</div>
                    </div>
                    <div class="theme_button is-selected">
                        <div class="box"></div>
                        <div class="text">DARK</div>
                    </div>
                </div>
                <div class="content">
                    <header class="nameHeader">
                        <h1 class="siteHeader inter-light">Floris Hafkenscheid</h1>
                        <nav class="navbar inter-light">
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
                            </ul>
                        </nav>
                    </header>