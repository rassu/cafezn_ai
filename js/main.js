// Main JavaScript file for cafezn.ai landing page

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('bg-black/80');
                nav.classList.add('backdrop-blur-md');
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('bg-black/80');
                nav.classList.remove('backdrop-blur-md');
                nav.classList.remove('shadow-lg');
            }
        }
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real implementation, you would send this to your backend
                console.log(`Email submitted: ${emailInput.value}`);
                
                // Show success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="py-8 text-center fade-in visible">
                        <div class="text-3xl coffee-accent mb-4">☕</div>
                        <h3 class="text-2xl font-semibold mb-3">Thanks for joining!</h3>
                        <p class="text-gray-400">We'll notify you when we're ready to launch.</p>
                    </div>
                `;
            }
        });
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button if it doesn't exist yet
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden text-white';
    mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    const navContent = nav.querySelector('.flex');
    if (!navContent) return;
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed inset-0 bg-black/95 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center';
    mobileMenu.innerHTML = `
        <button class="absolute top-6 right-6 text-white" aria-label="Close menu">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="flex flex-col space-y-8 text-center text-xl">
            <a href="#about" class="text-white hover:text-[#D4A76A] transition-colors">About</a>
            <a href="#features" class="text-white hover:text-[#D4A76A] transition-colors">Features</a>
            <a href="#team" class="text-white hover:text-[#D4A76A] transition-colors">Team</a>
            <a href="#contact" class="text-white hover:text-[#D4A76A] transition-colors">Contact</a>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Add event listeners
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });
    
    const closeBtn = mobileMenu.querySelector('button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Add the button to the nav if it's not already there
    if (!nav.querySelector('.md\\:hidden')) {
        navContent.appendChild(mobileMenuBtn);
    }
});





// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
});


