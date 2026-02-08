// Preloader and animation setup
window.addEventListener("load", () => {
    // Fill the progress bar
    document.querySelector('.bar-fill').style.width = '100%';
    
    // Hide the loader and start hero animations
    setTimeout(() => {
        gsap.to('.preloader', { y: '-100%', duration: 1, ease: 'power4.inOut' });
        initHeroAnimations();
    }, 1000);
});

// Smooth scrolling using Lenis
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); ScrollTrigger.update(); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP animation helpers
gsap.registerPlugin(ScrollTrigger);

function initHeroAnimations() {
    const tl = gsap.timeline();
    tl.to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to('.typewriter', { opacity: 1, duration: 0.8 }, "-=0.5")
      .to('.hero-anim', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }, "-=0.5");
}

function initScrollAnimations() {
    gsap.utils.toArray('.glass-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: { trigger: card, start: "top 85%" },
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1
        });
    });
}

// Canvas particle background
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2; this.speedX = (Math.random() * 0.5) - 0.25; this.speedY = (Math.random() * 0.5) - 0.25;
            this.color = Math.random() > 0.8 ? '#C5A059' : '#ffffff'; this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
        }
        draw() { ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    function initParticles() { particlesArray = []; let n = (canvas.width * canvas.height) / 9000; for (let i = 0; i < n; i++) particlesArray.push(new Particle()); }
    function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });
    initParticles(); animateParticles();
}

// Configuration and event data
var submitted = false;
const EVENT_DATE = new Date("March 6, 2026 09:00:00").getTime();
const UPI_ID = "abucn5913@naviaxis";
const PAYEE_NAME = "MCET Colloquium";
const LOREM_IPSUM = "Join us for an exciting event filled with innovation and competition.";

const eventsData = [
    { name: "Robowar", price: 2000, img: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=500&q=80" },
    { name: "ACME", price: 200, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" },
    { name: "Bridge Modelling", price: 250, img: "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=500&q=80" },
    { name: "Automotive Biz Conclave", price: 200, img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80" },
    { name: "Reverse Marketing", price: 250, img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=500&q=80" },
    { name: "MUN (ISTE)", price: 150, img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=500&q=80" },
    { name: "Debate", price: 100, img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80" },
    { name: "Prompt Writing", price: 100, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80" },
    { name: "Program Debugging", price: 100, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" },
    { name: "Circuit Designing", price: 100, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
    { name: "AutoCAD Competition", price: 100, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80" }
];

// Rendering and interaction logic
const eventContainer = document.getElementById('events-container');
if (eventContainer) {
    eventsData.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.innerHTML = `
            <img src="${event.img}" alt="${event.name}" class="card-img">
            <div class="card-content">
                <h3>${event.name}</h3>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="gold-accent">₹${event.price}</span>
                </div>
                <div class="btn-group">
                    <button class="accent-btn" onclick="openRegister('${event.name}', ${event.price})">Register</button>
                    <button class="outline-btn" onclick="showDetails('${event.name}', '${event.img}')">Details</button>
                </div>
            </div>
        `;
        eventContainer.appendChild(card);
    });
    VanillaTilt.init(document.querySelectorAll(".glass-card"));
    initScrollAnimations();
}

let currentEvent = "";
let currentPrice = 0;

function openRegister(eventName, price) {
    try {
        currentEvent = eventName; currentPrice = price;
        const regSection = document.getElementById('register');
        if (regSection) regSection.scrollIntoView({ behavior: 'smooth' });
        
        const eventField = document.getElementById('eventField');
        if (eventField) eventField.value = eventName;
        document.getElementById('payAmount').innerText = "₹" + price;

        const mobileBox = document.getElementById('mobile-payment');
        const desktopBox = document.getElementById('desktop-payment');
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            if(mobileBox) mobileBox.style.display = 'block';
            if(desktopBox) desktopBox.style.display = 'none';
        } else {
            if(mobileBox) mobileBox.style.display = 'none';
            if(desktopBox) desktopBox.style.display = 'block';
        }
        updatePaymentLink();
    } catch (e) { console.error(e); }
}

function updatePaymentLink() {
    try {
        const fullNameInput = document.getElementById('fullName');
        const fullName = fullNameInput ? fullNameInput.value.trim() : "";
        
        // Payment reference: EventName_PersonName
        const noteRaw = fullName ? `${currentEvent}_${fullName}` : currentEvent;
        const note = noteRaw.replace(/[^a-zA-Z0-9_]/g, ''); 
        
        const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${currentPrice}&tn=${note}&cu=INR`;
        
        // Update Mobile Link
        const mobileBtn = document.getElementById('upiLink');
        if (mobileBtn) mobileBtn.href = upiLink;
        
        // Update Desktop QR & Text
        const qrImg = document.getElementById('qrCode');
        const qrText = document.getElementById('qrText');
        
        if (qrImg) {
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}&margin=2`;
            
            // Visual Text Update
            if (qrText) {
                if (fullName) {
                    qrText.innerText = `Scan for: ${note}`;
                    qrText.style.color = "var(--gold)";
                } else {
                    qrText.innerText = "Scan with GPay / PhonePe";
                    qrText.style.color = "#ccc";
                }
            }
        }
    } catch (e) { console.error(e); }
}

function showDetails(title, img) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImg').src = img;
    document.getElementById('detailsModal').style.display = 'flex';
}
function showSuccessModal() { document.getElementById('successModal').style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(e) { if (e.target.className === 'modal-overlay') e.target.style.display = "none"; }

const timer = setInterval(() => {
    const now = new Date().getTime(); const distance = EVENT_DATE - now;
    if (distance < 0) { clearInterval(timer); document.getElementById("countdown").innerHTML = "<h2 style='color:var(--gold)'>Event Started!</h2>"; return; }
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? "0"+d : d;
    if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
    if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
    if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;
}, 1000);

gsap.from(".about-section .hero-anim", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Initialize Swiper when DOM is ready - UPDATED WITH LARGER SIZES
document.addEventListener('DOMContentLoaded', function() {
    const eventSwiper = new Swiper('.eventSwiper', {
        // Core parameters
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        
        // Coverflow effect settings
        coverflowEffect: {
            rotate: 0,
            stretch: 120,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Optional pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Autoplay (optional - remove if you don't want auto-scrolling)
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Responsive breakpoints - UPDATED SIZES
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                coverflowEffect: {
                    stretch: 100,
                    depth: 150,
                    modifier: 2,
                }
            },
            640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                coverflowEffect: {
                    stretch: 120,
                    depth: 180,
                    modifier: 2.2,
                }
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 40,
                coverflowEffect: {
                    stretch: 110,
                    depth: 150,
                    modifier: 1.5,
                }
            },
        }
    });
});

const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('overlay');

if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => {
        // Toggle the 'X' animation on the icon
        menuBtn.classList.toggle('active');
        // Toggle the visibility of the menu
        overlay.classList.toggle('open');
    });

    // Optional: Close menu when a link is clicked
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            overlay.classList.remove('open');
        });
    });
}