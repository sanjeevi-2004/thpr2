document.addEventListener('DOMContentLoaded', () => {

    // ======== Mobile Navigation Toggle (Hamburger) ========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ======== Mobile Dropdown Logic (The Fix) ========
    // Select all nav items that have the 'dropdown' class
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a'); // The parent link (e.g. "Services")

        dropdownLink.addEventListener('click', (e) => {
            // Only run this logic on mobile screens (768px or less)
            if (window.innerWidth <= 768) {
                // Prevent the link from jumping to a new page immediately
                e.preventDefault();
                
                // Toggle the active class on the parent LI
                dropdown.classList.toggle('active');
            }
        });
    });

    // ======== Close menu when a standard link is clicked ========
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // CHECK: Is this link part of a dropdown toggle?
            // If it is a dropdown toggle AND we are on mobile, DO NOT close the menu yet.
            if (link.parentElement.classList.contains('dropdown') && window.innerWidth <= 768) {
                return; // Stop here, let the Dropdown Logic above handle it
            }

            // Otherwise, close the menu (for normal links or desktop clicks)
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Also close any open dropdowns when closing the main menu
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        });
    });

    // ======== Sticky Header on Scroll ========
    const header = document.querySelector('.main-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ======== Scroll-in Fade Animations ========
    const faders = document.querySelectorAll('.fade-in');
    
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // ======== Smooth Scrolling (Fallback) ========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't run smooth scroll if it's a dropdown toggle on mobile
            if (this.parentElement.classList.contains('dropdown') && window.innerWidth <= 768) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Safety check if href is just "#"
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});

// ========
// SCRIPT FOR MODERN-SERVICES.HTML
// (Add to the bottom of script.js)
// ========

// Only run this code if we are on the services page
if (document.querySelector('.modern-services-layout')) {
    
    const serviceItems = document.querySelectorAll('.service-content-item');
    const navLinks = document.querySelectorAll('.modern-nav-link');

    const observerOptions = {
        root: null, // Viewport
        rootMargin: '-30% 0px -70% 0px', // Triggers in the middle 30% of the screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the 'id' of the intersecting item
                const id = entry.target.getAttribute('id');
                
                // Remove 'active' from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add 'active' to the matching nav link
                // We use querySelector `href` to match the id
                const matchingLink = document.querySelector(`.modern-nav-link[href="#${id}"]`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each service content section
    serviceItems.forEach(item => {
        observer.observe(item);
    });

    // Smooth scroll for the modern nav links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate scroll position, accounting for the sticky header
                const headerOffset = 100; // Height of sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

