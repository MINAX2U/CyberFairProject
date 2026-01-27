/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 選取所有帶有 .fade-up 的元素
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 當元素出現 10% 時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 動畫只播放一次
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));
});