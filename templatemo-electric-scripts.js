// JavaScript Document

/*

TemplateMo 596 Electric Xtra

*/

// Enhanced Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close menu if on mobile
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar && navLinks && menuToggle) {
                if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                if (menuToggle && navLinks) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    }

    // Set active nav link based on current page and handle navigation
    const currentLocation = window.location.pathname;
    const currentHash = window.location.hash;
    const isHomePage = currentLocation.endsWith('index.html') || currentLocation.endsWith('/');
    const isBlogPage = currentLocation.includes('blog.html') || currentLocation.includes('blog-post-'); // Also covers blog-post-1.html

    // Mark active navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // 1. Check for dedicated page (blog.html, events.html)
        if (isBlogPage && href === 'blog.html') {
            link.classList.add('active');
        } else if (currentLocation.includes('events.html') && href === 'events.html') {
            link.classList.add('active');
        }
        // 2. Check for homepage sections
        else if (isHomePage && currentHash && href.endsWith(currentHash)) {
            link.classList.add('active');
        } 
        // 3. Default to Home if on the root page without a hash
        else if (isHomePage && !currentHash && href.endsWith('#home')) {
             link.classList.add('active');
        }
    });
                
    // Add click handlers to ensure smooth scrolling on the homepage
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if the link is an anchor on the current page (index.html)
            if (href && href.startsWith('index.html#')) {
                const targetId = href.substring(href.indexOf('#'));
                const targetElement = document.querySelector(targetId);
                
                // If the target element exists on this page (index.html), perform smooth scroll
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - navHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    window.history.pushState(null, null, targetId);
                    
                    // Update active states manually for anchor clicks
                    document.querySelectorAll('.nav-links a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    link.classList.add('active');
                }
                // If it's an anchor link but the user is on the blog page, let it navigate normally
            }
        });
    });
                
    // Initialize other site functionality
    initializeSite();
});

// Initialize site functionality
function initializeSite() {
    createParticles();
    // Re-initialize all functionality that might be missing due to the document restructuring.
    initializeFeaturesTabs();
    initializeFormSubmission();
    initializeTextRotation();
    initializeScrollEffects();
}

// Function to initialize feature tabs (copied from original JS)
function initializeFeaturesTabs() {
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Function to initialize form submission (copied from original JS)
function initializeFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            // Replaced alert() with console log as per best practices
            console.log('Message sent! We\'ll get back to you soon.');
            this.reset();
        });
    }
}

// Function to create floating particles (copied from original JS)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles before recreating
    particlesContainer.innerHTML = '';
    
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Randomly assign orange or blue color
        if (Math.random() > 0.5) {
            particle.style.setProperty('--particle-color', '#00B2FF');
            // The original code had a redundant line here, removed it.
            particle.style.background = '#00B2FF';
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Function to wrap text in spans for animation (copied from original JS)
function wrapTextInSpans(element) {
    const text = element.textContent;
    element.innerHTML = text.split('').map((char, i) => 
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
}

// Function to animate text in (copied from original JS)
function animateTextIn(textSet) {
    const glitchText = textSet.querySelector('.glitch-text');
    const subtitle = textSet.querySelector('.subtitle');
    
    if (!glitchText) return;

    // Wrap text in spans for animation
    wrapTextInSpans(glitchText);
    
    // Update data attribute for glitch effect
    glitchText.setAttribute('data-text', glitchText.textContent);
    
    if (subtitle) {
        // Show subtitle after main text
        setTimeout(() => {
            subtitle.classList.add('visible');
        }, 800);
    }
}

// Function to animate text out (copied from original JS)
function animateTextOut(textSet) {
    const chars = textSet.querySelectorAll('.char');
    const subtitle = textSet.querySelector('.subtitle');
    
    // Animate characters out
    chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add('out');
    });
    
    if (subtitle) {
        // Hide subtitle
        subtitle.classList.remove('visible');
    }
}

// Text rotation logic (copied from original JS, ensuring it only runs on index.html)
function initializeTextRotation() {
    const textRotator = document.querySelector('.text-rotator');
    if (!textRotator) return; // Only run on pages with the rotator

    const textSets = document.querySelectorAll('.text-set');
    if (textSets.length === 0) return;

    let currentIndex = 0;
    let isAnimating = false;

    function rotateText() {
        if (isAnimating) return;
        isAnimating = true;

        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];

        // Animate out current text
        animateTextOut(currentSet);

        // After out animation, switch sets
        setTimeout(() => {
            currentSet.classList.remove('active');
            nextSet.classList.add('active');
            animateTextIn(nextSet);
            
            currentIndex = nextIndex;
            isAnimating = false;
        }, 600);
    }

    // Initialize first text set
    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);

    // Start rotation after initial display
    setTimeout(() => {
        setInterval(rotateText, 5000); // Change every 5 seconds
    }, 4000);

    // Add random glitch effect
    setInterval(() => {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            if (Math.random() > 0.95) {
                text.style.animation = 'none';
                setTimeout(() => {
                    text.style.animation = '';
                }, 200);
            }
        });
    }, 3000);
}

// Navbar scroll effects (copied from original JS)
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        if (window.location.pathname.includes('blog.html') || window.location.pathname.includes('events.html')) {
            // Do not run section active tracking on dedicated pages, rely on manual active class
            return;
        }
        
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const currentNav = document.querySelector(`.nav-link[href="index.html#${section.id}"]`);
                if (currentNav) {
                    currentNav.classList.add('active');
                } else if (section.id === 'home') {
                    // Ensures 'Home' is active at the very top of the page
                    document.querySelector(`.nav-link[href="index.html#home"]`).classList.add('active');
                }
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // Initial active nav update
    updateActiveNav();
}

// Initializing the scroll effects and text rotation after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    // Other DOMContentLoaded listeners run above
    initializeTextRotation();
    initializeScrollEffects();
});