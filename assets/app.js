(function(){
  const cfg = window.HS_CONFIG || {};
  function q(sel){ return document.querySelector(sel); }
  function qa(sel){ return Array.from(document.querySelectorAll(sel)); }
  qa('[data-reserve-link]').forEach(a => { if (cfg.reserveUrl) a.href = cfg.reserveUrl; });
  qa('[data-cafe-link]').forEach(a => { if (cfg.social && cfg.social.cafeReservationUrl) a.href = cfg.social.cafeReservationUrl; });
  qa('[data-business-name]').forEach(el => el.textContent = cfg.business?.name || '');
  qa('[data-business-biz]').forEach(el => el.textContent = cfg.business?.bizNo || '');
  qa('[data-business-ceo]').forEach(el => el.textContent = cfg.business?.ceo || '');
  qa('[data-business-phone]').forEach(el => el.textContent = cfg.business?.phone || '');
  qa('[data-business-email]').forEach(el => el.textContent = cfg.business?.email || '');
  qa('[data-business-address]').forEach(el => el.textContent = cfg.business?.address || '');
  const cal = q('[data-calendar-embed]');
  if (cal && cfg.calendarEmbedUrl) cal.src = cfg.calendarEmbedUrl;
  const map = q('[data-map-embed]');
  if (map && cfg.mapEmbedUrl) map.src = cfg.mapEmbedUrl;
  const track = q('[data-carousel-track]');
  const dots = q('[data-carousel-dots]');
  if (track && Array.isArray(cfg.photos)) {
    cfg.photos.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (idx===0 ? ' active' : '');
      slide.innerHTML = `<img src="${src}" alt="농업살림센터 사진 ${idx+1}">`;
      track.appendChild(slide);
      if (dots) {
        const btn = document.createElement('button');
        btn.className = 'dot' + (idx===0 ? ' active' : '');
        btn.type = 'button';
        btn.addEventListener('click', () => setSlide(idx));
        dots.appendChild(btn);
      }
    });
    let current = 0;
    function setSlide(idx){
      const slides = qa('.slide'); const ds = qa('.dot');
      current = idx;
      slides.forEach((s,i)=>s.classList.toggle('active', i===idx));
      ds.forEach((d,i)=>d.classList.toggle('active', i===idx));
    }
    const prev = q('[data-prev-slide]'); const next = q('[data-next-slide]');
    if (prev) prev.addEventListener('click', ()=> setSlide((current-1+cfg.photos.length)%cfg.photos.length));
    if (next) next.addEventListener('click', ()=> setSlide((current+1)%cfg.photos.length));
    if (cfg.photos.length > 1) setInterval(()=> setSlide((current+1)%cfg.photos.length), 5000);
  }
})();
