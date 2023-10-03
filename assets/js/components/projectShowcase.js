class ProjectShowcase extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var title = this.getAttribute('title') ?? "Title";
        var subtitle = this.getAttribute('subtitle') ?? "Subtitle";
        var img = this.getAttribute('img') ?? "/assets/img/placeholder.jpg";
        var link = this.getAttribute('link') ?? "/";

        this.innerHTML = `
        <a href="` + link + `" class="work__img">
            <img src="` + img + `" alt="">
            <div class="work__middle">
                <div class="work__middletitle">` + title + `</div>
                <div class="work__middletext">` + subtitle + `</div>
            </div>
        </a>`;
    }
}

customElements.define('project-showcase', ProjectShowcase);