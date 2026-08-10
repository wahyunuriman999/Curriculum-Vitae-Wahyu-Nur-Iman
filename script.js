/* ==========================================
 * AEGIS COGNITIVE RUNTIME PLATFORM
 * PROPRIETARY AND CONFIDENTIAL
 * Copyright (c) 2024-2026 Wahyu Nur Iman. 
 * All rights reserved.
 * ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Follower has slight delay for smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Hover effect for links and buttons
        const interactables = document.querySelectorAll('a, .btn, .glass-panel');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    // Initial check and event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Typewriter Effect
    const typeText = document.getElementById('type-text');
    const phrases = [
        "Data Analyst", 
        "Software Developer", 
        "Hardware Engineer",
        "Problem Solver"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    const typeWriter = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Faster deleting
        } else {
            typeText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100; // Normal typing speed
        }
        
        // If finished typing phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 2000; // Pause at end of phrase
        } 
        // If finished deleting phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeDelay = 500; // Pause before new phrase
        }
        
        setTimeout(typeWriter, typeDelay);
    };
    
    // Start typing effect after short delay
    setTimeout(typeWriter, 1000);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
