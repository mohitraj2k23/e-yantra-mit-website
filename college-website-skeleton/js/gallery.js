/* ==========================================================
   gallery.js — filtering + lightbox behaviour for the gallery
   Edit the `photos` array below to point at your own images.
   ========================================================== */

// ---- Sample data. Swap "src" for your own image URLs. ----
  const photos = [
    {id:"IMG_1438", src:"https://picsum.photos/seed/rob01/900/700", cat:"Workshops", cap:"Line-following bot build session"},
    {id:"IMG_4090", src:"https://picsum.photos/seed/rob02/900/700", cat:"Competitions", cap:"Grand finale, arena walkthrough"},
    {id:"IMG_4149", src:"https://picsum.photos/seed/rob03/900/700", cat:"Robots", cap:"Autonomous rover, chassis v3"},
    {id:"IMG_4279", src:"https://picsum.photos/seed/rob04/900/700", cat:"Team", cap:"Mentors briefing new recruits"},
    {id:"IMG_4678", src:"https://picsum.photos/seed/rob05/900/700", cat:"Workshops", cap:"Soldering basics, evening batch"},
    {id:"IMG_4686", src:"https://picsum.photos/seed/rob06/900/700", cat:"Competitions", cap:"Maze-solver qualifiers"},
    {id:"IMG_4886", src:"https://picsum.photos/seed/rob07/900/700", cat:"Robots", cap:"Robotic arm, pick-and-place demo"},
    {id:"IMG_4896", src:"https://picsum.photos/seed/rob08/900/700", cat:"Campus", cap:"Lab floor, late-night debugging"},
    {id:"IMG_5086", src:"https://picsum.photos/seed/rob09/900/700", cat:"Team", cap:"Volunteers before the opening ceremony"},
    {id:"IMG_5109", src:"https://picsum.photos/seed/rob10/900/700", cat:"Competitions", cap:"Judges reviewing final scores"},
    {id:"IMG_5122", src:"https://picsum.photos/seed/rob11/900/700", cat:"Robots", cap:"Swarm bots, coordination test"},
    {id:"IMG_5140", src:"https://picsum.photos/seed/rob12/900/700", cat:"Workshops", cap:"Intro to microcontrollers"},
    {id:"IMG_5163", src:"https://picsum.photos/seed/rob13/900/700", cat:"Campus", cap:"Workshop hall, setup morning"},
    {id:"IMG_5178", src:"https://picsum.photos/seed/rob14/900/700", cat:"Robots", cap:"Vision-guided sorter, field trial"},
    {id:"IMG_5201", src:"https://picsum.photos/seed/rob15/900/700", cat:"Team", cap:"Core team, end-of-season photo"},
    {id:"IMG_5219", src:"https://picsum.photos/seed/rob16/900/700", cat:"Competitions", cap:"Winning team with their bot"},
  ];

  const categories = ["All", ...Array.from(new Set(photos.map(p => p.cat)))];
  const filtersEl = document.getElementById("filters");
  const galleryEl = document.getElementById("gallery");
  const emptyState = document.getElementById("emptyState");

  let activeCat = "All";
  let visible = photos;

  function countFor(cat){
    return cat === "All" ? photos.length : photos.filter(p => p.cat === cat).length;
  }

  function renderFilters(){
    filtersEl.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "chip" + (cat === activeCat ? " active" : "");
      btn.innerHTML = cat + ` <span class="count">${countFor(cat)}</span>`;
      btn.addEventListener("click", () => {
        activeCat = cat;
        renderFilters();
        renderGallery();
      });
      filtersEl.appendChild(btn);
    });
  }

  // Reveals tiles with a staggered "polaroid" entrance as they scroll into view.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  function renderGallery(){
    visible = activeCat === "All" ? photos : photos.filter(p => p.cat === activeCat);
    galleryEl.querySelectorAll(".tile").forEach(t => t.remove());

    if(visible.length === 0){
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }

    visible.forEach((p, i) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.setProperty("--reveal-delay", Math.min(i * 0.05, 0.4) + "s");
      tile.innerHTML = `
        <span class="tag">${p.id}</span>
        <span class="zoom-hint"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <img src="${p.src}" alt="${p.cap}" loading="lazy">
        <div class="overlay">
          <span class="cat">${p.cat}</span>
          <div class="cap">${p.cap}</div>
        </div>
      `;
      const img = tile.querySelector("img");
      const markLoaded = () => tile.classList.add("is-loaded");
      if(img.complete && img.naturalWidth > 0){
        markLoaded();
      } else {
        img.addEventListener("load", markLoaded);
        img.addEventListener("error", markLoaded);
      }
      tile.addEventListener("click", () => openLightbox(i));
      galleryEl.appendChild(tile);
      revealObserver.observe(tile);
    });
  }

  // ---- Lightbox ----
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCat = document.getElementById("lbCat");
  const lbCap = document.getElementById("lbCap");
  const lbCounter = document.getElementById("lbCounter");
  let currentIndex = 0;

  function openLightbox(index){
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function updateLightbox(crossFade){
    const p = visible[currentIndex];
    const apply = () => {
      lbImg.src = p.src;
      lbImg.alt = p.cap;
      lbCat.textContent = p.cat;
      lbCap.textContent = p.cap;
      lbCounter.textContent = String(currentIndex + 1).padStart(2,"0") + " / " + String(visible.length).padStart(2,"0");
      if(crossFade){
        requestAnimationFrame(() => lbImg.classList.remove("is-switching"));
      }
    };
    if(crossFade){
      lbImg.classList.add("is-switching");
      window.setTimeout(apply, 180);
    } else {
      apply();
    }
  }
  function nextImg(){ currentIndex = (currentIndex + 1) % visible.length; updateLightbox(true); }
  function prevImg(){ currentIndex = (currentIndex - 1 + visible.length) % visible.length; updateLightbox(true); }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbNext").addEventListener("click", nextImg);
  document.getElementById("lbPrev").addEventListener("click", prevImg);
  lightbox.addEventListener("click", (e) => { if(e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if(!lightbox.classList.contains("open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowRight") nextImg();
    if(e.key === "ArrowLeft") prevImg();
  });

  // touch swipe
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
  lightbox.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if(dx > 50) prevImg();
    else if(dx < -50) nextImg();
  }, {passive:true});

  // mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
    menuBtn.classList.toggle("is-open");
  });

  renderFilters();
  renderGallery();
