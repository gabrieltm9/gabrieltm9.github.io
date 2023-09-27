const menuItems = document.querySelectorAll("#menu-list li a");
var fadeSpeed = 120 //ms lower is faster

menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        // Remove the "active" class from all items
        menuItems.forEach((menuItem) => {
            menuItem.animate({
                backgroundColor: "transparent"
            }, fadeSpeed);
            setTimeout(function () {
                menuItem.classList.remove("active");
            }, fadeSpeed * 0.85);
        });

        //Color row background in HSL space (easier to manipulate fading)
        event.target.animate({
            backgroundColor: "#4473ebe6"
        }, fadeSpeed);
        setTimeout(function () {
            // Add the "active" class to the clicked item
            event.target.classList.add("active")
        }, fadeSpeed * 0.85);
    });
});

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

    var index = 0;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY < sectionTop && index == 0) {
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active')
        } else if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active')
            oneActive = true;
        } else {
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('active')
        }

        index++;
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

sr.reveal('.section-title', {});
sr.reveal('.work__container', {});