<div class="individual-project-div">
    <div class="project-page-info" id="project-what">
        <h2 class="collapsible">What <img src="/views/assets/chevron-down-solid.svg" id="collapsible-chevron"></h2>
        <div class="collapsible-content">
            <p><?php echo $info["what"];?></p>
        </div>
    </div>
    <div class="project-page-info" id="project-why">
        <h2 class="collapsible">Why <img src="/views/assets/chevron-down-solid.svg" id="collapsible-chevron"></h2>
        <div class="collapsible-content">
            <p><?php echo $info["why"];?></p>
        </div>
    </div>
    <div class="project-page-info" id="project-how">
        <h2 class="collapsible">How <img src="/views/assets/chevron-down-solid.svg" id="collapsible-chevron"></h2>
        <div class="collapsible-content">
            <p><?php echo $info["how"];?></p>
        </div>
    </div>
</div>

<nav class="socialnav">
    <ul>
        <li>
            <a class="sociallink" href="<?php echo $project["github_url"];?>" target="_blank">
                <span>01</span>
                <strong>github</strong>
            </a>
        </li>
    </ul>
</nav>