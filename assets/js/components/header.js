class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <!--===== HEADER =====-->
        <header class="l-header">
            <nav class="nav bd-grid">
                <div>
                    <a href="/" class="nav__logo">Gabriel Moncau</a>
                </div>

                <div class="nav__menu" id="nav-menu">
                    <div style="display: flex; justify-content: space-between; height: 100%;">
                        <div class="menu__outdiv" id="outdiv"></div>
                        <div class="nav__bg">
                            <ul class="nav__list">
                                <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                                <li class="nav__item"><a href="/#about" class="nav__link">About</a></li>
                                <li class="nav__item"><a href="/#skills" class="nav__link">Skills</a></li>
                                <li class="nav__item"><a href="/portfolio.html" class="nav__link">Portfolio</a></li>
                                <li class="nav__item"><a href="/#contact" class="nav__link">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <i class='bx bx-menu'></i>
                </div>
            </nav>
        </header>`;
    }
}

customElements.define('header-component', Header);