    document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse.classList.contains('show')) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                            bsCollapse.hide();
                        }
                    }
                });
            });
            
            // Navbar background change on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Contact form submission
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Here you would typically send the form data to a server
                    // For now, we'll just show an alert
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                });
            }
            
            // Animate skills on scroll
            const animateSkills = function() {
                const skillsSection = document.getElementById('skills');
                if (isInViewport(skillsSection)) {
                    const skillLevels = document.querySelectorAll('.skill-level');
                    skillLevels.forEach(level => {
                        const width = level.getAttribute('data-level');
                        level.style.width = width + '%';
                    });
                }
            };
            
            // Rotating text animation
            class TextRotate {
                constructor(el, toRotate, period) {
                    this.toRotate = toRotate;
                    this.el = el;
                    this.loopNum = 0;
                    this.period = parseInt(period, 10) || 2000;
                    this.txt = '';
                    this.tick();
                    this.isDeleting = false;
                }
                tick() {
                    const i = this.loopNum % this.toRotate.length;
                    const fullTxt = this.toRotate[i];
                    
                    if (this.isDeleting) {
                        this.txt = fullTxt.substring(0, this.txt.length - 1);
                    } else {
                        this.txt = fullTxt.substring(0, this.txt.length + 1);
                    }
                    
                    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
                    
                    let delta = 200 - Math.random() * 100;
                    
                    if (this.isDeleting) { delta /= 2; }
                    
                    if (!this.isDeleting && this.txt === fullTxt) {
                        delta = this.period;
                        this.isDeleting = true;
                    } else if (this.isDeleting && this.txt === '') {
                        this.isDeleting = false;
                        this.loopNum++;
                        delta = 500;
                    }
                    
                    setTimeout(() => this.tick(), delta);
                }
            }
            
            // Initialize text rotation
            const elements = document.getElementsByClassName('txt-rotate');
            for (let i=0; i<elements.length; i++) {
                const toRotate = elements[i].getAttribute('data-rotate');
                const period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TextRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
            
            // Scroll animations
            const animateOnScroll = function() {
                // Animate timeline items
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    if (isInViewport(item)) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    }
                });
                
                animateSkills();
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load
            
            // Helper function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
                    rect.bottom >= 0
                );
            }
        });