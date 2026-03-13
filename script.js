document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 全局 DOM 元素選取
    // ==========================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const langBtn = document.getElementById('lang-btn');
    const heroTitle = document.querySelector('.hero-title');

    // ==========================================
    // 2. 手機版選單切換
    // ==========================================
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================
    // 3. 滾動效果 (導覽列背景 & 標題動畫)
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // 控制導覽列背景
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // 標題向左上角縮小動畫
        if (heroTitle) {
            const maxScroll = 400; 
            const scrollFraction = Math.min(scrollY / maxScroll, 1);
            
            // 計算參數
            const scale = 1 - (scrollFraction * 0.7); // 縮小到約 0.3
            const opacity = 1 - (scrollFraction * 1.2); // 稍微提早變透明
            
            // 計算位移
            const moveX = -(scrollFraction * 50); 
            const moveY = -(scrollFraction * 100);

            heroTitle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
            heroTitle.style.opacity = opacity > 0 ? opacity : 0;
        }
    });

    // ==========================================
    // 4. 進場動畫 (Fade-up)
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ==========================================
    // 5. 錨點平滑滾動
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // 避免單純 # 號造成報錯

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 6. 多語言切換邏輯
    // ==========================================
    let currentLang = localStorage.getItem('preferred-lang') || 'zh';

    const updateLanguage = (lang) => {
        // 切換帶有 data-zh/data-en 的元素
        const langElements = document.querySelectorAll('[data-zh]');
        langElements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                if (el.children.length > 0 && el.querySelector('a')) {
                    const link = el.querySelector('a');
                    el.innerHTML = translation + '<br>';
                    el.appendChild(link);
                } else {
                    el.textContent = translation;
                }
            }
        });

        // 切換長篇區塊
        document.querySelectorAll('.zh-only').forEach(el => {
            el.style.display = (lang === 'zh') ? 'block' : 'none';
        });
        document.querySelectorAll('.en-only').forEach(el => {
            el.style.display = (lang === 'en') ? 'block' : 'none';
        });

        // 更新按鈕文字
        if (langBtn) {
            langBtn.innerText = (lang === 'en') ? '中' : 'EN';
        }
        
        localStorage.setItem('preferred-lang', lang);
    };

    updateLanguage(currentLang); // 初始執行

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'en') ? 'zh' : 'en';
            updateLanguage(currentLang);
        });
    }

    // ==========================================
    // 7. 成員卡片彈出詳情 (Modal) 功能
    // ==========================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const memberCards = document.querySelectorAll('.member-card');

    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDesc = document.getElementById('modalDesc');

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

    // 確保頁面上有這些元素才執行，避免報錯
    if (modalOverlay && memberCards.length > 0) {
        memberCards.forEach(card => {
            card.addEventListener('click', () => {
                // 安全地抓取節點內容
                const nameNode = card.querySelector('.member-name');
                const roleNode = card.querySelector('.member-role');
                const imgNode = card.querySelector('.member-image');

                const name = nameNode ? nameNode.innerText : '';
                const role = roleNode ? roleNode.innerText : '';
                const imgSrc = imgNode ? imgNode.src : '';
                
                if (modalName) modalName.innerText = name;
                if (modalRole) modalRole.innerText = role;
                if (modalImg) modalImg.src = imgSrc;
                
                if (modalDesc) {
                    if (memberDescriptions[name]) {
                        modalDesc.innerText = memberDescriptions[name];
                    } else {
                        modalDesc.innerText = '這裡是這位成員的預設詳細介紹文字。你可以根據需要隨時修改這段文字。';
                    }
                }
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});