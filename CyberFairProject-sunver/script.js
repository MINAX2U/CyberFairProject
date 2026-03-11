document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // 1. 手機版選單切換
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 2. 滾動效果
    window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const maxScroll = 400; 
    const scrollFraction = Math.min(scrollY / maxScroll, 1);
    
    // 縮放：從 1 變 0.3
    const scale = 1 - (scrollFraction * 0.7); 
    const opacity = 1 - (scrollFraction * 1.5); 
    
    // 位移：讓大標題往左上角偏 (數值可視情況調整)
    const moveX = -(scrollFraction * 150); // 增加往左偏的量
    const moveY = -(scrollFraction * 100); 

    if (heroTitle) {
        heroTitle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        heroTitle.style.opacity = opacity > 0 ? opacity : 0;
    }
});

    // 3. 進場動畫
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
