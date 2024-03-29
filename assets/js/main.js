const setLang = (languageCode) => {
  document.documentElement.setAttribute('lang', languageCode);
  sessionStorage.setItem('language', languageCode);
};

// (function() {
"use strict";

/**
 * language selection 
 * - url search parameter support
 * - session storage support (for consistency across pages)
 */
const urlParams = new URLSearchParams(window.location.search);

let urlLang = urlParams.get('lang');
let sesLang = sessionStorage.getItem('language');

if (urlLang === "de" || sesLang === "de") {
  document.documentElement.setAttribute('lang', 'de')
  sessionStorage.setItem('language', 'de');
} else {
  document.documentElement.setAttribute('lang', 'en')
  sessionStorage.setItem('language', 'en');
}

/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}

/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}


/**
 * Navbar links active state on scroll
 */
let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
  let position = window.scrollY + 200
  navbarlinks.forEach(navbarlink => {
    if (!navbarlink.hash) return
    let section = select(navbarlink.hash)
    if (!section) return
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navbarlink.classList.add('active')
    } else {
      navbarlink.classList.remove('active')
    }
  })
}
window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  let elementPos = select(el).offsetTop
  window.scrollTo({
    top: elementPos,
    behavior: 'smooth'
  })
}

/**
 * Back to top button
 */
let backtotop = select('.back-to-top')
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active')
    } else {
      backtotop.classList.remove('active')
    }
  }
  window.addEventListener('load', toggleBacktotop)
  onscroll(document, toggleBacktotop)
}

/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
  select('body').classList.toggle('mobile-nav-active')
  this.classList.toggle('bi-list')
  this.classList.toggle('bi-x')
})

/**
 * Scroll with offset on links with a class name .scrollto
 */
on('click', '.scrollto', function (e) {
  if (select(this.hash)) {
    e.preventDefault()

    let body = select('body')
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active')
      let navbarToggle = select('.mobile-nav-toggle')
      navbarToggle.classList.toggle('bi-list')
      navbarToggle.classList.toggle('bi-x')
    }
    scrollto(this.hash)
  }
}, true)

/**
 * Scroll with offset on page load with hash links in the url
 */
window.addEventListener('load', () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash)
    }
  }
});

/**
 * Preloader
 */
let preloader = select('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove()
  });
}

/**
 * Hero type effect
 */
const typed_en = select('.typed_en')
if (typed_en) {
  let typed_strings = typed_en.getAttribute('data-typed-items')
  typed_strings = typed_strings.split(',')
  new Typed('.typed_en', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}
const typed_de = select('.typed_de')
if (typed_de) {
  let typed_strings = typed_de.getAttribute('data-typed-items')
  typed_strings = typed_strings.split(',')
  new Typed('.typed_de', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

/**
 * Porfolio filter
 */

const selectActiveButton = (filterName) => {
  const portfolioFilters = document.querySelectorAll('#portfolio-filters li');
  portfolioFilters.forEach((filter) => {
    if (filter.getAttribute('data-filter') === filterName) {
      filter.classList.add('filter-active');
    } else {
      filter.classList.remove('filter-active');
    }
  });
}

const filterPortfolioItems = (filterName) => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item) => {
    if (item.classList.contains(filterName) || filterName === '*') {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-item-layout');

  const portfolioFilters = document.querySelectorAll('#portfolio-filters li');

  portfolioFilters.forEach((filter) => {
    const activeFilter = filter.getAttribute('data-filter');
    // selector buttons
    filter.addEventListener('click', (e) => {
      selectActiveButton(activeFilter);
      filterPortfolioItems(activeFilter);
    });
  });

  const portfolioItems = document.querySelectorAll('.portfolio-item');

  portfolioItems.forEach((item) => {
    item.addEventListener('transitionend', (e) => {
      if (!item.classList.contains('active')) {
        item.style.display = 'none';
      }
    });
  });
});

/**
 * Initiate portfolio details lightbox 
 */
const portfolioDetailsLightbox = GLightbox({
  selector: '.portfolio-details-lightbox',
  width: '90%',
  height: '90vh',
  openEffect: 'zoom'
});

/**
 * Portfolio details slider
 */
new Swiper('.portfolio-details-swiper', {
  speed: 400,
  loop: true,
  watchOverflow: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

/**
 * Testimonials slider
 */
new Swiper('.testimonials-slider', {
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true
  },
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

/**
 * Animation on scroll
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // } else {
      // entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const headshot = document.querySelector('.headshot');
window.addEventListener('scroll', (e) => {
  const shiftY = Math.min(1.5 * window.scrollY, .775 * headshot.offsetHeight);
  headshot.style.transform = 'translate(0,' + shiftY + 'px)';
});
// })()