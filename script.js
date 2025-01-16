// Инициализация переменных
const sections = document.querySelectorAll('.block'); // Все блоки
const links = document.querySelectorAll('.navbar a'); // Ссылки в шапке
let currentIndex = 0; // Индекс текущего блока
let isScrolling = false; // Флаг для предотвращения лишнего скролла
let lastScrollTime = 0; // Время последнего скролла
let isInitialScroll = true; // Флаг для анимации появления при первом скролле

// Прокрутка к секции с анимацией исчезновения
const scrollToSection = (index) => {
    const targetSection = sections[index];
    if (!targetSection || isScrolling) return;

    isScrolling = true;

    // Убираем анимации скрытия, если это первая прокрутка
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('visible');
            section.classList.remove('hidden');
        } else {
            section.classList.remove('visible');
            section.classList.add('hidden');
        }
    });

    window.scrollTo({
        top: targetSection.offsetTop - 140,
        behavior: 'smooth',
    });

    setTimeout(() => (isScrolling = false), 800);
};


window.addEventListener('load', () => {
    currentIndex = 0; // Начальный блок
    scrollToSection(currentIndex); // Прокрутить к первому блоку
});


// Обработчик колесика мыши с блокировкой быстрого скролла
window.addEventListener('wheel', (event) => {
    const now = Date.now();
    if (now - lastScrollTime < 800 || isScrolling) return; // Если быстрый скролл или анимация идет, игнорируем

    lastScrollTime = now; // Обновляем время последнего скролла

    // Проверка, чтобы анимация появлялась при первом скролле
    if (isInitialScroll) {
        sections.forEach((section) => {
            section.classList.add('visible'); // Показать все блоки
        });
        isInitialScroll = false; // Больше не показывать все блоки
    }

    // Запоминаем текущий индекс перед прокруткой
    const previousIndex = currentIndex;

    if (event.deltaY > 0) {
        // Скролл вниз
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
        // Скролл вверх
        currentIndex = Math.max(currentIndex - 1, 0);
    }

    // Только если индекс изменился, выполняем прокрутку
    if (currentIndex !== previousIndex) {
        scrollToSection(currentIndex);
    }
});

let touchStartY = 0; // Координата начала касания
let touchEndY = 0;   // Координата окончания касания

// Функция для обработки свайпов
function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY; // Расстояние свайпа
    const swipeThreshold = 50; // Минимальная длина свайпа для обработки

    if (swipeDistance > swipeThreshold) {
        // Свайп вверх (следующий блок)
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(currentIndex);
    } else if (swipeDistance < -swipeThreshold) {
        // Свайп вниз (предыдущий блок)
        currentIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(currentIndex);
    }
}

// Событие начала касания
window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Запоминаем начальную координату
});

// Событие окончания касания
window.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY; // Запоминаем конечную координату
    handleSwipe(); // Обрабатываем свайп
});


// Обновление текущего индекса при ручной прокрутке
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        const scrollPosition = window.scrollY + 140; // Учитываем смещение
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentIndex = index; // Обновляем текущий индекс
            }
        });
    }
});

// Обработчик кликов по ссылкам
links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Отключаем стандартное поведение
        currentIndex = index; // Синхронизируем индекс
        scrollToSection(currentIndex); // Переходим к блоку
    });
});





const neonTitles = document.querySelectorAll('h2'); // Все заголовки

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function flickerEffect(element) {
    const dynamicShadow1 = getRandom(10, 20);
    const dynamicShadow2 = getRandom(15, 35);
    const opacity = getRandom(0.8, 1);

    // Фиксированное высокое свечение + динамическое
    element.style.textShadow = `
        0 0 5px #99ffbb, 
        0 0 30px #99ffbb, 
        0 0 35px #00ffb3, 
        0 0 ${dynamicShadow1}px #ccff00, 
        0 0 ${dynamicShadow2}px #00ffb3
    `;
    element.style.opacity = opacity;

    setTimeout(() => flickerEffect(element), getRandom(50, 300));
}

neonTitles.forEach(title => flickerEffect(title)); // Запуск для всех заголовков
