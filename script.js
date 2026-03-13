document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    // 1. 手機版選單
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 2. 導覽列滾動效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. 多語言切換核心邏輯
    let currentLang = localStorage.getItem('preferred-lang') || 'zh'; // 建議預設中文

    const updateLanguage = (lang) => {
        // 切換帶有 data-zh/data-en 的元素
        const langElements = document.querySelectorAll('[data-zh]');
        langElements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                // 檢查是否有子節點(如 <a>)，如果有，只更新文字節點
                if (el.children.length > 0 && el.querySelector('a')) {
                    // 保留連結，只改文字部分 (針對您參考文獻的結構)
                    const link = el.querySelector('a');
                    el.innerHTML = translation + '<br>';
                    el.appendChild(link);
                } else {
                    el.textContent = translation;
                }
            }
        });

        // 切換長篇區塊 (專門針對您 HTML 裡的 .zh-only 和 .en-only)
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

    // 初始執行
    updateLanguage(currentLang);

    // 按鈕點擊事件
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'en') ? 'zh' : 'en';
            updateLanguage(currentLang);
        });
    }

    // 4. 進場動畫
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