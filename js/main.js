// ==============================
// NORDICWATT - Main JavaScript
// ==============================

// ----- Hamburger Menu -----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ----- Product Tab Filter -----
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card[data-category]');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    productCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ----- Modal -----
const modalOverlay = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');

function openModal(productData) {
  if (!modalOverlay) return;

  document.getElementById('modalTitle').textContent = productData.title;
  document.getElementById('modalImage').src = productData.image;
  document.getElementById('modalImage').alt = productData.title;

  const tbody = document.getElementById('modalSpecs');
  tbody.innerHTML = productData.specs.map(([k, v]) => `
    <tr>
      <td>${k}</td>
      <td>${v}</td>
    </tr>
  `).join('');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Attach to all "View Specs" buttons
document.querySelectorAll('[data-product]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.product;
    const data = PRODUCTS[id];
    if (data) openModal(data);
  });
});

// ----- Contact Form -----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      showToast('✓ Message sent! We\'ll get back to you soon.');
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1200);
  });
}

// ----- Toast -----
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ----- Smooth scroll for anchor links -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ----- Active nav highlight -----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ==============================
// PRODUCT DATA
// ==============================
const PRODUCTS = {
  'W-12-100': {
    title: 'W-12-100 | 12.8V 100Ah LiFePO4 Battery',
    image: 'images/100-5.jpg',
    specs: [
      ['Model', 'W-12-100'],
      ['Nominal Capacity', '100Ah / 1280Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '260 × 170 × 214 mm'],
      ['Weight', '10 kg'],
      ['Continuous Discharge Current', '100A'],
      ['Max Discharge Current', '310A (200–500ms)'],
      ['Continuous Charge Current', '20A'],
      ['Max Charge Current', '50A'],
      ['Cycle Life', '>6000 cycles @ 0.2C, 80% DOD, 25°C'],
      ['Heating', 'No'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-100mini': {
    title: 'W-12-100 Mini | 12.8V 100Ah Compact LiFePO4 Battery',
    image: 'images/100-5-1.jpg',
    specs: [
      ['Model', 'W-12-100 Mini'],
      ['Nominal Capacity', '100Ah / 1280Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '228 × 145 × 212 mm'],
      ['Weight', '9.2 kg'],
      ['Continuous Discharge Current', '100A'],
      ['Max Discharge Current', '305A (160–320ms)'],
      ['Continuous Charge Current', '20A'],
      ['Max Charge Current', '50A'],
      ['Cycle Life', '>6000 cycles @ 0.2C, 80% DOD, 25°C'],
      ['Heating', 'No'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-105H': {
    title: 'W-12-105H | 12.8V 105Ah LiFePO4 Battery with Heater',
    image: 'images/105-2.jpg',
    specs: [
      ['Model', 'W-12-105H'],
      ['Nominal Capacity', '105Ah / 1344Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '355 × 175 × 189 mm'],
      ['Weight', '11.5 kg'],
      ['Continuous Discharge Current', '100A'],
      ['Max Discharge Current', '310A (200–500ms)'],
      ['Continuous Charge Current', '20A'],
      ['Max Charge Current', '50A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'Yes – activates below 0°C during charging'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-150H': {
    title: 'W-12-150H | 12.8V 150Ah LiFePO4 Battery with Heater',
    image: 'images/3.jpg',
    specs: [
      ['Model', 'W-12-150H'],
      ['Nominal Capacity', '150Ah / 1920Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '330 × 172 × 220 mm'],
      ['Weight', '15.8 kg'],
      ['Continuous Discharge Current', '150A'],
      ['Max Discharge Current', '660±100A (200–500ms)'],
      ['Continuous Charge Current', '30A'],
      ['Max Charge Current', '75A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'Yes – activates below 0°C during charging'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-175H': {
    title: 'W-12-175H | 12.8V 175Ah LiFePO4 Battery with Heater',
    image: 'images/1.jpg',
    specs: [
      ['Model', 'W-12-175H'],
      ['Nominal Capacity', '175Ah / 2240Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '355 × 175 × 188 mm'],
      ['Weight', '15 kg'],
      ['Continuous Discharge Current', '200A'],
      ['Max Discharge Current', '610±50A (3s)'],
      ['Continuous Charge Current', '50A'],
      ['Max Charge Current', '90A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'Yes – activates below 0°C during charging'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '-10°C to 55°C'],
      ['Operating Temp (Discharge)', '-25°C to 55°C'],
      ['Storage Temperature', '-20°C to 45°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-200H': {
    title: 'W-12-200H | 12.8V 200Ah LiFePO4 Battery with Heater',
    image: 'images/200-1-scaled.jpg',
    specs: [
      ['Model', 'W-12-200H'],
      ['Nominal Capacity', '200Ah / 2560Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '502 × 186 × 246 mm'],
      ['Weight', '21.3 kg'],
      ['Continuous Discharge Current', '200A'],
      ['Max Discharge Current', '660±100A (200–500ms)'],
      ['Continuous Charge Current', '40A'],
      ['Max Charge Current', '100A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'Yes – activates below 0°C during charging'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-300': {
    title: 'W-12-300 | 12.8V 300Ah LiFePO4 Battery',
    image: 'images/300-1-scaled.jpg',
    specs: [
      ['Model', 'W-12-300'],
      ['Nominal Capacity', '300Ah / 3840Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '522 × 240 × 221 mm'],
      ['Weight', '28.3 kg'],
      ['Continuous Discharge Current', '200A'],
      ['Max Discharge Current', '660±100A (200–500ms)'],
      ['Continuous Charge Current', '60A'],
      ['Max Charge Current', '150A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'No'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '4S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-12-315H': {
    title: 'W-12-315H | 12.8V 315Ah LiFePO4 Battery with Heater',
    image: 'images/1-1.jpg',
    specs: [
      ['Model', 'W-12-315H'],
      ['Nominal Capacity', '315Ah / 4032Wh'],
      ['Rated Voltage', '12.8V'],
      ['Max Voltage', '14.6V'],
      ['Min Voltage', '10V'],
      ['Dimensions (L×W×H)', '355 × 306 × 190 mm'],
      ['Weight', '30 kg'],
      ['Continuous Discharge Current', '200A'],
      ['Max Discharge Current', '660±100A (200–500ms)'],
      ['Continuous Charge Current', '62A'],
      ['Max Charge Current', '155A'],
      ['Cycle Life', '>6000 cycles @ 80% DOD'],
      ['Heating', 'Yes – activates below 0°C during charging'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'Metal'],
      ['Terminal', 'M8'],
      ['Application', 'Parallel only, max 4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-24-100': {
    title: 'W-24-100 | 25.6V 100Ah LiFePO4 Battery',
    image: 'images/200-1-1-scaled.jpg',
    specs: [
      ['Model', 'W-24-100'],
      ['Nominal Capacity', '100Ah / 2560Wh'],
      ['Rated Voltage', '25.6V'],
      ['Max Voltage', '29.2V'],
      ['Min Voltage', '20V'],
      ['Dimensions (L×W×H)', '502 × 186 × 246 mm'],
      ['Weight', '20.85 kg'],
      ['Continuous Discharge Current', '100A'],
      ['Max Discharge Current', '300±60A (50–500ms)'],
      ['Continuous Charge Current', '20A'],
      ['Max Charge Current', '100A'],
      ['Cycle Life', '>4000 cycles @ 80% DOD'],
      ['Heating', 'No'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', '2S4P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'W-36-100': {
    title: 'W-36-100 | 38.4V 100Ah LiFePO4 Battery',
    image: 'images/300-1-1-scaled.jpg',
    specs: [
      ['Model', 'W-36-100'],
      ['Nominal Capacity', '100Ah / 3840Wh'],
      ['Rated Voltage', '38.4V'],
      ['Max Voltage', '43.8V'],
      ['Min Voltage', '30V'],
      ['Dimensions (L×W×H)', '522 × 240 × 221 mm'],
      ['Weight', '31.25 kg'],
      ['Continuous Discharge Current', '100A'],
      ['Max Discharge Current', '300±60A (200–500ms)'],
      ['Continuous Charge Current', '20A'],
      ['Max Charge Current', '100A'],
      ['Cycle Life', '>4000 cycles @ 80% DOD'],
      ['Heating', 'No'],
      ['Bluetooth Monitoring', 'Bluetooth 4.0 (iOS & Android)'],
      ['IP Rating', 'IP67'],
      ['Case Material', 'ABS'],
      ['Terminal', 'M8'],
      ['Application', 'Parallel only, max 2P'],
      ['Operating Temp (Charge)', '0°C to 55°C'],
      ['Operating Temp (Discharge)', '-20°C to 60°C'],
      ['Storage Temperature', '-5°C to 35°C'],
      ['Self-Discharge Rate', '<3% / month'],
      ['Warranty', '6-year manufacturer\'s warranty'],
    ]
  },
  'O-12-1500W': {
    title: 'O-12-1500W | 1500W Off-Grid Pure Sine Wave Inverter',
    image: 'images/1500W正.png',
    specs: [
      ['Model', 'O-12-1500W'],
      ['Rated Power', '1500W'],
      ['Peak Power', '3000W'],
      ['Output Voltage', '230V AC'],
      ['Output Frequency', '50Hz'],
      ['Output Waveform', 'Pure Sine Wave'],
      ['Battery Voltage', '12V DC'],
      ['Input Voltage Range', '10–15V DC'],
      ['Max DC Current', '150A'],
      ['Work Efficiency', '88%–92%'],
      ['No-Load Loss', '≤7W'],
      ['Dimensions (L×W×H)', '340 × 233 × 96 mm'],
      ['Weight', '2.92 kg'],
      ['Battery Type', 'LiFePO4 & Lead-Acid'],
      ['Display', 'LCD'],
      ['Protection', 'Over-voltage, over-current, over-temp, short-circuit'],
    ]
  },
  'O-12-2000W': {
    title: 'O-12-2000W | 2000W Off-Grid Pure Sine Wave Inverter',
    image: 'images/2000正.png',
    specs: [
      ['Model', 'O-12-2000W'],
      ['Rated Power', '2000W'],
      ['Peak Power', '4000W'],
      ['Output Voltage', '230V AC'],
      ['Output Frequency', '50Hz'],
      ['Output Waveform', 'Pure Sine Wave'],
      ['Battery Voltage', '12V DC'],
      ['Input Voltage Range', '10–15V DC'],
      ['Max DC Current', '200A'],
      ['Work Efficiency', '88%–92%'],
      ['No-Load Loss', '≤8.8W'],
      ['Dimensions (L×W×H)', '380 × 233 × 96 mm'],
      ['Weight', '3.4 kg'],
      ['Battery Type', 'LiFePO4 & Lead-Acid'],
      ['Display', 'LCD'],
      ['Protection', 'Over-voltage, over-current, over-temp, short-circuit'],
    ]
  },
  'O-12-2500W': {
    title: 'O-12-2500W | 2500W Off-Grid Pure Sine Wave Inverter',
    image: 'images/2500正.png',
    specs: [
      ['Model', 'O-12-2500W'],
      ['Rated Power', '2500W'],
      ['Peak Power', '5000W'],
      ['Output Voltage', '230V AC'],
      ['Output Frequency', '50Hz'],
      ['Output Waveform', 'Pure Sine Wave'],
      ['Battery Voltage', '12V DC'],
      ['Input Voltage Range', '10–15V DC'],
      ['Max DC Current', '250A'],
      ['Work Efficiency', '88%–92%'],
      ['No-Load Loss', '≤10W'],
      ['Dimensions (L×W×H)', '374 × 268 × 105 mm'],
      ['Weight', '4.5 kg'],
      ['Battery Type', 'LiFePO4 & Lead-Acid'],
      ['Display', 'LCD'],
      ['Protection', 'Over-voltage, over-current, over-temp, short-circuit'],
    ]
  },
  'O-12-3000W': {
    title: 'O-12-3000W | 3000W Off-Grid Pure Sine Wave Inverter',
    image: 'images/3000正.png',
    specs: [
      ['Model', 'O-12-3000W'],
      ['Rated Power', '3000W'],
      ['Peak Power', '6000W'],
      ['Output Voltage', '230V AC'],
      ['Output Frequency', '50Hz'],
      ['Output Waveform', 'Pure Sine Wave'],
      ['Battery Voltage', '12V DC'],
      ['Input Voltage Range', '10–15V DC'],
      ['Max DC Current', '300A'],
      ['Work Efficiency', '88%–92%'],
      ['No-Load Loss', '≤12.9W'],
      ['Dimensions (L×W×H)', '474 × 268 × 105 mm'],
      ['Weight', '5.9 kg'],
      ['Battery Type', 'LiFePO4 & Lead-Acid'],
      ['Display', 'LCD'],
      ['Protection', 'Over-voltage, over-current, over-temp, short-circuit'],
    ]
  },
  'H-12-3000W': {
    title: 'H-12-3000W | 3000W Hybrid Inverter with MPPT Solar Charger',
    image: 'images/混网逆变器.png',
    specs: [
      ['Model', 'H-12-3000W'],
      ['Rated Power', '3000W'],
      ['Peak Power', '6000W (0.3s)'],
      ['Output Voltage', '230V AC'],
      ['Output Frequency', '50Hz / 60Hz'],
      ['Output Waveform', 'Pure Sine Wave'],
      ['Conversion Efficiency', '85%–88%'],
      ['Nominal DC Voltage', '12V'],
      ['DC Input Range', '10–16V DC'],
      ['Max PV Input Power', '4.5kW'],
      ['MPPT Efficiency', '98%–99%'],
      ['Optimal PV Voltage', '240–400V DC'],
      ['PV Input Range', '65–450V DC'],
      ['Max PV Open-Circuit Voltage', '500V DC'],
      ['Default Charge Current (Grid)', '60A (max 150A, adjustable)'],
      ['IP Rating', 'IP20'],
      ['Dimensions (L×W×H)', '454 × 397 × 129 mm'],
      ['Weight', '10.5 kg'],
      ['Operating Temperature', '-10°C to 50°C'],
      ['Display', 'LCD'],
      ['Charging Modes', 'Grid, MPPT Solar, Hybrid'],
    ]
  },
};// ----- Product Carousel -----
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.product-image').forEach(container => {
    const swiper = container.querySelector('.product-swiper');
    if (!swiper) return;
    
    const slides = swiper.querySelectorAll('.swiper-slide');
    const prevBtn = container.querySelector('.swiper-btn.prev');
    const nextBtn = container.querySelector('.swiper-btn.next');
    
    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }
    
    let currentIndex = 0;
    
    // Create dot indicators
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'swiper-dots';
    
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      dot.className = 'swiper-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        updateDots();
      });
      
      dotsContainer.appendChild(dot);
    }
    
    container.appendChild(dotsContainer);
    
    function updateCarousel() {
      swiper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function updateDots() {
      dotsContainer.querySelectorAll('.swiper-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
    
    // Arrow button controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        updateDots();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        updateDots();
      });
    }
  });
});
