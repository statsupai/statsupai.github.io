// --------------------------- JS: Utility Functions --------------------------- 
function safeText(value) {
return value || '<span class="no-content">—</span>';
}

// --------------------------- JS: Scroll Spy ---------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section, .spy-anchor');
  const navLinks = document.querySelectorAll('.floating-sidebar a[href^="#"]');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + window.innerHeight * 3/4;

    // --------------------------- JS: Highlight Active Section ---------------------------
    sections.forEach(section => {
        if (
        scrollPos >= section.offsetTop
        ) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.floating-sidebar a[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add('active');
        }
    });
    // --------------------------- JS: Back to Top Button ---------------------------
    const backToTop = document.getElementById('back-to-top');
    if (scrollPos > 500) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
  });
}




// --------------------------- JS: Back to Parent Functionality ---------------------------
function goBackToParent() {
const parentURL = '../../article_list_ai.html';

const win = window.open(parentURL, 'aiListTab');
win.focus();
}
