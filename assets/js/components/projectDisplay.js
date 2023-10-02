class ProjectDisplay extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var name = this.getAttribute('name') ?? "Project Name";
        var date = this.getAttribute('date') ?? "Month Year - Month Year";;
        var subtitle = this.getAttribute('subtitle') ?? "Category";
        var img = this.getAttribute('img') ?? "/assets/img/gtm9_wide.jpg)";
        var desc = this.getAttribute('desc') ?? "Description";

        this.innerHTML = `
        <div class="proj__div">
        <div style="flex: 1;">
            <h1 class="proj__date">` + date + `<br>
                <span class="proj__title">
                ` + name + `</span><br>
            </h1>
            <h3 class="proj__subtitle">` + subtitle + `</h3>
        </div>
            <div class="proj__img" style="background-image: url(` + img + `">
        </div>
        
        </div>

        <div class="proj__desc">` + desc + `</div>
        </div>

        <div class="proj__social">
            <a href="https://www.linkedin.com/in/gmoncau/" class="proj__social-icon"><i
                    class='bx bxl-linkedin'></i></a>
            <a href="https://github.com/gabrieltm9" class="proj__social-icon"><i class='bx bxl-github'></i></a>
            <a href="https://discordapp.com/users/186163297349795840" class="proj__social-icon"><i
                    class='bx bxl-discord'></i></a>
        </div>`;
    }
}

customElements.define('project-display', ProjectDisplay);