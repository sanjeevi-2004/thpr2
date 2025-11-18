document.addEventListener('DOMContentLoaded', () => {

    // ======== Mobile Navigation Toggle ========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ======== Sticky Header on Scroll ========
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======== Scroll-in Fade Animations ========
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Start 50px before it enters view
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ======== Smooth Scrolling for Nav Links ========
    // Note: html { scroll-behavior: smooth; } in CSS does most of this,
    // but this JS is a more robust fallback. We'll keep it simple
    // and rely on the CSS-native method for this demo.
    // If you need more complex scrolling, you'd add this:
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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

