// --- Copiar Chave Pix ---
const copyBtn = document.getElementById('copyBtn');
const pixInput = document.getElementById('pixInput');
const feedback = document.getElementById('copyFeedback');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        pixInput.select();
        pixInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(pixInput.value).then(() => {
            feedback.style.display = 'inline';
            setTimeout(() => { feedback.style.display = 'none'; }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar', err);
            alert('Copie manualmente a chave Pix.');
        });
    });
}

const CONFIG = {
    // EDITÁVEL: Número do WhatsApp (apenas números, com DDI)
    whatsappNumber: '5562982295909',

    // EDITÁVEL: Mensagem padrão do WhatsApp
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta jurídica.',

    // EDITÁVEL: E-mail para onde enviar o formulário (se integrado com backend)
    contactEmail: 'adatosrealconquista2@gmail.com',

    // EDITÁVEL: Tempo de animação ao scroll (em milissegundos)
    scrollAnimationDuration: 600,

    // EDITÁVEL: Offset do scroll (pixels do topo)
    scrollOffset: 80
};


const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Abrir menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
}

// Fechar menu mobile
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });
}


const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});


function activeLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', activeLink);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


function scrollHeader() {
    const header = document.getElementById('header');

    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);


const scrollTopButton = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 400) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', showScrollTop);

if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Fechar outros itens (opcional - remova para permitir múltiplos abertos)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle do item atual
        item.classList.toggle('active');
    });
});


function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);

                // Desconectar após animar (animação única)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animações ao carregar a página
document.addEventListener('DOMContentLoaded', animateOnScroll);


function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();


function trackEvent(category, action, label) {
    // EDITÁVEL: Integre com Google Analytics, Meta Pixel, etc.
    console.log('Evento rastreado:', { category, action, label });

    // Exemplo com Google Analytics (GA4)
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    */
}

// Rastrear cliques no WhatsApp
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        trackEvent('Contato', 'Clique', 'WhatsApp Flutuante');
    });
}


// Rastrear cliques em áreas de atuação
const servicoCards = document.querySelectorAll('.servico__card');
servicoCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('.servico__title').textContent;
        trackEvent('Serviços', 'Clique', serviceName);
    });
});

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


// Aplicar debounce nas funções de scroll
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedShowScrollTop = debounce(showScrollTop, 10);
const debouncedActiveLink = debounce(activeLink, 10);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedShowScrollTop);
window.addEventListener('scroll', debouncedActiveLink);


console.log('%c AD Atos Real Conquista 2 ', 'background: #1a3a52; color: #d4af37; font-size: 20px; padding: 10px;');
console.log('%c Desenvolvido por Trinity Digital | 2026 ', 'background: #d4af37; color: #1a3a52; font-size: 12px; padding: 5px;');


document.addEventListener('DOMContentLoaded', () => {
    console.log('Site carregado com sucesso!');

    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');

    // EDITÁVEL: Adicione aqui outras inicializações personalizadas
});


document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }

    // ENTER ou ESPAÇO no FAQ
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('faq__question')) {
        e.preventDefault();
        e.target.click();
    }
});


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Modo escuro detectado no sistema');
    // EDITÁVEL: Adicione lógica para modo escuro se desejar
}

