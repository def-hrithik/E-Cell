// JavaScript Document

/*

TemplateMo 596 Electric                    // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
            
            // Set active nav link based on current page and handle navigation
            document.addEventListener('DOMContentLoaded', () => {
                const currentLocation = window.location.pathname;
                const currentHash = window.location.hash;
                
                // Mark active navigation link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    // Remove any existing active classes
                    link.classList.remove('active');
                    
                    // Check if this is the current page
                    if (currentLocation.includes('events.html') && link.getAttribute('href') === 'events.html') {
                        link.classList.add('active');
                    } else if (currentLocation.includes('index_blog.html') && !currentHash && link.getAttribute('href') === 'index_blog.html') {
                        link.classList.add('active');
                    } else if (currentHash && link.getAttribute('href') === currentHash) {
                        link.classList.add('active');
                    } else if (currentLocation.includes('blog-post') && link.getAttribute('href') === 'index_blog.html') {
                        link.classList.add('active');
                    }
                });
                
                // Add click handlers to ensure navigation works properly
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        // If on mobile, close the menu after clicking
                        if (window.innerWidth <= 768) {
                            const navLinks = document.querySelector('.nav-links');
                            const menuToggle = document.querySelector('.menu-toggle');
                            if (navLinks && menuToggle) {
                                menuToggle.classList.remove('active');
                                navLinks.classList.remove('active');
                                document.body.classList.remove('menu-open');
                            }
                        }
                        
                        // Smooth scrolling for anchor links on same page
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#') && document.querySelector(href)) {
                            e.preventDefault();
                            const targetElement = document.querySelector(href);
                            const navHeight = document.querySelector('nav').offsetHeight;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            
                            window.scrollTo({
                                top: targetPosition - navHeight - 20,
                                behavior: 'smooth'
                            });
                            
                            // Update URL without page reload
                            window.history.pushState(null, null, href);
                            
                            // Update active states
                            document.querySelectorAll('.nav-links a').forEach(navLink => {
                                navLink.classList.remove('active');
                            });
                            link.classList.add('active');
                        }
                    });
                });
            });templatemo.com/tm-596-electric-xtra

*/

// Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
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
                    const before = particle.style.getPropertyValue('--particle-color');
                    particle.style.background = '#00B2FF';
                }
                
                particlesContainer.appendChild(particle);
            }
        }

        // Enhanced Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const navbar = document.getElementById('navbar');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) currentNav.classList.add('active');
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Feature tabs functionality
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

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent! We\'ll get back to you soon.');
            this.reset();
        });

        // Initialize particles
        createParticles();

        // Text rotation with character animation
        const textSets = document.querySelectorAll('.text-set');
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            const text = element.textContent;
            element.innerHTML = text.split('').map((char, i) => 
                `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Wrap text in spans for animation
            wrapTextInSpans(glitchText);
            
            // Update data attribute for glitch effect
            glitchText.setAttribute('data-text', glitchText.textContent);
            
            // Show subtitle after main text
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }

        function animateTextOut(textSet) {
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Animate characters out
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            
            // Hide subtitle
            subtitle.classList.remove('visible');
        }

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