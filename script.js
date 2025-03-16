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

    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth',
    });

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
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

// Обновление индекса при ручной прокрутке
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentIndex = index;
            }
        });
    }
});

// Обработчик кликов по ссылкам
links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentIndex = index;
        scrollToSection(currentIndex);
    });
});

// Получаем элементы для эффектов
const neonIcon = document.querySelector('.glowing img, .faulty-letter-l, .faulty-letter-e, .faulty-letter-a');
const neonText = document.querySelector('.glowing-text');
const faultyLetters = document.querySelectorAll('.faulty-letter-l, .faulty-letter-e, .faulty-letter-a');

// Эффект "поломки" при клике на иконку
neonIcon.addEventListener('click', () => {
    neonText.classList.add('broken');
    faultyLetters.forEach(letter => {
        letter.style.animation = 'none'; // Отключаем анимацию
    });

    setTimeout(() => {
        neonText.classList.remove('broken');
        faultyLetters.forEach(letter => {
            letter.style.animation = ''; // Восстанавливаем анимацию
        });
    }, 3000);
});

// Эффект "клика" на иконке
const glowingImg = document.querySelector('.glowing img');
glowingImg.addEventListener('click', () => {
    glowingImg.classList.add('clicked');
    setTimeout(() => {
        glowingImg.classList.remove('clicked');
    }, 300);
});

// Функция для копирования IP
function copyIP() {
    const ip = "limeplay.gomc.fun";
    navigator.clipboard.writeText(ip).then(() => {});
}