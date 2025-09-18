const boxes = document.querySelectorAll('.box, .rec');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');
const closeBtn = overlay.querySelector('.close-btn');
let activeBox = null;



boxes.forEach(box => {
  box.addEventListener('click', (e) => {
    e.stopPropagation();  // Prevent this click from reaching the document listener

    const rect = box.getBoundingClientRect();
    box.classList.add('hidden');
    activeBox = box;


    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';

    overlay.classList.add('visible');

    void overlay.offsetWidth; // Force reflow

    overlay.style.top = '10vh';
    overlay.style.left = '10vw';
    overlay.style.width = '80vw';
    overlay.style.height = '80vh';


    const img = box.querySelector('img');
    if (!img) return; // No image inside this box, skip

    const imgSrc = img.src; // Get image URL

    // Set overlay image src to this box’s image src
    overlayImg.src = imgSrc;
  });
});

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent bubbling to document

  if (!activeBox) return;

  const rect = activeBox.getBoundingClientRect();

  overlay.style.top = rect.top + 'px';
  overlay.style.left = rect.left + 'px';
  overlay.style.width = rect.width + 'px';
  overlay.style.height = rect.height + 'px';

  setTimeout(() => {
    overlay.classList.remove('visible');
    overlay.style.top = '';
    overlay.style.left = '';
    overlay.style.width = '';
    overlay.style.height = '';
    activeBox.classList.remove('hidden');
    activeBox = null;
  }, 300);
});

overlay.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent bubbling to document
});

// Document click closes overlay only when clicking outside overlay and boxes
document.addEventListener('click', () => {
  if (activeBox) {
    closeBtn.click();
  }
});