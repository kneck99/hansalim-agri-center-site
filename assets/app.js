(function(){
  const cfg = window.HS_CONFIG || {};
  const qa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const q = (sel, root=document) => root.querySelector(sel);

  qa('[data-site-title]').forEach(el => el.textContent = cfg.siteTitle || '한살림 농업살림센터');
  qa('[data-reserve-link]').forEach(a => { if (cfg.reserveUrl) a.href = cfg.reserveUrl; });
  qa('[data-cafe-link]').forEach(a => { if (cfg.social && cfg.social.cafeReservationUrl) a.href = cfg.social.cafeReservationUrl; });

  const business = cfg.business || {};
  qa('[data-business-name]').forEach(el => el.textContent = business.name || '');
  qa('[data-business-biz]').forEach(el => el.textContent = business.bizNo || '');
  qa('[data-business-ceo]').forEach(el => el.textContent = business.ceo || '');
  qa('[data-business-phone]').forEach(el => el.textContent = business.phone || '');
  qa('[data-business-email]').forEach(el => el.textContent = business.email || '');
  qa('[data-business-address]').forEach(el => el.textContent = business.address || '');

   const cal = q('[data-calendar-embed]');
  if (cal && cfg.calendarEmbedUrl) cal.src = cfg.calendarEmbedUrl;

  const map = q('[data-map-embed]');
  if (map && cfg.mapEmbedUrl) map.src = cfg.mapEmbedUrl;

  const navToggle = q('.nav-toggle');
  const navLinks = q('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });

    qa('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
          navLinks.classList.remove('is-open');
          navToggle.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', '메뉴 열기');
        }
      });
    });
  }

  function resetEmbed(iframe) {
    if (!iframe) return;
    const box = iframe.parentElement;
    if (!box) return;

    box.classList.remove('embed-enhanced');
    box.style.height = '';

    iframe.classList.remove('scaled-embed');
    iframe.style.width = '';
    iframe.style.height = '';
    iframe.style.transform = '';
    iframe.style.left = '';
    iframe.style.top = '';
    iframe.style.position = '';
  }

  function fitEmbedMobile(iframe, baseWidth, baseHeight) {
    if (!iframe) return;
    const box = iframe.parentElement;
    if (!box) return;

    const width = box.clientWidth || baseWidth;
    const scale = width / baseWidth;

    box.classList.add('embed-enhanced');
    box.style.height = `${Math.round(baseHeight * scale)}px`;

    iframe.classList.add('scaled-embed');
    iframe.style.position = 'absolute';
    iframe.style.left = '0';
    iframe.style.top = '0';
    iframe.style.width = `${baseWidth}px`;
    iframe.style.height = `${baseHeight}px`;
    iframe.style.transformOrigin = 'top left';
    iframe.style.transform = `scale(${scale})`;
  }

  function resizeEmbeds() {
    const isMobile = window.innerWidth <= 720;

    if (isMobile) {
      fitEmbedMobile(cal, 980, 700);
      fitEmbedMobile(map, 980, 520);
    } else {
      resetEmbed(cal);
      resetEmbed(map);
    }
  }

  window.addEventListener('resize', resizeEmbeds);
  window.addEventListener('load', resizeEmbeds);
  resizeEmbeds();

  const track = q('[data-carousel-track]');
  const dots = q('[data-carousel-dots]');
  const prev = q('[data-prev-slide]');
  const next = q('[data-next-slide]');

  if (track && Array.isArray(cfg.photos) && cfg.photos.length) {
    cfg.photos.forEach((src, idx) => {
      const slide = document.createElement('figure');
      slide.className = 'slide' + (idx === 0 ? ' active' : '');
      slide.innerHTML = `<img src="${src}" alt="농업살림센터 사진 ${idx+1}">`;
      track.appendChild(slide);
      if (dots) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `슬라이드 ${idx+1}`);
        dots.appendChild(dot);
      }
    });

    let current = 0;
    const slides = () => qa('.slide', track);
    const dotButtons = () => qa('.dot', dots || document);

    function go(idx){
      const s = slides();
      const d = dotButtons();
      current = (idx + s.length) % s.length;
      s.forEach((el, i) => el.classList.toggle('active', i === current));
      d.forEach((el, i) => el.classList.toggle('active', i === current));
    }

    dotButtons().forEach((btn, idx) => btn.addEventListener('click', () => go(idx)));
    if (prev) prev.addEventListener('click', () => go(current - 1));
    if (next) next.addEventListener('click', () => go(current + 1));

    if (cfg.photos.length > 1) {
      setInterval(() => go(current + 1), 5000);
    }
  }
})();
