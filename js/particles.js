// Particles animation for the hero section
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        createParticles();
    }
    
    function createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random particle properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles to the particle
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Determine if it's a circle or square
        if (Math.random() > 0.3) {
            particle.style.borderRadius = '50%';
        }
        
        // Add a random color - either primary or secondary accent color
        if (Math.random() > 0.5) {
            particle.style.backgroundColor = '#7928CA';
        } else {
            particle.style.backgroundColor = '#00C6FF';
        }
        
        // Append the particle to the container
        document.getElementById('particles-js').appendChild(particle);
    }
});