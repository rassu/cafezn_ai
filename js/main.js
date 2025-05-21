// Main JavaScript file for cafezn.ai landing page

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Waitlist form toggle
const waitlistBtn = document.getElementById('join-waitlist-btn');
const newsletterForm = document.getElementById('newsletter-form');

if (waitlistBtn && newsletterForm) {
    waitlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newsletterForm.classList.toggle('active');
    });
}

// Waitlist form submission
const waitlistForm = document.getElementById('waitlist-form');
const formMessage = document.querySelector('.form-message');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real implementation, you would send this to your backend
        const email = waitlistForm.querySelector('input[type="email"]').value;
        console.log(`Email submitted: ${email}`);
        
        // Show success message
        formMessage.textContent = 'Thanks for joining! We\'ll be in touch soon.';
        formMessage.style.color = '#6F4E37';
        waitlistForm.reset();
        
        // Hide form after 3 seconds
        setTimeout(() => {
            newsletterForm.classList.remove('active');
            // Reset message for next time
            setTimeout(() => {
                formMessage.textContent = 'We\'ll notify you when we launch!';
                formMessage.style.color = '';
            }, 500);
        }, 3000);
    });
}

// Three.js Coffee Particle Animation
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Coffee particle colors
    const colors = [
        new THREE.Color('#6F4E37'), // Primary coffee
        new THREE.Color('#A67C52'), // Light coffee
        new THREE.Color('#D4A76A'), // Accent
        new THREE.Color('#3C2A1E')  // Dark coffee
    ];
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);
    
    // Position and color for each particle
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position (random across the screen with more concentration in center)
        posArray[i] = (Math.random() - 0.5) * window.innerWidth * 0.5;
        posArray[i + 1] = (Math.random() - 0.5) * window.innerHeight * 0.5;
        posArray[i + 2] = (Math.random() - 0.5) * 200;
        
        // Color (random from our coffee palette)
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colArray[i] = randomColor.r;
        colArray[i + 1] = randomColor.g;
        colArray[i + 2] = randomColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colArray, 3));
    
    // Material with custom shaders for better particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 3,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 200;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particle system slightly based on mouse position
        particleSystem.rotation.x += 0.0003;
        particleSystem.rotation.y += 0.0005;
        
        // Add subtle mouse influence
        particleSystem.rotation.x += mouseY * 0.0002;
        particleSystem.rotation.y += mouseX * 0.0002;
        
        // Make particles float upward slowly (like coffee steam)
        const positions = particleSystem.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Move particles upward
            positions[i + 1] += 0.05;
            
            // Reset particles that go too high
            if (positions[i + 1] > window.innerHeight * 0.3) {
                positions[i + 1] = -window.innerHeight * 0.3;
                // Randomize X and Z a bit when resetting
                positions[i] = (Math.random() - 0.5) * window.innerWidth * 0.5;
                positions[i + 2] = (Math.random() - 0.5) * 200;
            }
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize Three.js if browser supports it
if (typeof THREE !== 'undefined') {
    // Wait for DOM to be fully loaded
    window.addEventListener('load', initThreeJS);
} else {
    console.warn('Three.js not loaded, skipping particle animation');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});
