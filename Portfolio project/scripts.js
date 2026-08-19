const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Education section functionality - FIXED
document.addEventListener('DOMContentLoaded', function () {
    // Read More functionality for Education section
    const educationReadMoreButtons = document.querySelectorAll('#education .read-more');

    educationReadMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const details = this.closest('.education-item').querySelector('.details');
            details.classList.toggle('active');

            if (details.classList.contains('active')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const educationItems = document.querySelectorAll('.education-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            educationItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});










// Certificate Modal Functions
function showCertificates() {
    document.getElementById('certificateModal').style.display = 'flex';
}

function hideCertificates() {
    document.getElementById('certificateModal').style.display = 'none';
}

// Close modal when clicking outside or pressing Escape
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
    
    // Read More functionality for B.Tech item
    const btechReadMoreBtn = document.querySelector('.education-item[data-category="education"] .read-more');
    if (btechReadMoreBtn) {
        btechReadMoreBtn.addEventListener('click', function() {
            const details = this.closest('.education-item').querySelector('.details');
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    }
});














// Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('skillsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    
    // Create dots based on number of slides
    function createDots() {
        sliderDots.innerHTML = '';
        const totalSlides = Math.ceil(skillCategories.length / slidesPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    // Calculate how many slides to show based on screen width
    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Update slider position
    function updateSlider() {
        const slideWidth = skillCategories[0].offsetWidth + 20; // width + gap
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= Math.ceil(skillCategories.length / slidesPerView) - 1;
    }
    
    // Navigate to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        const maxSlide = Math.ceil(skillCategories.length / slidesPerView) - 1;
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateSlider();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Initialize slider
    function initSlider() {
        slidesPerView = getSlidesPerView();
        createDots();
        updateSlider();
        
        // Add event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            slidesPerView = getSlidesPerView();
            createDots();
            currentSlide = 0;
            updateSlider();
        });
    }
    
    // Initialize the slider
    initSlider();
    
    // Expandable skills functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the specific target for this button only
            const targetId = this.getAttribute('data-target');
            const expandableSection = document.getElementById(targetId);
            
            // Toggle only this specific section
            const isExpanded = expandableSection.classList.contains('show');
            
            if (isExpanded) {
                expandableSection.classList.remove('show');
                this.querySelector('span').textContent = 'Show More';
                this.classList.remove('expanded');
            } else {
                expandableSection.classList.add('show');
                this.querySelector('span').textContent = 'Show Less';
                this.classList.add('expanded');
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 300);
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});






// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize EmailJS
(function () {
    emailjs.init("I-4jo9KNWHQCi4KB_");
})();

// Contact Form Submission Handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Ravi Kumar',
        date: new Date().toLocaleString()
    };

    // Send email using EmailJS
    emailjs.send('service_4g3qc27', 'template_31uk2gl', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you! Your message has been sent successfully.');
            document.getElementById('contactForm').reset();
        }, function (error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(function () {
            // Reset button state in both success and error cases
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
});

// Project section functionality
document.addEventListener('DOMContentLoaded', function () {
    const projectReadMoreBtns = document.querySelectorAll('#project .read-more');

    // Read More functionality for Project section
    projectReadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const fullDescription = this.closest('.project-content').querySelector('.full-description');
            fullDescription.classList.toggle('show');
            this.classList.toggle('active');

            if (fullDescription.classList.contains('show')) {
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    });

});