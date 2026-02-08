// ============================================================
// COMPLETE EVENT.JS FILE - Full functionality with global functions
// ============================================================

// ============================================================
// CANVAS PARTICLE BACKGROUND
// ============================================================
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.color = Math.random() > 0.8 ? '#C5A059' : '#ffffff';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    initParticles();
    animateParticles();
}

// ============================================================
// DECLARE ALL VARIABLES ONCE
// ============================================================
const modal = document.getElementById('modal');
const eventDetailsModal = document.getElementById('eventDetailsModal');
const closeModalBtn = document.getElementById('closeModal');
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');
const tabButtons = document.querySelectorAll('.event-tabs .tab-button');
const modalTabButtons = document.querySelectorAll('.modal-tabs .tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const infoButtons = document.querySelectorAll('.btn-secondary');

// ============================================================
// CATEGORY FILTER FUNCTIONALITY
// ============================================================
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter events
            eventCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================================
// EVENT TAB FILTERING (for Technical/Cultural tabs)
// ============================================================
if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter events
            eventCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================================
// EVENT DETAILS DATA (for the first HTML file)
// ============================================================
const eventDetails = {
    robowar: {
        title: "Robowar",
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
        description: "Battle of steel and circuits! Design, build, and compete with your combat robot in an arena of destruction.",
        price: "₹2000",
        prizePool: "₹15,000",
        teamSize: "3-5 members",
        duration: "2 hours",
        info: {
            overview: "Robowar is the ultimate test of engineering prowess and strategic combat. Teams design and build remote-controlled combat robots to compete in a knockout tournament format. Your robot must survive brutal battles while attempting to disable opponents through flipping, pushing, or controlled destruction.",
            requirements: "At least one member must be from Civil/Mechanical/Electronics engineering. Teams must bring their own robots built according to specifications."
        },
        rules: [
            "Maximum robot weight: 60 kg",
            "Wireless remote control only (no autonomous bots)",
            "No liquid projectiles or flame weapons",
            "Arena dimensions: 18ft x 18ft enclosed arena",
            "Battle duration: 3 minutes per round",
            "Judges' decision is final"
        ],
        prizes: {
            winner: "₹15,000",
            runnerUp: "₹8,000",
            bestDesign: "₹3,000"
        }
    },
    acme: {
        title: "ACME",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        description: "Association of Computing Machinery Excellence - Showcase your programming prowess.",
        price: "₹200",
        prizePool: "₹5,000",
        teamSize: "Individual",
        duration: "3 hours",
        info: {
            overview: "ACME is a high-intensity competitive programming event where participants solve complex algorithmic challenges within strict time limits. Test your problem-solving skills, coding efficiency, and computational thinking against the best minds.",
            requirements: "Participants should bring their own laptops. Internet connection will be provided."
        },
        rules: [
            "3-hour coding marathon",
            "5-7 problems of varying difficulty",
            "Languages: C, C++, Java, Python",
            "Online judge system for instant feedback",
            "Scoring based on correctness and execution time",
            "Topics: Data structures, algorithms, dynamic programming, graph theory"
        ],
        prizes: {
            winner: "₹5,000",
            runnerUp: "₹3,000",
            third: "₹2,000"
        }
    },
    bridge: {
        title: "Bridge Modelling",
        image: "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=800&q=80",
        description: "Engineer the impossible! Design and construct structural masterpieces.",
        price: "₹250",
        prizePool: "₹7,000",
        teamSize: "2-4 members",
        duration: "4 hours",
        info: {
            overview: "Teams design and construct a scale model bridge using specified materials. The bridge must span a given distance while supporting maximum load. Combines structural engineering principles with creative design.",
            requirements: "All materials will be provided on-site. Teams should bring basic tools like scissors and rulers."
        },
        rules: [
            "Materials: Popsicle sticks (200 pieces), wooden glue, string, cardboard",
            "Must span minimum 50cm distance",
            "Load testing will be conducted incrementally",
            "Judging: Load capacity (60%), Design innovation (20%), Aesthetics (10%), Construction quality (10%)",
            "Bridge must be free-standing",
            "Construction time: 3 hours, Testing: 1 hour"
        ],
        prizes: {
            winner: "₹7,000",
            runnerUp: "₹4,000",
            bestDesign: "₹2,000"
        }
    },
    automotive: {
        title: "Automotive Biz Conclave",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        description: "Drive innovation forward with groundbreaking automotive business strategies.",
        price: "₹200",
        prizePool: "₹6,000",
        teamSize: "2-3 members",
        duration: "2.5 hours",
        info: {
            overview: "A business case competition focused on the automotive industry. Teams analyze real-world automotive challenges and present innovative business solutions, covering areas like electric vehicles, autonomous driving, and sustainable mobility.",
            requirements: "Teams must prepare a presentation (PPT/PDF). Projector will be provided."
        },
        rules: [
            "Challenge areas: EV market strategy, autonomous vehicles, sustainable manufacturing",
            "15-minute pitch + 10-minute Q&A with industry experts",
            "Presentation must include market analysis, solution, and financial projections",
            "Professional attire recommended",
            "Teams may use props or prototypes",
            "Judging based on innovation, feasibility, and presentation quality"
        ],
        prizes: {
            winner: "₹6,000",
            runnerUp: "₹3,500",
            audienceChoice: "₹1,500"
        }
    },
    marketing: {
        title: "Reverse Marketing",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
        description: "Flip the script! Create the most creative anti-campaigns.",
        price: "₹250",
        prizePool: "₹5,000",
        teamSize: "2-4 members",
        duration: "1.5 hours",
        info: {
            overview: "Put a comedic twist on marketing! Teams create anti-marketing campaigns that intentionally make products seem undesirable. Creativity, humor, and presentation skills are key to winning this unique challenge.",
            requirements: "Products will be assigned randomly. Teams can use any medium: video, print, digital, or live performance."
        },
        rules: [
            "Round 1: Written pitch (15 minutes)",
            "Round 2: Live presentation (10 minutes)",
            "Must make a desirable product seem undesirable",
            "Humor and creativity are essential",
            "Can use multimedia presentations",
            "Judging: Creativity (40%), Humor (30%), Execution (20%), Originality (10%)"
        ],
        prizes: {
            winner: "₹5,000",
            runnerUp: "₹3,000",
            mostCreative: "₹1,500"
        }
    },
    mun: {
        title: "Model United Nations",
        image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80",
        description: "Shape global diplomacy and debate critical world issues.",
        price: "₹150",
        prizePool: "₹4,000",
        teamSize: "Individual",
        duration: "Full Day",
        info: {
            overview: "Experience international diplomacy firsthand. Delegates represent countries in UN committees, debating global issues and drafting resolutions. Develop negotiation, public speaking, and research skills.",
            requirements: "Delegates must research their assigned country and topic. Formal business attire is mandatory."
        },
        rules: [
            "Committees: UNSC, UNHRC, IPC, General Assembly",
            "Full-day simulation with committee sessions",
            "Delegates must maintain decorum and parliamentary procedure",
            "Position papers required (submitted before event)",
            "Alliances and bloc formation encouraged",
            "Awards: Best Delegate, High Commendation, Special Mention"
        ],
        prizes: {
            bestDelegate: "₹4,000",
            highCommendation: "₹2,500",
            specialMention: "₹1,500"
        }
    },
    debate: {
        title: "Debate Championship",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        description: "Words are weapons! Engage in intellectual combat.",
        price: "₹100",
        prizePool: "₹3,000",
        teamSize: "2 members",
        duration: "3 hours",
        info: {
            overview: "Classic parliamentary debate competition. Teams argue for or against contemporary topics, demonstrating logical reasoning, evidence-based arguments, and eloquent delivery.",
            requirements: "No preparation materials allowed. Topics revealed on-spot. Teams should be prepared for any contemporary issue."
        },
        rules: [
            "British Parliamentary format",
            "2-person teams",
            "15-minute preparation time",
            "7-minute speeches per speaker",
            "Points of Information allowed",
            "Topics: Technology, environment, social justice, economic policy"
        ],
        prizes: {
            winner: "₹3,000",
            runnerUp: "₹2,000",
            bestSpeaker: "₹1,000"
        }
    },
    prompt: {
        title: "AI Prompt Engineering",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        description: "Master the art of AI communication through ingenious prompts.",
        price: "₹100",
        prizePool: "₹3,500",
        teamSize: "Individual",
        duration: "2 hours",
        info: {
            overview: "Compete in crafting the most effective prompts for AI language models. Participants receive specific tasks and must engineer prompts that produce the best outputs from AI systems.",
            requirements: "Laptops required. Access to AI platforms will be provided. Basic understanding of AI recommended."
        },
        rules: [
            "4 rounds: Creative content, Technical problem solving, Complex reasoning, Mystery challenge",
            "Each round has time limits",
            "Prompts must work with provided AI model",
            "Evaluation: Output quality (50%), Prompt efficiency (30%), Creativity (20%)",
            "Originality is key - plagiarism will be penalized",
            "Can use multi-turn conversations"
        ],
        prizes: {
            winner: "₹3,500",
            runnerUp: "₹2,000",
            mostInnovative: "₹1,000"
        }
    },
    debug: {
        title: "Debug Hunt",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        description: "Hunt down bugs with precision through broken code.",
        price: "₹100",
        prizePool: "₹3,000",
        teamSize: "Individual",
        duration: "2 hours",
        info: {
            overview: "Race against time to identify and fix bugs in intentionally broken code. Tests debugging skills, code comprehension, and problem-solving under pressure.",
            requirements: "Bring your own laptop with programming environment set up. Internet access provided for documentation."
        },
        rules: [
            "3 difficulty levels with increasing points",
            "Languages: C, C++, Java, Python, JavaScript",
            "Types: Syntax errors, logical errors, runtime errors",
            "Points for speed and accuracy",
            "Penalty for incorrect submissions",
            "Debugging tools allowed"
        ],
        prizes: {
            winner: "₹3,000",
            runnerUp: "₹2,000",
            fastestDebug: "₹1,000"
        }
    },
    circuit: {
        title: "Circuit Designing Challenge",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        description: "Wire your way to victory with innovative electronic circuits.",
        price: "₹100",
        prizePool: "₹4,000",
        teamSize: "2 members",
        duration: "3 hours",
        info: {
            overview: "Design functional electronic circuits to solve real-world problems. Teams receive a problem statement and must design, simulate, and present their circuit solution.",
            requirements: "Laptops with simulation software (Proteus/Multisim/TinkerCAD). Software tutorials will be provided if needed."
        },
        rules: [
            "Challenge areas: Analog circuits, Digital logic, Power electronics, Signal processing",
            "Must use provided simulation software",
            "Circuit must be functional in simulation",
            "Presentation of design and working",
            "Judging: Functionality (40%), Innovation (30%), Efficiency (20%), Presentation (10%)",
            "Components list must be realistic and available"
        ],
        prizes: {
            winner: "₹4,000",
            runnerUp: "₹2,500",
            bestInnovation: "₹1,000"
        }
    },
    autocad: {
        title: "AutoCAD Championship",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
        description: "Design with precision using AutoCAD mastery.",
        price: "₹100",
        prizePool: "₹3,500",
        teamSize: "Individual",
        duration: "2.5 hours",
        info: {
            overview: "Demonstrate CAD expertise through technical drawing challenges. Participants create detailed 2D drawings and 3D models based on specifications within time constraints.",
            requirements: "Laptops with AutoCAD installed. Trial versions acceptable. Practice files will be provided beforehand."
        },
        rules: [
            "3 rounds: 2D drafting (orthographic projections), 3D modeling, Complex assembly",
            "Drawings must follow engineering standards",
            "Dimensions and annotations required",
            "Time limits for each round",
            "Judging: Accuracy (40%), Complexity (30%), Time efficiency (20%), Presentation (10%)",
            "No external references or templates allowed"
        ],
        prizes: {
            winner: "₹3,500",
            runnerUp: "₹2,000",
            mostDetailed: "₹1,000"
        }
    },
    aiworkshop: {
        title: "AI & Machine Learning Workshop",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
        description: "Dive into the future of intelligence with hands-on ML training.",
        price: "₹300",
        prizePool: "Certificate",
        teamSize: "Individual",
        duration: "Full Day",
        info: {
            overview: "Comprehensive full-day workshop covering fundamental and advanced machine learning concepts. Hands-on coding sessions with real-world datasets and industry expert instructors.",
            requirements: "Laptops with Python installed. Jupyter Notebook recommended. Basic Python knowledge helpful but not mandatory."
        },
        rules: [
            "Topics: AI/ML fundamentals, Supervised/Unsupervised learning, Neural networks",
            "Deep learning basics, NLP, Computer vision",
            "Hands-on projects with Python and popular libraries",
            "Real-world datasets provided",
            "Certificate of completion for all participants",
            "Networking session with industry professionals"
        ],
        prizes: {
            certificate: "Certificate of Completion",
            materials: "Workshop materials and code samples",
            networking: "Industry networking opportunities"
        }
    }
};



// ============================================================
// GLOBAL FUNCTION: SWITCH BETWEEN TABS IN MODAL
// ============================================================
window.switchTab = function(event, tabName) {
    event.preventDefault();
    
    // Hide all tab contents
    document.querySelectorAll('.modal-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
};

// ============================================================
// GLOBAL FUNCTION: CLOSE EVENT DETAILS MODAL
// ============================================================
window.closeEventModal = function() {
    if (eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
    }
};

// ============================================================
// GLOBAL FUNCTION: REGISTRATION
// ============================================================
window.openRegister = function(eventName, price) {
    // Remove ₹ symbol from price for storage
    const cleanPrice = price.replace('₹', '');
    
    // Store event details in session storage
    sessionStorage.setItem('selectedEvent', eventName);
    sessionStorage.setItem('eventPrice', cleanPrice);
    
    // Redirect to registration page
    window.location.href = 'reg.html';
};

// ============================================================
// MODAL FUNCTIONALITY FOR INFO BUTTONS (Second HTML structure)
// ============================================================
if (infoButtons.length > 0) {
    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Get data attributes
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const rules = button.getAttribute('data-rules');
            const rulesImage = button.getAttribute('data-rules-image');

            // Get the event card's image
            const eventCard = button.closest('.event-card');
            const eventImage = eventCard ? eventCard.querySelector('img').src : '';

            // Populate modal content
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalRules = document.getElementById('modalRules');
            const modalImg = document.getElementById('modalImg');

            if (modalTitle) modalTitle.textContent = title || 'Event Title';
            if (modalDescription) modalDescription.textContent = description || 'Event description...';
            if (modalRules) modalRules.textContent = rules || 'Event rules...';
            if (modalImg) modalImg.src = eventImage || '';

            // Add rules image if it exists
            if (rulesImage) {
                const rulesTab = document.getElementById('rules');
                // Check if rules image element already exists
                let rulesImageElement = document.getElementById('modalRulesImage');
                if (!rulesImageElement && rulesTab) {
                    rulesImageElement = document.createElement('img');
                    rulesImageElement.id = 'modalRulesImage';
                    rulesImageElement.style.width = '100%';
                    rulesImageElement.style.maxWidth = '500px';
                    rulesImageElement.style.marginTop = '20px';
                    rulesImageElement.style.borderRadius = '10px';
                    rulesImageElement.style.border = '1px solid rgba(197, 160, 89, 0.3)';
                    rulesTab.appendChild(rulesImageElement);
                }
                if (rulesImageElement) {
                    rulesImageElement.src = rulesImage;
                    rulesImageElement.style.display = 'block';
                }
            }

            // Show modal
            if (modal) {
                modal.classList.add('active');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
}

// ============================================================
// CLOSE MODAL FUNCTIONALITY
// ============================================================
if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close eventDetailsModal when clicking outside
if (eventDetailsModal) {
    eventDetailsModal.addEventListener('click', (e) => {
        if (e.target === eventDetailsModal) {
            window.closeEventModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (eventDetailsModal && eventDetailsModal.style.display === 'flex') {
            window.closeEventModal();
        }
    }
});

// ============================================================
// MODAL TABS FUNCTIONALITY
// ============================================================
if (modalTabButtons.length > 0) {
    modalTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target tab
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all tab buttons
            modalTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show target tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ============================================================
// MUSIC CONTROLS
// ============================================================
const backgroundMusic = document.getElementById('backgroundMusic');
const togglePlayPause = document.getElementById('togglePlayPause');
const increaseVolume = document.getElementById('increaseVolume');
const decreaseVolume = document.getElementById('decreaseVolume');

if (backgroundMusic && togglePlayPause) {
    let isPlaying = false;

    togglePlayPause.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            togglePlayPause.textContent = '▶';
        } else {
            backgroundMusic.play();
            togglePlayPause.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    if (increaseVolume) {
        increaseVolume.addEventListener('click', () => {
            if (backgroundMusic.volume < 1) {
                backgroundMusic.volume = Math.min(1, backgroundMusic.volume + 0.1);
            }
        });
    }

    if (decreaseVolume) {
        decreaseVolume.addEventListener('click', () => {
            if (backgroundMusic.volume > 0) {
                backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.1);
            }
        });
    }
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================================
// SCROLL REVEAL ANIMATION FOR CARDS
// ============================================================
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

// Observe all event cards
eventCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ============================================================
// GSAP ANIMATIONS (if GSAP is loaded)
// ============================================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate event cards on scroll
    gsap.utils.toArray('.event-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1
        });
    });

    // Animate section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        gsap.from(sectionTitle, {
            scrollTrigger: {
                trigger: sectionTitle,
                start: 'top 80%'
            },
            opacity: 0,
            y: -30,
            duration: 0.8
        });
    }

    // Animate events hero
    const eventsHero = document.querySelector('.events-hero');
    if (eventsHero) {
        gsap.from('.page-title', {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.page-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
    }
}
