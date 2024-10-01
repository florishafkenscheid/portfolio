<?php 

require './views/layout/head.php'

?>
<!-- Makes the sun move. -->
<div class="background background-dark" id="background">
    <div class="sun-container sun-filter-dark">
        <img draggable="false" src="/views/assets/sun.webp">
    </div>
</div>
<nav class="socialnav">
    <ul>
        <li>
            <a class="sociallink inter-normal" href="https://github.com/florishafkenscheid">
                <span>01</span>
                <strong>github</strong>
            </a>
        </li>
        <li>
            <a class="sociallink inter-normal" href="https://linkedin.com/in/floris-hafkenscheid-bb8221328">
                <span>02</span>
                <strong>linkedin</strong>
            </a>
        </li>
    </ul>
</nav>

<?php 

require './views/layout/footer.php';

?>