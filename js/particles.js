// Simple and reliable coffee-themed particles
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  const container = document.getElementById('particles-background');
  
  if (!container) {
    console.error('Particles container not found');
    return;
  }
  
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let width, height;
  
  // Coffee-themed colors
  const colors = [
    '#6F4E37', // Primary coffee
    '#A67C52', // Light coffee
    '#D4A76A', // Accent
    '#3C2A1E'  // Dark coffee
  ];
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = -Math.random() * 0.5 - 0.25; // Move upward like coffee steam
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Reset if out of bounds
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10; // Start from bottom
      }
    }
    
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  const particles = [];
  const particleCount = 150;
  
  function init() {
    // Set canvas size
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Create particles
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    // Loop animation
    requestAnimationFrame(animate);
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    init();
  });
  
  // Initialize and start animation
  init();
  animate();
  
  // Setup fade-in animations
  const fadeElements = document.querySelectorAll('.coffee-card, h1, h2, h3, .hero-content');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
  });
  
  // Scroll animation function
  function checkFade() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      
      if (isVisible) {
        el.classList.add('visible');
      }
    });
  }
  
  // Run once on load
  setTimeout(checkFade, 300);
  
  // Add scroll listener
  window.addEventListener('scroll', checkFade);
});
