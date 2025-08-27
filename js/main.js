// ===== FUNCIONALIDADES PRINCIPAIS =====

document.addEventListener("DOMContentLoaded", function () {
  // Animações de entrada
  initScrollAnimations();
});

// ===== ANIMAÇÕES DE ENTRADA =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animateElements = document.querySelectorAll(
    ".feature, .header__content"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Debounce para otimizar performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para otimizar scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== DETECÇÃO DE DISPOSITIVO =====
function isMobile() {
  return window.innerWidth < 768;
}

function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 992;
}

function isDesktop() {
  return window.innerWidth >= 992;
}

// ===== MANIPULAÇÃO DE IMAGENS =====
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== ACESSIBILIDADE =====
function initAccessibility() {
  // Adicionar suporte a navegação por teclado
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Adicionar skip links para acessibilidade
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Pular para o conteúdo principal";
  skipLink.className = "skip-link sr-only";
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== PERFORMANCE =====
function optimizePerformance() {
  // Usar requestAnimationFrame para animações suaves
  const smoothScroll = throttle(function () {
    // Código de scroll suave aqui
  }, 16); // ~60fps

  // Lazy loading para imagens
  if ("IntersectionObserver" in window) {
    lazyLoadImages();
  }

  // Preload de recursos críticos
  const criticalResources = ["css/styles.css", "js/main.js"];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = resource.endsWith(".css") ? "style" : "script";
    document.head.appendChild(link);
  });
}

// ===== INICIALIZAÇÃO FINAL =====
window.addEventListener("load", function () {
  // Inicializar funcionalidades que dependem de todos os recursos carregados
  initAccessibility();
  optimizePerformance();

  // Adicionar classe para indicar que o JavaScript está funcionando
  document.documentElement.classList.add("js-enabled");

  console.log("🎮 Clone Discord carregado com sucesso!");
});
