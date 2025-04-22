document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projects = [
       
        {
            
                title: "Solar System Explorer",
                description: "An interactive educational website about our solar system with detailed planet information.",
                image: "planets-in-our-solar-system-uhd-8k-wallpaper.jpg",
                tags: ["Web Development", "Education", "Interactive Design"],
                category: "web",
                link: "https://waeel11.github.io/planets/main.html",
                date: "June 2023",
                skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                summary: "Educational platform providing comprehensive information about planets in our solar system",
                solution: "Created an engaging interface with facts, statistics, and visual representations of each planet",
                approach: "Mobile-first design with interactive elements to enhance learning experience"
            
        }
        
    ];

    // Display projects on page
    function displayProjects(filter = 'all') {
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = '';

        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);

        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-card');
            
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="project-link" data-project="${project.title.replace(/\s+/g, '-').toLowerCase()}">View Details</a>
                </div>
            `;
            
            projectsGrid.appendChild(projectElement);
        });

        // Add event listeners to detail buttons
        document.querySelectorAll('.project-link').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const project = projects.find(p => p.title.replace(/\s+/g, '-').toLowerCase() === projectId);
                showProjectModal(project);
            });
        });
    }

    // Show project details modal
    function showProjectModal(project) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${project.title}</h2>
                <div class="modal-body">
                    <div class="modal-img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-details">
                        <h3>Project Summary</h3>
                        <p>${project.summary}</p>
                        
                        <h3>Solution</h3>
                        <p>${project.solution}</p>
                        
                        <h3>Approach</h3>
                        <p>${project.approach}</p>
                        
                        <div class="project-meta">
                            <p><strong>Completion Date:</strong> ${project.date}</p>
                            <p><strong>Skills Used:</strong> ${project.skills.join(', ')}</p>
                        </div>
                        
                        <a href="${project.link}" class="btn" target="_blank">View Project</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Filter projects
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            displayProjects(filter);
        });
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                navLinks.classList.remove('active');
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize projects display
    displayProjects();
});

// Add dynamic modal styles
const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        padding: 2rem;
    }
    
    .modal-content {
        background: white;
        border-radius: 10px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 2rem;
        position: relative;
        animation: fadeIn 0.3s ease;
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-light);
    }
    
    .modal-body {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;
    }
    
    .modal-img {
        flex: 1;
    }
    
    .modal-img img {
        width: 100%;
        border-radius: 8px;
    }
    
    .modal-details {
        flex: 1;
    }
    
    .modal h2 {
        color: var(--secondary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
    }
    
    .modal h3 {
        color: var(--secondary-color);
        margin: 1.5rem 0 0.5rem;
    }
    
    .project-meta {
        margin: 1.5rem 0;
        background: var(--light-color);
        padding: 1rem;
        border-radius: 8px;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);