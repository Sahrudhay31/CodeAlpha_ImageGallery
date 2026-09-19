const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = Array.from(galleryItems)
        .filter(item => item.style.display !== 'none')
        .map(item => item.querySelector('img').src);
}

// Filtering
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        updateVisibleImages();
    });
});

// Lightbox open
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        const clickedSrc = item.querySelector('img').src;
        currentIndex = visibleImages.indexOf(clickedSrc);
        lightboxImg.src = clickedSrc;
        lightbox.style.display = 'flex';
    });
});

// Navigation
function showImage(index) {
    if (index < 0) index = visibleImages.length - 1;
    if (index >= visibleImages.length) index = 0;
    currentIndex = index;
    lightboxImg.src = visibleImages[currentIndex];
}

prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
closeBtn.addEventListener('click', () => (lightbox.style.display = 'none'));
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});