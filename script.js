// CONSOLIDATED PORTFOLIO WEBSITE JAVASCRIPT
document.addEventListener('DOMContentLoaded', function () {
    // ==================== NAVBAR TOGGLE ====================
    const hamburger = document.querySelector('.hamburger') || document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu') || document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // If using Boxicons, toggle menu icon
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('bx-menu');
                icon.classList.toggle('bx-x');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Reset icon if using Boxicons
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('bx-menu');
                icon.classList.remove('bx-x');
            }
        }));
    }

    // ==================== TEXT SLIDER ====================
    const textItems = document.querySelectorAll('.text-item');
    let current = 0;

    if (textItems.length > 1) {
        // Hide all except first
        for (let i = 1; i < textItems.length; i++) {
            textItems[i].style.opacity = '0';
            textItems[i].style.transform = 'translateY(100%)';
        }

        // Rotate texts
        setInterval(() => {
            // Hide current
            if (textItems[current]) {
                textItems[current].style.opacity = '0';
                textItems[current].style.transform = 'translateY(-100%)';
            }

            // Show next
            current = (current + 1) % textItems.length;
            if (textItems[current]) {
                textItems[current].style.opacity = '1';
                textItems[current].style.transform = 'translateY(0)';
            }
        }, 3000);
    }

    // ==================== FOOTER YEAR ====================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==================== SKILL TAGS HOVER ====================
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements to animate
    const animatedElements = document.querySelectorAll('.about-content, .skills-section, .portfolio-grid, .portfolio-cta');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ==================== PORTFOLIO FILTERING ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const portfolioGrid = document.getElementById('portfolio-grid');
    const emptyState = document.getElementById('empty-state');
    const resetFiltersBtn = document.querySelector('.btn-reset-filters');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        // Filter projects based on category
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                filterProjects(filterValue);
            });
        });

        // Filter projects function
        function filterProjects(category) {
            let visibleProjects = 0;

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (category === 'all' || categories.includes(category)) {
                    card.style.display = 'block';
                    visibleProjects++;

                    // Add animation
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide empty state
            if (portfolioGrid && emptyState) {
                if (visibleProjects === 0) {
                    portfolioGrid.style.display = 'none';
                    emptyState.style.display = 'block';
                } else {
                    portfolioGrid.style.display = 'grid';
                    emptyState.style.display = 'none';
                }
            }
        }

        // Reset filters
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    }
                });

                filterProjects('all');
            });
        }

        // Add hover effects to project cards
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // ==================== PROJECT MODAL ====================
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('modal-close');
    const detailButtons = document.querySelectorAll('.project-detail-btn');

    // Project data for modal
    const projectsData = {
        1: {
            title: "E-Commerce Website",
            description: "A modern online store for electronics offering the latest gadgets, accessories, and devices with easy navigation, detailed product specs, and a fast, secure checkout experience.",
            longDescription: "eLife is your premier online destination for the latest electronics and gadgets, offering intuitive navigation, in-depth product details, and a fast, secure checkout process.",
            tech: ["HTML", "JavaScript", "CSS3",],
            features: [
                "Interactive UI with smooth animations",
                "Comprehensive product filtering",
                "User-friendly interface",
                "Responsive mobile design"
            ],
            challenges: "Handling large datasets efficiently while maintaining smooth animations was a significant challenge. Implemented virtualization and lazy loading to improve performance.",
            github: "https://github.com/hasu786/E-Commerce-Website",
            live: "https://hasu786.github.io/E-Commerce-Website/",
            image: "Assest/image/Capture.PNG"
        },
        2: {
            title: "TaskFlow - Productivity App",
            description: "A feature-rich task management application with drag-and-drop functionality, priority settings, and offline capability.",
            longDescription: "TaskFlow helps users organize their daily tasks with an intuitive interface and powerful features. The app supports multiple project views, deadline tracking, and collaboration features.",
            tech: ["JavaScript", "CSS3", "LocalStorage", "Drag & Drop API"],
            features: [
                "Drag-and-drop task management",
                "Offline functionality",
                "Multiple project views",
                "Priority and deadline tracking",
                "Dark/light theme toggle"
            ],
            challenges: "Implementing smooth drag-and-drop functionality across different browsers while maintaining state synchronization was challenging but rewarding.",
            github: "https://github.com/yourusername/taskflow-app",
            live: "https://taskflow.hassanmaredia.com",
            image: "images/project2.jpg"
        },
        3: {
            title: "ConnectHub - Social Platform",
            description: "A full-stack social media platform with real-time messaging, post sharing, and user authentication system.",
            longDescription: "ConnectHub is a modern social platform built with the MERN stack. It features real-time chat, media sharing, user profiles, and a recommendation system.",
            tech: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
            features: [
                "Real-time messaging",
                "Media upload and sharing",
                "User authentication",
                "Post liking and commenting",
                "Friend system"
            ],
            challenges: "Implementing real-time features with Socket.io while ensuring scalability and handling concurrent connections efficiently.",
            github: "https://github.com/yourusername/connecthub",
            live: "https://connecthub.hassanmaredia.com",
            image: "images/project3.jpg"
        },
        4: {
            title: "WeatherWise - Forecast App",
            description: "A beautifully designed weather application with 7-day forecasts, location detection, and animated weather icons.",
            longDescription: "WeatherWise provides accurate weather forecasts with a focus on user experience. The app uses geolocation to provide local weather and includes detailed forecasts with animated weather representations.",
            tech: ["JavaScript", "Weather API", "CSS Grid", "Geolocation API"],
            features: [
                "7-day detailed forecast",
                "Geolocation support",
                "Animated weather icons",
                "City search functionality",
                "Temperature unit toggle"
            ],
            challenges: "Creating smooth animations for weather transitions and handling API rate limits while providing accurate weather data.",
            github: "https://github.com/yourusername/weatherwise",
            live: "https://weatherwise.hassanmaredia.com",
            image: "images/project4.jpg"
        },
        5: {
            title: "Bella Vista Restaurant",
            description: "A modern restaurant website with online reservation system, interactive menu, and smooth animations.",
            longDescription: "Bella Vista showcases a fine dining restaurant with an elegant design. The website features an interactive menu, online booking system, and a gallery of culinary creations.",
            tech: ["React", "Framer Motion", "SCSS", "Formik"],
            features: [
                "Online reservation system",
                "Interactive food menu",
                "Photo gallery",
                "Smooth page transitions",
                "Mobile-responsive design"
            ],
            challenges: "Implementing complex animations while maintaining performance and creating an intuitive booking system that validates user inputs.",
            github: "https://github.com/yourusername/bella-vista",
            live: "https://bellavista.hassanmaredia.com",
            image: "images/project5.jpg"
        },
        6: {
            title: "LearnHub - E-Learning Platform",
            description: "An online learning platform with course management, progress tracking, and payment integration.",
            longDescription: "LearnHub is a comprehensive e-learning platform that allows instructors to create courses and students to learn at their own pace. Features include video lessons, quizzes, certificates, and progress tracking.",
            tech: ["Next.js", "PostgreSQL", "Stripe", "Prisma", "Cloudinary"],
            features: [
                "Course creation and management",
                "Video streaming",
                "Progress tracking",
                "Payment integration",
                "Certificate generation"
            ],
            challenges: "Implementing secure video streaming, handling file uploads efficiently, and creating a scalable database structure for course content.",
            github: "https://github.com/yourusername/learnhub",
            live: "https://learnhub.hassanmaredia.com",
            image: "images/project6.jpg"
        }
    };

    // Show modal with project details
    if (detailButtons.length > 0 && modal && modalContent) {
        detailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                const project = projectsData[projectId];

                if (project) {
                    showModal(project);
                }
            });
        });

        // Show modal function
        function showModal(project) {
            modalContent.innerHTML = `
                <div class="modal-project">
                    <div class="modal-header">
                        <h2 class="modal-title">${project.title}</h2>
                        <div class="modal-tech">
                            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    
                    <div class="modal-body">
                        <div class="modal-section">
                            <h3>Project Overview</h3>
                            <p>${project.longDescription}</p>
                        </div>
                        
                        <div class="modal-section">
                            <h3>Key Features</h3>
                            <ul class="features-list">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="modal-section">
                            <h3>Technical Challenges</h3>
                            <p>${project.challenges}</p>
                        </div>
                        
                        <div class="modal-links">
                            <a href="${project.github}" target="_blank" class="modal-link">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="${project.live}" target="_blank" class="modal-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            // Close modal on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // Add animation keyframes to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-project {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            color: black;
        }
        
        .modal-header {
            margin-bottom: 1rem;
        }
        
        .modal-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .modal-tech span {
            background: var(--background-alt);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .modal-image {
            border-radius: var(--radius);
            overflow: hidden;
            height: 300px;
        }
        
        .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .modal-section {
            margin-bottom: 2rem;
        }
        
        .modal-section h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .features-list {
            list-style: none;
            padding-left: 0;
        }
        
        .features-list li {
            padding: 0.5rem 0;
            padding-left: 2rem;
            position: relative;
        }
        
        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--primary-color);
            font-weight: bold;
        }
        
        .modal-links {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .modal-link {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            background: var(--primary-color);
            color: white;
            border-radius: var(--radius);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .modal-link:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

});
