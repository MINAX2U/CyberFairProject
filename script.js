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
    } else {document.addEventListener('DOMContentLoaded', () => {
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

// 3. 點擊成員卡片彈出詳情卡片功能
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const memberCards = document.querySelectorAll('.member-card');

// 準備彈出層內的各個元素
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');

// 定義每個成員的詳細介紹文字 (選配，如果你的卡片裡原本沒有介紹文字的話)
const memberDescriptions = {
    '柳家語': '柳家語。',
    '楊沁': '楊沁',
    '曾芮歆': '曾芮歆',
    '蘇庭湘': '蘇庭湘',
    '王薰儀': '王薰儀',
    '王宇吉': '王宇吉',
    '阮瀚葦': '阮瀚葦',
    '張翔太': '張翔太',
    '賴奕辰': '賴奕辰',
    '王伯文': '王伯文',
    '孫晟棋': '孫晟棋'
};

memberCards.forEach(card => {
    card.addEventListener('click', () => {
        // A. 抓取被點擊卡片內的現有資訊
        const name = card.querySelector('.member-name').innerText;
        const role = card.querySelector('.member-role').innerText;
        const imgSrc = card.querySelector('.member-image').src;
        
        // B. 將抓到的資訊塞進彈出卡片中
        modalName.innerText = name;
        modalRole.innerText = role;
        modalImg.src = imgSrc;
        
        // C. 如果有預設的介紹文字，也塞進去 (如果沒有就用預設的)
        if (memberDescriptions[name]) {
            modalDesc.innerText = memberDescriptions[name];
        } else {
            modalDesc.innerText = '這裡是這位成員的預設詳細介紹文字。你可以根據需要隨時修改這段文字。';
        }
        
        // D. 顯示詳情層
        modalOverlay.classList.add('active');
        // 防止背景捲動
        document.body.style.overflow = 'hidden';
    });
});

// 關閉功能 (點擊叉叉)
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// 關閉功能 (點擊黑色背景)
modalOverlay.addEventListener('click', (e) => {
    // 確保點擊的是背景本身，而不是卡片內部
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});