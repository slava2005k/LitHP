// Находим элементы
const sections = document.querySelectorAll('.block');
const navLinks = document.querySelectorAll('.navbar a:not(.accent-link)');
let currentIndex = 0;
let isScrolling = false;

// Функция переключения слайдов
function showSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    // Скрываем все, показываем нужный
    sections.forEach((sec, i) => {
        if (i === index) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });

    // Тайм-аут для колесика мыши (чтобы не пролетало сразу всё)
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

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

// Обработка свайпов на телефоне
let touchStartY = 0;
window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
window.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) showSection(currentIndex + 1); // Свайп вверх
    if (touchEndY - touchStartY > 50) showSection(currentIndex - 1); // Свайп вниз
});

/* --- НЕОНОВЫЙ ЭФФЕКТ (Оранжевый) --- */
const neonTitles = document.querySelectorAll('h2');

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function flickerEffect(element) {
    // Параметры "глюка" света
    const opacity = getRandom(0.8, 1);
    const blur1 = getRandom(10, 20);
    const blur2 = getRandom(30, 60);

    // Оранжевая гамма: #ff7000 (основа), #ff4500 (темнее), #ffa500 (светлее)
    element.style.opacity = opacity;
    element.style.textShadow = `
        0 0 10px #ff7000,
        0 0 ${blur1}px #ff4500,
        0 0 ${blur2}px #ff7000
    `;

    // Рекурсивный вызов с разной задержкой для эффекта живого неона
    setTimeout(() => flickerEffect(element), getRandom(50, 400));
}

// Запускаем мерцание для всех заголовков
neonTitles.forEach(title => flickerEffect(title));