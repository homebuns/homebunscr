(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  var content = document.getElementById('lightbox-content');
  var counter = document.getElementById('lightbox-counter');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;
  var lastFocused = null;

  function render(index) {
    currentIndex = (index + items.length) % items.length;
    var item = items[currentIndex];
    var img = item.querySelector('img');
    if (img) {
      var alt = (img.getAttribute('alt') || '').replace(/"/g, '&quot;');
      content.innerHTML = '<img src="' + img.currentSrc + '" alt="' + alt + '">';
    } else {
      content.innerHTML = '<div class="image-placeholder">' + item.innerHTML + '</div>';
    }
    counter.textContent = (currentIndex + 1) + ' / ' + items.length;
  }

  function open(index) {
    lastFocused = document.activeElement;
    render(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () { open(index); });
  });

  prevBtn.addEventListener('click', function () { render(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { render(currentIndex + 1); });

  Array.prototype.slice.call(lightbox.querySelectorAll('[data-lightbox-close]')).forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target === el) close();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') render(currentIndex - 1);
    if (e.key === 'ArrowRight') render(currentIndex + 1);
  });
})();
