const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(n => n.addEventListener('click', () => navMenu.classList.remove('show-menu')));

/* Pix */
const copyBtn = document.getElementById('copyBtn');
if(copyBtn) {
    copyBtn.addEventListener('click', () => {
        const pixInput = document.getElementById('pixInput');
        pixInput.select();
        document.execCommand('copy');
        document.getElementById('copyFeedback').style.display = 'block';
        setTimeout(() => document.getElementById('copyFeedback').style.display = 'none', 2000);
    });
}