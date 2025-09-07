/**
* Template Name: Tour
* Template URL: https://bootstrapmade.com/tour-bootstrap-travel-website-template/
* Updated: Jul 01 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
// ---------- shared partial includes ----------
(function () {
  // Inject partials into placeholders
  async function inject(name, file, after) {
    const slot = document.querySelector(`[data-include="${name}"]`);
    if (!slot) return;
    try {
      const res = await fetch(file + '?v=' + Date.now(), { cache: 'no-cache' });
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      slot.innerHTML = await res.text();
      if (typeof after === 'function') after(slot);
    } catch (e) {
      console.error(`Include ${name} failed:`, e);
    }
  }

  // Init header behaviors (mobile toggle, dropdowns, active link)
  function initHeader(root) {
    const toggle = root.querySelector('.mobile-nav-toggle'); // the hamburger <i>
    const navMenu = root.querySelector('.navmenu');          // the <nav>
    const list = navMenu?.querySelector('ul');
    if (!toggle || !navMenu || !list) return;

    // Prevent double binding if header is injected again
    if (toggle.dataset.bound === '1') return;
    toggle.dataset.bound = '1';

    // Hamburger toggle
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('mobile-nav-active');
      toggle.classList.toggle('bi-list');
      toggle.classList.toggle('bi-x');
      toggle.setAttribute(
        'aria-expanded',
        document.body.classList.contains('mobile-nav-active')
      );
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!document.body.classList.contains('mobile-nav-active')) return;
      if (root.contains(e.target)) return; // ignore clicks inside header
      document.body.classList.remove('mobile-nav-active');
      toggle.classList.add('bi-list');
      toggle.classList.remove('bi-x');
    });

    // Dropdown toggle on mobile
    const dropdownLinks = root.querySelectorAll('.navmenu .dropdown > a');
    dropdownLinks.forEach((link) => {
      link.addEventListener('click', (ev) => {
        if (window.innerWidth <= 1199) { // only mobile
          ev.preventDefault();
          const submenu = link.nextElementSibling; // the <ul>
          submenu?.classList.toggle('dropdown-active');
          link.classList.toggle('active');
        }
      });
    });

    // --- Active link highlight ---
    // Remove any hardcoded 'active'
    root.querySelectorAll('#navmenu a.active').forEach(a => a.classList.remove('active'));
    // Determine current file name (default to index.html)
    const here = location.pathname.split('/').pop() || 'index.html';

    // Map detail pages to their main section
    function normalize(file) {
      if (/^destination/i.test(file)) return 'destinations.html';
      if (/^tour/i.test(file))        return 'tours.html';
      if (/^blog/i.test(file))        return 'blog.html';
      if (/^faq/i.test(file))         return 'faq.html';
      if (/^privacy/i.test(file))     return 'privacy.html';
      if (/^terms/i.test(file))       return 'terms.html';
      return file || 'index.html';
    }
    const target = normalize(here);

    const match = root.querySelector(`#navmenu a[href$="${target}"]`);
    if (match) {
      match.classList.add('active');
      // if inside dropdown, also highlight the parent link
      const parentTop = match.closest('.dropdown')?.querySelector(':scope > a');
      parentTop && parentTop.classList.add('active');
    }
  }

  // Do the actual includes
  inject('header', 'partials/navbar.html', initHeader);
  inject('footer', 'partials/footer.html');
})();



(function() {
  "use strict";
  

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();
// --- Featured Tours catalog used by booking page ---
const TOUR_CATALOG = {
  'golden-rock': {
    title: 'Golden Rock Pilgrimage & Bago Heritage',
    slug: 'golden-rock',
    durationDays: 2,
    durationText: '2 Days',
    location: 'Kyaiktiyo & Bago, Myanmar',
    price: 199,
    image: 'assets/img/travel/tours/tour_1.jpg'
  },
  'myeik-archipelago': {
    title: 'Myeik Archipelago Island Cruise',
    slug: 'myeik-archipelago',
    durationDays: 5,
    durationText: '5 Days',
    location: 'Tanintharyi, Myanmar',
    price: 899,
    image: 'assets/img/travel/tours/tour_2.webp'
  },
  'kalaw-inle-trek': {
    title: 'Kalaw to Inle Lake Trek',
    slug: 'kalaw-inle-trek',
    durationDays: 3,
    durationText: '3 Days',
    location: 'Shan State, Myanmar',
    price: 349,
    image: 'assets/img/travel/tours/tour_3.jpg'
  },
  'pindaya-caves': {
    title: 'Pindaya Caves & Shan Hills Escape',
    slug: 'pindaya-caves',
    durationDays: 2,
    durationText: '2 Days',
    location: 'Shan State, Myanmar',
    price: 279,
    image: 'assets/img/travel/tours/tour_4.jpg'
  },
  'sagaing-ava-amarapura': {
    title: 'Sagaing, Ava & Amarapura Day Tour',
    slug: 'sagaing-ava-amarapura',
    durationDays: 1,
    durationText: '1 Day',
    location: 'Mandalay Region, Myanmar',
    price: 129,
    image: 'assets/img/travel/tours/tour_5.jpg'
  },
  'myauk-u': {
    title: 'Myauk U Ancient Kingdom Tour',
    slug: 'myauk-u',
    durationDays: 4,
    durationText: '4 Days',
    location: 'Rakhine State, Myanmar',
    price: 599,
    image: 'assets/img/travel/tours/tour_6.jpg'
  }
};

// --- Booking page wiring ---
(function initBookingPage() {
  if (!document.body.classList.contains('booking-page')) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('tour');

  const $ = (s, r=document) => r.querySelector(s);
  const tourSelect = $('#tour-select');
  const tourDuration = $('#tour-duration');
  const depart = $('#departure-date');
  const ret = $('#return-date');
  const adults = $('#adults');
  const children = $('#children');

  // Sidebar targets
  const sumImg = $('.selected-tour img');
  const sumTitle = $('.selected-tour .tour-info h5');
  const sumDuration = $('.selected-tour .tour-info p:nth-of-type(1)');
  const sumLocation = $('.selected-tour .tour-info p:nth-of-type(2)');
  const baseLine = [...document.querySelectorAll('.price-item .description')]
    .find(el => /Base Price/i.test(el.textContent))?.parentElement;
  const totalLine = $('.price-total .amount');

  // Populate the select from your catalog
  if (tourSelect) {
    tourSelect.innerHTML = '<option value="">Select a tour...</option>' +
      Object.values(TOUR_CATALOG)
        .map(t => `<option value="${t.slug}">${t.title} - ${t.durationText}</option>`)
        .join('');
  }

  function clearTour() {
    
    tourSelect && (tourSelect.value = '');
    tourDuration && (tourDuration.value = '');
    sumImg && (sumImg.src = 'assets/img/placeholder.jpg');
    sumTitle && (sumTitle.textContent = '—');
    sumDuration && (sumDuration.innerHTML = '<i class="bi bi-calendar"></i> —');
    sumLocation && (sumLocation.innerHTML = '<i class="bi bi-geo-alt"></i> —');
    if (baseLine) {
      baseLine.querySelector('.description').textContent = 'Base Price (Select tour)';
      baseLine.querySelector('.amount').textContent = '$0';
    }
    totalLine && (totalLine.textContent = '$0');
    ret && (ret.value = '');
    const img = document.getElementById('summary-img');
  if (img) {
    img.src = '';
    img.classList.add('d-none');
  }
  }

  function pickTour(sl) {

    const t = TOUR_CATALOG[sl];
  if (!t) return clearTour();

  const img = document.getElementById('summary-img');
  if (img) {
    img.src = t.image;
    img.classList.remove('d-none');
  }
    // reflect selection
    if (tourSelect) tourSelect.value = t.slug;
    if (tourDuration) tourDuration.value = t.durationText;

    // auto-return date if departure chosen
    if (depart?.value) {
      const d = new Date(depart.value);
      if (!Number.isNaN(d.getTime())) {
        const back = new Date(d);
        back.setDate(back.getDate() + t.durationDays - 1);
        ret.value = back.toISOString().slice(0,10);
      }
    }

    // sidebar
    sumImg && (sumImg.src = t.image);
    sumTitle && (sumTitle.textContent = t.title);
    sumDuration && (sumDuration.innerHTML = `<i class="bi bi-calendar"></i> ${t.durationText}`);
    sumLocation && (sumLocation.innerHTML = `<i class="bi bi-geo-alt"></i> ${t.location}`);

    // pricing
    const a = parseInt(adults?.value || '1', 10) || 1;
    const c = parseInt(children?.value || '0', 10) || 0;
    const base = a * t.price + Math.round(c * t.price * 0.7);
    if (baseLine) {
      baseLine.querySelector('.description').textContent =
        `Base Price (${a} Adult${a>1?'s':''}${c?`, ${c} Child${c>1?'ren':''}`:''})`;
      baseLine.querySelector('.amount').textContent = `$${base.toLocaleString()}`;
    }
    const addOns = [...document.querySelectorAll('.price-item:not(.tax-item) .amount')]
      .filter(el => el !== baseLine?.querySelector('.amount'))
      .map(el => Number(el.textContent.replace(/[^0-9.]/g,'')) || 0);
    const taxes = Number($('.price-item.tax-item .amount')?.textContent.replace(/[^0-9.]/g,'') || 0);
    const total = base + addOns.reduce((s,n)=>s+n,0) + taxes;
    totalLine && (totalLine.textContent = `$${total.toLocaleString()}`);
    
  
  }

  // Events
  tourSelect?.addEventListener('change', e => pickTour(e.target.value));
  [adults, children, depart].forEach(ctrl => {
    ctrl?.addEventListener('change', () => {
      const current = tourSelect?.value;
      if (current) pickTour(current);
    });
  });

  // Entry point: only prefill if URL has a valid slug
  if (slug && TOUR_CATALOG[slug]) pickTour(slug);
  else clearTour();
})();

// ---------- Destination Details Loader ----------
const DEST_CATALOG = {
  'bagan': {
    title: 'Bagan, Myanmar',
    tagline: 'Temples on an endless plain',
    region: 'Mandalay Region',
    hero: 'assets/img/travel/destination/destination-2.jpeg',
    overview: `A vast plain with 2,000+ ancient temples. Sunrise balloons,
               e-bikes through dusty lanes, and gold that looks illegal at dawn.`,
  },
  'inle-lake': {
    title: 'Inle Lake, Myanmar',
    tagline: 'Floating gardens and leg-rowers',
    region: 'Shan State',
    hero: 'assets/img/travel/destination/destination-4.jpeg',
    overview: `Stilt villages, craft workshops, mirror-still water, and the famous fishermen.`,
  },
  'ngapali-beach': {
    title: 'Ngapali Beach, Myanmar',
    tagline: 'Palm-lined coast and quiet coves',
    region: 'Rakhine State',
    hero: 'assets/img/travel/destination/destination-6.jpeg',
    overview: `Seafood, sunsets, and a medically necessary amount of relaxation.`,
  },
  'shwedagon': {
    title: 'Shwedagon Pagoda, Myanmar',
    tagline: 'The country’s most sacred stupa',
    region: 'Yangon',
    hero: 'assets/img/travel/destination/destination-8.jpeg',
    overview: `A golden hilltop complex that glows at dusk and hums with devotion.`,
  },
   'hpa-an': {
    title: 'Hpa-An, Myanmar',
    tagline: 'Karst peaks, caves, and rice fields',
    region: 'Kayin State',
    hero: 'assets/img/travel/destination/destination-10.jpeg',
    overview: 'A tranquil town surrounded by dramatic limestone cliffs, sacred caves, and lush rice fields.',
    gallery: ['assets/img/travel/destination/destination-10.jpeg']
  },
  'myauk-u': {
    title: 'Myauk U, Myanmar',
    tagline: 'Misty temples and ancient ruins',
    region: 'Rakhine State',
    hero: 'assets/img/travel/destination/destination-12.jpeg',
    overview: 'A hidden archaeological gem with misty temples and ancient ruins, less crowded than Bagan.',
    gallery: ['assets/img/travel/destination/destination-12.jpeg']
  },
  'pyin-oo-lwin': {
    title: 'Pyin Oo Lwin, Myanmar',
    tagline: 'Cool hills and gardens',
    region: 'Mandalay Region',
    hero: 'assets/img/travel/destination/destination-14.jpeg',
    overview: 'A colonial-era hill town with botanical gardens, waterfalls, and strawberry farms.',
    gallery: ['assets/img/travel/destination/destination-14.jpeg']
  },
  'mount-popa': {
    title: 'Mount Popa, Myanmar',
    tagline: 'Volcanic peak and nat shrines',
    region: 'Mandalay Region',
    hero: 'assets/img/travel/destination/destination-16.jpeg',
    overview: 'A sacred volcanic peak crowned with monasteries and panoramic views near Bagan.',
    gallery: ['assets/img/travel/destination/destination-16.jpeg']
  },
  'golden-rock': {
    title: 'Golden Rock, Myanmar',
    tagline: 'Gravity-defying pilgrimage',
    region: 'Mon State',
    hero: 'assets/img/travel/destination/destination-18.jpeg',
    overview: 'A golden boulder perched on a cliff, one of Myanmar’s most revered pilgrimage sites.',
    gallery: ['assets/img/travel/destination/destination-18.jpeg']
  },
  'mandalay': {
    title: 'Mandalay, Myanmar',
    tagline: 'Cultural heart of Myanmar',
    region: 'Mandalay Region',
    hero: 'assets/img/travel/destination/destination-20.jpeg',
    overview: 'Royal palaces, monasteries, and sunset views at U Bein Bridge.',
    gallery: ['assets/img/travel/destination/destination-20.jpeg']
  }
};

(function initDestinationDetails() {
  if (!document.body.classList.contains('destination-details-page')) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('dest');

  // Elements we’ll update
  const heroImg = document.querySelector('.destination-hero .hero-image img');
  const heroTitle = document.querySelector('.destination-hero .hero-content h1');
  const heroTag = document.querySelector('.destination-hero .hero-content .hero-tagline');
  const pageTitle = document.querySelector('.page-title h1');
  const crumbCurrent = document.querySelector('.breadcrumbs .current');
  const overviewH2 = document.querySelector('.destination-overview h2');
  const overviewP  = document.querySelector('.destination-overview p');

  function render(t) {
    // hero
    if (heroImg) heroImg.src = t.hero;
    if (heroTitle) heroTitle.textContent = t.title;
    if (heroTag) heroTag.textContent = t.tagline;

    // title + breadcrumbs
    if (pageTitle) pageTitle.textContent = 'Destination: ' + t.title;
    if (crumbCurrent) crumbCurrent.textContent = t.title;

    // overview
    if (overviewH2) overviewH2.textContent = 'Discover ' + t.title.split(',')[0];
    if (overviewP)  overviewP.textContent  = t.overview;
  }

  if (slug && DEST_CATALOG[slug]) {
    render(DEST_CATALOG[slug]);
  } else {
    // No slug or unknown slug: go back to the grid, or show a neutral state
    // location.href = 'destinations.html';
    // Or neutralize the Santorini filler:
    if (heroTitle) heroTitle.textContent = 'Choose a Destination';
    if (heroTag) heroTag.textContent = '';
  }
})();
