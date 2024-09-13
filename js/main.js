const sunElement = document.querySelector('.sun-container img');
const backgroundElement = document.querySelector('.background');
const path = document.querySelector('#curve');
const pathLength = path.getTotalLength();

const keyframes = [
    { transform: 'translate(0, 100%)'},
    { transform: 'translate(100%, 80%)'}
];

const animationOptions = {
    duration: 3000,
    fill: 'forwards',
    easing: 'cubic-bezier(0, 0, 1, 1)'
};

const animation = sunElement.animate(keyframes, animationOptions);

function updateBackgroundPosition() {
    const sunRect = sunElement.getBoundingClientRect();
    const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
    const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;

    backgroundElement.style.setProperty('--sun-x', `${sunX}%`);
    backgroundElement.style.setProperty('--sun-y', `${sunY}%`);
}

animation.play();
setInterval(updateBackgroundPosition, 20);