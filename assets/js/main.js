/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/* OutDiv Close Menu*/
const outdiv = document.getElementById("outdiv")
outdiv.onclick = function () {
    document.getElementById("nav-menu").classList.toggle('show')
};

/*===== Nav Section Buttons =====*/
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a.nav__link');

    function scrollToSection(event) {
        event.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get the target section ID from the href attribute
        
        //Set browser url to the curernt url + targetId
        window.history.pushState(null, null, window.location.href.split('#')[0] + targetId);

        const targetSection = document.querySelector(targetId); // Select the target section

        if (targetSection) {
            const header = document.querySelector('.timeline-container.sticky'); // Select the sticky header
            const headerHeight = header ? header.offsetHeight : 0; // Get the height of the header, or 0 if not found

            const sectionTop = targetSection.offsetTop; // Get the top position of the target section
            window.scrollTo({
                top: sectionTop - headerHeight - 10, // Subtract header height + a small offset for spacing
                behavior: 'smooth' // Optional: Add smooth scrolling
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection); // Attach the click event
    });
});


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        element = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if (element == null)
            return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            element.classList.add('active')
        } else {
            element.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { delay: 200 });

sr.reveal('.category-button, .category-select', { delay: 1000, interval: 60, origin: 'bottom', distance: '20px'});
sr.reveal('.work__container', { delay: 300});

sr.reveal('.skills__data', { interval: 200 }); 
