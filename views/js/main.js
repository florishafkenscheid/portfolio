const page = window.location.pathname;
const opacityTimeoutTime = 200;

function toggleTheme() {
    const backgroundElement = document.querySelector('.background');
    document.body.classList.toggle('light-theme');
    const currentTheme = localStorage.getItem('themePreference');

    const newTheme = currentTheme === "light" ? "dark" : "light"; // if dark -> light, if light -> dark
    localStorage.setItem('themePreference', newTheme);
  
    const buttons = document.querySelectorAll('.theme_button');
    buttons.forEach(button => {
        button.classList.toggle('is-selected');
    });
    
    const sunContainer = document.querySelector('.sun-container');
    sunContainer.style.opacity = 0;
    backgroundElement.style.opacity = 0;

    setTimeout(() => {
        sunContainer.classList.toggle('sun-filter-light');
        sunContainer.classList.toggle('sun-filter-dark');

        backgroundElement.classList.toggle('background-dark');
        backgroundElement.classList.toggle('background-light');

        sunContainer.style.opacity = 1;
        backgroundElement.style.opacity = 1;
    }, 700);
}

const sunElement = document.querySelector('.sun-container img');
const backgroundElement = document.querySelector('.background');

function updateBackgroundPosition() {
    if (sunElement != null && backgroundElement != null) {
        const sunRect = sunElement.getBoundingClientRect();
        const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
        const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;

        backgroundElement.style.setProperty('--sun-x', `${sunX}%`);
        backgroundElement.style.setProperty('--sun-y', `${sunY}%`);
    }
}

setInterval(updateBackgroundPosition, 20); // Every 20 ms

function transitionToPage(destination) {
    document.querySelector('.container').style.opacity = 0;

    setTimeout(() => {
        window.location.href = destination;
    }, opacityTimeoutTime);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const currentTheme = localStorage.getItem('themePreference');
    const sunContainer = document.querySelector('.sun-container');

    if (currentTheme === "light") {
        document.body.classList.add('light-theme');

        if (sunContainer != null) {
            sunContainer.classList.add('sun-filter-light');
            sunContainer.classList.remove('sun-filter-dark');

            backgroundElement.classList.add('background-light');
            backgroundElement.classList.remove('background-dark');
        }
    } else {
        document.body.classList.remove('light-theme');

        if (sunContainer != null) {
            sunContainer.classList.add('sun-filter-dark');
            sunContainer.classList.remove('sun-filter-light');

            backgroundElement.classList.add('background-dark');
            backgroundElement.classList.remove('background-light');
        }
    }

    setTimeout(() => {
        document.querySelector('.container').style.opacity = 1;
    }, opacityTimeoutTime);
});

// function deletePost(post) {

// }

// function editPost(post) {

// }

// function commentOnPost(post) {

// }

// window.deletePost = deletePost;
// window.editPost = editPost;
// window.commentOnPost = commentOnPost;
// Commented because I decided to use my router how its intended..

document.querySelectorAll('.blog-control-svg').forEach((svg) => {
    svg.addEventListener('click', function () {
        const action = this.title.toLowerCase(); // delete, edit, comment
        const postId = this.getAttribute('data-id');
        const type = this.getAttribute('data-type');

        window.location.href = `/blog/${action}/${type}/${postId}`;
    });
});

const projectsName = document.querySelectorAll('.project > p');

projectsName.forEach((projectsName, index) => {
    projectsName.style.left = `${5 + index * 15}%`;
});

window.toggleTheme = toggleTheme;
window.transitionToPage = transitionToPage;

if (sunElement != null) {
    setInterval(updateBackgroundPosition, 20); // Every 20 ms
}