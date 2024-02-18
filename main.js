const images = document.querySelectorAll('img[data-src]');
const loadButton = document.getElementById('loadImagesButton');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};  // Налаштування для IntersectionObserver

const lazyLoad = (target) => {
    target.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('loaded')) { // Перевіряємо, чи елемент у зоні видимості та ще не був завантажений
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in', 'loaded'); // Додається анімація, її можна змінити в майбутньому
            observer.unobserve(img);
        }
    });
};

const observer = new IntersectionObserver(lazyLoad, options); // Створюємо новий IntersectionObserver

loadButton.addEventListener('click', function () {
    images.forEach((img) => {
        observer.observe(img);
    });

    loadButton.style.display = 'none';  // Приховуємо кнопку після завантаження зображень
});