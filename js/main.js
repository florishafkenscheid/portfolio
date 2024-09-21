function toggleTheme(page) {
    const backgroundElement = document.querySelector('.background');
    document.body.classList.toggle('light-theme');
  
    const buttons = document.querySelectorAll('.theme_button');
    buttons.forEach(button => {
        button.classList.toggle('is-selected');
    });
    
    switch (page) {
        case 'home':
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

function transitionToPage(destination) {
    document.querySelector('.container').style.opacity = 0;

    setTimeout(() => {
        window.location.href = destination;
    }, 500);
}

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.querySelector('.container').style.opacity = 1;
    }, 500);
});

window.toggleTheme = toggleTheme;
window.transitionToPage = transitionToPage;