class ProjectShowcase extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var title = this.getAttribute('title') ?? "Title";
        var subtitle = this.getAttribute('subtitle') ?? "Subtitle";
        var date = this.getAttribute('date') ?? new Date().getFullYear().toString();
        var img = this.getAttribute('img') ?? "/assets/img/placeholder.jpg";
        var link = this.getAttribute('link') ?? "/";

        this.innerHTML = `
        <div class="work__item">
            <div class="work__itemdiv">
                <a href="` + link + `" class="work__img">
                    <img src="` + img + `" title>
                    <div class="work__middle">
                        <div class="work__middletext">` + subtitle + `</div>
                    </div>
                </a>
                <div
                <div class="work__itemsubdiv">
                    <div class="work__title">
                        ` + title + `
                    </div>
                    <div class="work__date">
                        ` + date + `
                    </div >
                </div >
            </div >
        </div > `;
    }
}

customElements.define('project-showcase', ProjectShowcase);