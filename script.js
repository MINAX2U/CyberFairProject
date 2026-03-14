document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 全局 DOM 元素選取
    // ==========================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const langBtn = document.getElementById('lang-btn');
    const heroTitle = document.querySelector('.hero-title');
    document.body.classList.add("lang-en");
    // ==========================================
    // 2. 手機版選單切換
    // ==========================================
   if (menuToggle && navLinks) {
        // 點擊漢堡按鈕時的開關邏輯
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // 點開時鎖住背景，關閉時解鎖
            navLinks.classList.toggle('active');
        });

        // 👇 這裡是你需要的！點擊選單內的任何連結時，自動收起選單並解鎖背景
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active'); // 漢堡按鈕恢復原狀
                navLinks.classList.remove('active');   // 隱藏選單
                document.body.classList.remove('no-scroll'); // 💡 解除背景鎖定！
            });
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
    let currentLang = localStorage.getItem('preferred-lang') || 'en';

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
                    el.textContent = translation; // 💡 這個預設邏輯對新的 <p> 標籤是正確的
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
        '柳家語': {
            zh: '透過網界博覽會，我有幸與台灣民防團體的相關人員進行訪談。這讓我從原本的陌生，轉而深刻理解民防工作的專業本質。我學到民防不僅是輔助力量，更涵蓋了緊急救護、災時物資調度以及社區防災網絡的建立。這段經歷讓我體會到，在危機發生時，這些訓練有素的民間組織對於維持社會運作至關重要，也大幅拓展了我對公共安全的認知。',
            en: 'Through Cyberfair, I interviewed personnel from Taiwan’s civil defense organizations. This experience completely changed my perspective. I discovered that their work goes far beyond simple support—it’s about professional emergency services and disaster response. Seeing how these dedicated people work quietly to keep our society safe during crises has been truly eye-opening and has deeply reshaped my understanding of community resilience.'
        },
        '楊沁': {
            zh: '因為爸爸的啟發，這幾年我開始深入接觸民防。選擇此主題作為專題，是希望大家能透過這個網站，看見台灣有一群人正為了「守護家園的平凡與和平」而默默努力。在研究過程中，我體會到民防不單是表面的「軍事防衛」，更是一場「從我到我們」的韌性實踐，展現出人與人之間守望相助的深刻承諾。',
            en: 'Inspired by my father, I began learning about civil defense in recent years. I chose this topic to show how a dedicated group in Taiwan strives to safeguard the peace of our homes. Throughout this project, I realized that civil defense is not just about "military defense"—it is a practice of resilience that transforms "I" into "We," showcasing a profound commitment to mutual aid.'
        },
        '曾芮歆': {
            zh: '這次的比賽對我而言是一次深刻的公民啟蒙，走訪台灣民防協會與高默防衛（S.T.A），讓我重新理解民防的真正面貌，它不是遙遠的軍事概念，而是每個人都能掌握的生存智慧，從災難救援、弱勢照顧到資源調配，民防編織出一張守護彼此的社會安全網，也讓我相信，當公民有能力自救與互救，整個社會便擁有了最韌性的力量。',
            en: "This competition was a profound civic awakening for me. Visiting the Taiwan Civil Defense Association and S.T.A. reshaped my understanding of what civil defense truly means — not a distant military concept, but practical wisdom within every citizen's reach. From disaster response and care for the vulnerable to community resource management, civil defense weaves a safety net held together by people, not institutions. This experience has made me believe that when citizens are empowered to protect themselves and one another, society gains its most resilient strength."
        },
        '蘇庭湘': {
            zh: '透過這次的網界博覽會，我逐漸了解民防的運作與重要性，經過進行訪談與整理內容的過程，也意識到民防不只是緊急應變，更需要平時的準備與全民參與。這次專題讓我接觸到新的議題，也對社會安全有了更深的認識。',
            en: 'Through participating in this CyberFair project, I gradually gained a better understanding of how civil defense works and why it is important. Through conducting interviews and organizing the information, I realized that civil defense is not only about responding to emergencies, but also about the need for preparation and participation from everyone in society. This project allowed me to explore a new topic and develop a deeper understanding of social safety.'
        },
        '王薰儀': {
            zh: '透過學姐的邀請，我有機會參與這次的比賽，也因此對民防有了更多了解。我發現民防並不是離我們很遙遠的軍事概念，而是和每個人都有關。在準備比賽資料時，我也有機會採訪教授，學習在短時間內抓住重點並記錄內容，這對我來說是一個很特別且深刻的學習經驗。',
            en: 'Through an invitation from a senior student, I had the opportunity to participate in this competition, which gave me a deeper understanding of civil defense. I discovered that civil defense is not a distant military concept, but rather something relevant to everyone. While preparing the competition materials, I also had the opportunity to interview professors, learning how to grasp key points and record information quickly – a unique and profound learning experience for me.'
        },
        '王宇吉': {
            zh: '在國際地緣政治瞬息萬變的21世紀，保護家園不只是軍隊的責任，更是每一個公民的義務。參與網界博覽會的過程中，有幸可以和劉玉皙老師進行訪談。更深入理解民防對台灣的重要性，也激發我對於台灣民防意識的重視和親身投入的熱情。',
            en: 'In the rapidly shifting geopolitical landscape of the 21st century, defending our homeland is no longer the sole responsibility of the military, but a fundamental duty of every citizen. Through the Cyberfair project, I had the pleasure of interviewing Professor Liu Yu-hsi. This experience deepened my understanding of the vital importance of civil defense to Taiwan, while igniting my passion to heighten public awareness and personally commit to these efforts.'
        },
        '阮瀚葦': {
            zh: '初次接觸民防議題與採訪專業人員，從起初的一知半解，到被教授的實務經驗震撼，讓我深刻體會到「民防」的重要性。希望能夠講這些知識轉化為大眾易懂的網頁，雖具挑戰卻也充滿意義。期盼這份心血能引領大家一起守護社會！',
            en: "Engaging with civil defense topics and interviewing an expert for the first time was an eye-opening experience. Transitioning from having limited knowledge to being deeply impressed by the professor's practical insights taught me the true value of civil defense. Turning this knowledge into an accessible webpage for the public is challenging but incredibly meaningful. Hope this project inspires the public to work together to protect our society!"
        },
        '張翔太': {
            zh: '去年是以主要負責人的身分參與網界博覽會這個比賽，今年很高興再度有這個機會協助學弟妹們完成專案。過程中我也清楚看見了自己在兩次比賽之間的蛻變與成長。',
            en: 'After leading the team in Cyberfair last year, it has been a pleasure to return this year to support my juniors with their project. Moving from a participant to a facilitator has allowed me to see just how much I’ve grown throughout these two competitions.'
        },
        '賴奕辰': {
            zh: '我主要負責網站的架設與視覺設計。透過實際開發，我不僅深入掌握了 UI/UX 排版技巧，更在優化網頁載入效能與前端邏輯上累積了寶貴經驗。這段過程讓我對網頁運作機制有更全面的理解，並學會如何在美觀與功能性之間取得平衡，提升了我的專案執行能力。',
            en: "I was responsible for the website's architecture and design. This experience allowed me to significantly enhance my skills in UI/UX layout and performance optimization. Beyond the technical implementation, I gained a deeper understanding of web mechanics and learned how to balance aesthetic appeal with functional efficiency, improving my project management capabilities."
        },
        '王伯文': {
            zh: '王伯文',
            en: 'Wang Bowen'
        },
        '孫晟棋': {
            zh: '在參加這次網界博覽會之後，除了學到許多與人溝通的技巧之外，原本我只對網頁設計有點理論上的認識，現在終於有機會把這些知識應用到實際的作品中，雖然這過程中十分累人，但是網站在完成之後的喜悅，讓我覺得一切都是值得的！',
            en: 'After participating in this Web Expo, not only did I learn a lot of communication skills, but I also finally had the chance to apply my theoretical knowledge of web design to a real-world project. Although the process was exhausting, the joy I felt upon completing the website made it all worthwhile!'
        }
    };

    // 確保頁面上有這些元素才執行，避免報錯
    if (modalOverlay && memberCards.length > 0) {
        memberCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. 抓取節點
        const nameNode = card.querySelector('.member-name');
        const roleNode = card.querySelector('.member-role');
        const imgNode = card.querySelector('.member-image');

        // 2. 重要：抓取 data-zh 作為索引 Key，而不是 innerText
        // 這樣不論現在是中文還是英文介面，idKey 都會是 "柳家語"
        const idKey = nameNode ? nameNode.getAttribute('data-zh') : '';
        
        // 3. 抓取目前要顯示的文字 (從 HTML 的 data 屬性抓取目前的翻譯)
        const name = nameNode ? nameNode.innerText : '';
        const role = roleNode ? roleNode.innerText : '';
        const imgSrc = imgNode ? imgNode.src : '';
        
        // 4. 填入 Modal
        if (modalName) modalName.innerText = name;
        if (modalRole) modalRole.innerText = role;
        if (modalImg) modalImg.src = imgSrc;
        
        if (modalDesc) {
            // 使用 idKey (中文名) 去找資料庫裡的內容
            const memberData = memberDescriptions[idKey];
            if (memberData) {
                // 根據當前語言 currentLang 顯示對應介紹
                modalDesc.innerText = memberData[currentLang] || memberData['zh']; 
            } else {
                modalDesc.innerText = currentLang === 'en' 
                    ? 'Default description in English.' 
                    : '這裡是預設的中文介紹。';
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