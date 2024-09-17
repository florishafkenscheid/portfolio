const sunElement = document.querySelector('.sun-container img');
const backgroundElement = document.querySelector('.background');

function updateBackgroundPosition() {
    const sunRect = sunElement.getBoundingClientRect();
    const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
    const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;

    backgroundElement.style.setProperty('--sun-x', `${sunX}%`);
    backgroundElement.style.setProperty('--sun-y', `${sunY}%`);
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
  
    const buttons = document.querySelectorAll('.theme_button');
    buttons.forEach(button => {
        button.classList.toggle('is-selected');
    });
  
    const sunContainer = document.querySelector('.sun-container');
    sunContainer.style.opacity = '0';
    backgroundElement.style.opacity = '0';

    setTimeout(() => {
        sunContainer.classList.toggle('sun-filter-light');
        sunContainer.classList.toggle('sun-filter-dark');

        backgroundElement.classList.toggle('background-dark');
        backgroundElement.classList.toggle('background-light');

        sunContainer.style.opacity = '1';
        backgroundElement.style.opacity = '1';
    }, 700);
}

window.toggleTheme = toggleTheme;
setInterval(updateBackgroundPosition, 20); // Every 20 ms
