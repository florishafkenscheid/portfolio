/* Global variables / parameters */
const page = window.location.pathname;
const opacityTimeoutTime = 200;

// Sun animation and path parameters
const animationDuration = 60000; // 60 seconds
const fadeTransitionDuration = 1000; // 1 second for fade
const startY = 90; // Start below screen
const endX = window.innerWidth - 75;
const endY = -window.innerHeight; // End above screen

/* Light and dark theme toggling JS */
function toggleTheme() {
    const backgroundElement = document.querySelector('.background');
    const sunContainer = document.querySelector('.sun-container');
    document.body.classList.toggle('light-theme');
    const currentTheme = localStorage.getItem('themePreference');

    const newTheme = currentTheme === "light" ? "dark" : "light"; // if dark -> light, if light -> dark
    localStorage.setItem('themePreference', newTheme);
  
    const buttons = document.querySelectorAll('.theme_button');
    buttons.forEach(button => {
        button.classList.toggle('is-selected');
    });
    
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

/* Moving Sun JS */

/* 
Claude AI, Oct 28 version. 
Prompt: I want the sun to follow a curve, that's determined by a cubic bezier, while staying at a constant speed. I want it to start a bit under the screen and end at the top right. Instead of snapping back to the start I want it to go transition to invisible, snap back to the start and transition to visible while still under the screen
*/

const points = {
    start: { x: 0, y: startY },
    end: { x: endX, y: endY },
    control1: { x: endX * 0.2, y: startY * 0.5 }, // Adjust these control points
    control2: { x: endX * 0.8, y: endY * 1.5 }    // to modify the curve shape
};

// Pre-calculate points along the curve for constant speed
const numPoints = 1000;
const pathPoints = calculatePathPoints(numPoints);

function calculatePathPoints(count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        points.push(getPointOnCurve(t));
    }
    
    // Calculate cumulative distances for constant speed
    const distances = [0];
    let totalDistance = 0;
    
    for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i-1].x;
        const dy = points[i].y - points[i-1].y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
        distances.push(totalDistance);
    }
    
    // Normalize distances to 0-1
    distances.forEach((d, i) => distances[i] = d / totalDistance);
    
    return { points, distances };
}

function getPointOnCurve(t) {
    // Cubic Bezier curve formula
    const x = Math.pow(1-t, 3) * points.start.x + 
             3 * Math.pow(1-t, 2) * t * points.control1.x + 
             3 * (1-t) * Math.pow(t, 2) * points.control2.x + 
             Math.pow(t, 3) * points.end.x;
             
    const y = Math.pow(1-t, 3) * points.start.y + 
             3 * Math.pow(1-t, 2) * t * points.control1.y + 
             3 * (1-t) * Math.pow(t, 2) * points.control2.y + 
             Math.pow(t, 3) * points.end.y;
             
    return { x, y };
}

function findPointAtDistance(distance) {
    // Find the points between which our target distance lies
    const index = pathPoints.distances.findIndex(d => d >= distance);
    if (index === 0) return pathPoints.points[0];
    if (index === -1) return pathPoints.points[pathPoints.points.length - 1];
    
    // Interpolate between the points
    const prev = pathPoints.distances[index - 1];
    const next = pathPoints.distances[index];
    const t = (distance - prev) / (next - prev);
    
    const p1 = pathPoints.points[index - 1];
    const p2 = pathPoints.points[index];
    
    return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t
    };
}

function updateSunPosition(timestamp) {
    const backgroundElement = document.querySelector('.background');
    const sunElement = document.querySelector('.sun-container img');
    if (!sunElement || !backgroundElement) return;
    
    // Calculate progress (0 to 1)
    const progress = (timestamp % animationDuration) / animationDuration;
    
    // Handle fade transitions
    const fadeOutStart = 0.95; // Start fading out at 95% of the animation
    if (progress > fadeOutStart) {
        const fadeProgress = (progress - fadeOutStart) / (1 - fadeOutStart);
        sunElement.style.opacity = 1 - fadeProgress;
        backgroundElement.style.opacity = 1 - fadeProgress;
    } else if (progress < 0.05) { // First 5% of animation
        const fadeProgress = progress / 0.05;
        sunElement.style.opacity = fadeProgress;
        backgroundElement.style.opacity = fadeProgress;
    }
    
    // Get point on curve at current progress
    const point = findPointAtDistance(progress);
    
    // Apply transform
    sunElement.style.transform = `translate(${point.x}px, ${point.y}px)`;
    
    // Continue animation
    requestAnimationFrame(updateSunPosition);
}

function updateBackgroundPosition() {
    const backgroundElement = document.querySelector('.background');
    const sunElement = document.querySelector('.sun-container img');
    if (sunElement != null && backgroundElement != null) {
        const sunRect = sunElement.getBoundingClientRect();
        const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
        const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;

        backgroundElement.style.setProperty('--sun-x', `${sunX}%`);
        backgroundElement.style.setProperty('--sun-y', `${sunY}%`);
    }
}

// Start the animation
requestAnimationFrame(updateSunPosition);

// Update background position every 20ms
setInterval(updateBackgroundPosition, 20);

/* Transition between pages JS */
function transitionToPage(destination) {
    document.querySelector('.container').style.opacity = 0;

    setTimeout(() => {
        window.location.href = destination;
    }, opacityTimeoutTime);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const currentTheme = localStorage.getItem('themePreference');
    const sunContainer = document.querySelector('.sun-container');
    const backgroundElement = document.querySelector('.background');

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
const projectPreview = document.querySelectorAll('.project-preview');

projectsName.forEach((projectName, index) => {
    const indexMultiplied = index*15;
    if (index < 4) {
        projectName.style.left = `${5 + indexMultiplied}%`;
        projectPreview[index].style.left = `${indexMultiplied+20}%`;
    } else {
        projectName.style.left = `${5 + indexMultiplied}%`;
        projectPreview[index].style.left = `${indexMultiplied-20}%`;
    }
});

document.querySelectorAll('.project-page-info h2').forEach((h2) => {
    h2.addEventListener('click', function () {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

window.toggleTheme = toggleTheme;
window.transitionToPage = transitionToPage;