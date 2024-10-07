const page = window.location.pathname;

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
    
    switch (page) {
        case '' || '/':
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
        default:
            break;
    }
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
    }, 500);
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
    }, 500);
});

window.toggleTheme = toggleTheme;
window.transitionToPage = transitionToPage;

if (page == '' || page == '/') {
    if (sunElement != null) {
        setInterval(updateBackgroundPosition, 20); // Every 20 ms
    }
}