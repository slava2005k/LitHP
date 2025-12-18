// Находим элементы
const sections = document.querySelectorAll('.block');
const navLinks = document.querySelectorAll('.navbar a:not(.accent-link)');
const scrollArrow = document.querySelector('.scroll-indicator'); // <--- Новая переменная
let currentIndex = 0;
let isScrolling = false;

// Функция переключения слайдов
function showSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    // Скрываем/показываем стрелку (только на первом слайде)
    if (currentIndex === 0) {
        scrollArrow.classList.remove('hidden');
    } else {
        scrollArrow.classList.add('hidden');
    }

    // Скрываем все блоки, показываем нужный
    sections.forEach((sec, i) => {
        if (i === index) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// Клик по стрелке листает вниз
scrollArrow.addEventListener('click', () => {
    showSection(currentIndex + 1);
});

// Обработка колесика мыши
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0) {
        showSection(currentIndex + 1);
    } else {
        showSection(currentIndex - 1);
    }
});

// Обработка кликов по меню
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(index);
    });
});

// Обработка свайпов (для мобилок)
let touchStartY = 0;
window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
window.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) showSection(currentIndex + 1);
    if (touchEndY - touchStartY > 50) showSection(currentIndex - 1);
});

/* --- НЕОНОВЫЙ ЭФФЕКТ --- */
const neonTitles = document.querySelectorAll('h2');
function getRandom(min, max) { return Math.random() * (max - min) + min; }

function flickerEffect(element) {
    const opacity = getRandom(0.8, 1);
    const blur1 = getRandom(10, 20);
    const blur2 = getRandom(30, 60);

    element.style.opacity = opacity;
    element.style.textShadow = `
        0 0 10px #ff7000,
        0 0 ${blur1}px #ff4500,
        0 0 ${blur2}px #ff7000
    `;
    setTimeout(() => flickerEffect(element), getRandom(50, 400));
}
neonTitles.forEach(title => flickerEffect(title));