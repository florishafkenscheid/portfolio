const sunElement = document.querySelector('.sun-container img');
const backgroundElement = document.querySelector('.background');

function updateBackgroundPosition() {
    const sunRect = sunElement.getBoundingClientRect();
    const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
    const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;

    backgroundElement.style.setProperty('--sun-x', `${sunX}%`);
    backgroundElement.style.setProperty('--sun-y', `${sunY}%`);
}

setInterval(updateBackgroundPosition, 20); // Every 20 ms