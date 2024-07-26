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

document.addEventListener('DOMContentLoaded', function() {
    /*===== Nav Section Buttons =====*/
    const navLinks = document.querySelectorAll('a.nav__link');

    function scrollToSection(event) {
        event.preventDefault(); // Prevent default anchor behavior

        let targetId = this.getAttribute('href'); // Get the target section ID from the href attribute
        
        //Set browser url to the curernt url + targetId
        window.history.pushState(null, null, window.location.href.split('#')[0] + targetId);

        if (window.innerWidth < 768 && targetId === '#portfolio') {
            targetId = '#portfolio-title';
        }
        const targetSection = document.querySelector(targetId); // Select the target section

        if (targetSection) {
            const sectionTop = targetSection.offsetTop; // Get the top position of the target section
            window.scrollTo({
                top: sectionTop ,
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

    var assigned = false
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100;
        sectionId = current.getAttribute('id')
        element = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if (element == null)
            return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            element.classList.add('active')
            
            assigned = true
            document.querySelector('.nav__menu a[href*=timeline]').classList.remove('active') // If section found, remove timeline active
        } else {
            element.classList.remove('active')
        }
    })

    if (!assigned) { // If no section is found, set the timeline as active
        document.querySelector('.nav__menu a[href*=timeline]').classList.add('active')
    }
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data', { 
    beforeReveal: (el) => el.classList.remove('sr-hidden'),
});
sr.reveal('.home__img', { 
    delay: 300, 
    beforeReveal: (el) => el.classList.remove('sr-hidden') 
});
sr.reveal('.home__social-icon', { 
    delay: 200, 
    beforeReveal: (el) => el.classList.remove('sr-hidden') 
});

sr.reveal('.about', { 
    delay: 400, 
    beforeReveal: (el) => el.classList.remove('sr-hidden'),
});

sr.reveal('.category-button', { 
    delay: 500, 
    interval: 60, 
    origin: 'bottom', 
    distance: '20px', 
    beforeReveal: (el) => el.classList.remove('sr-hidden') 
});

sr.reveal('.work__container, .expand-count', { 
    beforeReveal: (el) => el.classList.remove('sr-hidden'),
});
