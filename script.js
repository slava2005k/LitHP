'use strict';

// Инициализация переменных
const sections = document.querySelectorAll('.sel');
const links = document.querySelectorAll('.navbar a');
let currentIndex = 0;
let isScrolling = false;
let lastScrollTime = 0;

// Прокрутка к секции
const scrollToSection = (index) => {
    const targetSection = sections[index];
    if (!targetSection || isScrolling) return;

    isScrolling = true;
    sections.forEach((section, i) => {
        section.classList.toggle('visible', i === index);
        section.classList.toggle('hidden', i !== index);
    });

    // Убрано window.scrollTo, так как секции fixed и overflow: hidden на body
    setTimeout(() => (isScrolling = false), 800);
};

window.addEventListener('load', () => {
    currentIndex = 0;
    scrollToSection(currentIndex);
});

// Обработчик колесика мыши
window.addEventListener('wheel', (event) => {
    const now = Date.now();
    if (now - lastScrollTime < 800 || isScrolling) return;

    lastScrollTime = now;
    const previousIndex = currentIndex;
    currentIndex = event.deltaY > 0 
        ? Math.min(currentIndex + 1, sections.length - 1) 
        : Math.max(currentIndex - 1, 0);
    
    if (currentIndex !== previousIndex) scrollToSection(currentIndex);
});

let touchStartY = 0;
let touchEndY = 0;

// Обработка свайпов
const handleSwipe = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;

    if (swipeDistance > swipeThreshold) {
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else if (swipeDistance < -swipeThreshold) {
        currentIndex = Math.max(currentIndex - 1, 0);
    }
    scrollToSection(currentIndex);
};

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchend', (event) => {
    if (event.changedTouches && event.changedTouches[0]) {
        touchEndY = event.changedTouches[0].clientY;
        handleSwipe();
    }
});

// Убрано window.addEventListener('scroll', ...), так как нет скролла из-за overflow: hidden

// Обработчик кликов по ссылкам
links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentIndex = index;
        scrollToSection(currentIndex);
    });
});

// Обработчик нажатий стрелок на клавиатуре
window.addEventListener('keydown', (event) => {
    const now = Date.now();
    if (now - lastScrollTime < 800 || isScrolling) return;

    lastScrollTime = now;
    const previousIndex = currentIndex;

    if (event.key === 'ArrowDown') {
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else if (event.key === 'ArrowUp') {
        currentIndex = Math.max(currentIndex - 1, 0);
    }

    if (currentIndex !== previousIndex) scrollToSection(currentIndex);
});

// Получаем элементы для эффектов
const neonIcon = document.querySelector('.glowing img'); // Уточнен селектор только для иконки
const neonText = document.querySelector('.glowing-text');
const faultyLetters = document.querySelectorAll('.faulty-letter-l, .faulty-letter-e, .faulty-letter-a');

// Эффект "поломки" при клике на иконку
if (neonIcon) {
    neonIcon.addEventListener('click', () => {
        if (neonText) {
            neonText.classList.add('broken');
        }
        faultyLetters.forEach(letter => {
            letter.style.animation = 'none'; // Отключаем анимацию
        });

        setTimeout(() => {
            if (neonText) {
                neonText.classList.remove('broken');
            }
            faultyLetters.forEach(letter => {
                letter.style.animation = ''; // Восстанавливаем анимацию
            });
        }, 3000);
    });
}

// Эффект "клика" на иконке
const glowingImg = document.querySelector('.glowing img');
if (glowingImg) {
    glowingImg.addEventListener('click', () => {
        glowingImg.classList.add('clicked');
        setTimeout(() => {
            glowingImg.classList.remove('clicked');
        }, 300);
    });
}

// Функция для копирования IP
function copyIP() {
    const ip = "limeplay.gomc.fun";
    navigator.clipboard.writeText(ip).then(() => {});
}

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