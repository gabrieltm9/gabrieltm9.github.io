class PortfolioShowcase extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var title = this.getAttribute('title') ?? "Title";
        var subtitle = this.getAttribute('subtitle') ?? "Subtitle";
        var date = this.getAttribute('date') ?? "2024";
        var img = this.getAttribute('img') ?? "/assets/img/Work1.jpg";
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

customElements.define('portfolio-showcase', PortfolioShowcase);

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-button');
    const container = document.getElementById('portfolio-container');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');
        fetchProjects(category);
      });
    });
  
    function fetchProjects(category) {
      fetch('/portfolio.json')
        .then(response => response.json())
        .then(projects => {
          // If "All" is selected, don't filter the projects
          const filteredProjects = category === "All" ? projects : projects.filter(project => project.category === category);

          filteredProjects.sort((a, b) => new Date(b.year) - new Date(a.year));
  
          // Clear existing projects
          container.innerHTML = '';
  
          // Add filtered projects to the container
          filteredProjects.forEach(project => {
            const projectElement = document.createElement('portfolio-showcase');
            projectElement.setAttribute('title', project.title);
            projectElement.setAttribute('subtitle', project.subtitle);
            projectElement.setAttribute('img', project.img);
            projectElement.setAttribute('link', project.link);
            projectElement.setAttribute('date', project.year); 

            
            projectElement.classList.add('show'); // Start transition to show the element
  
            container.appendChild(projectElement);
          });
        })
        .catch(error => console.error('Error loading project data:', error));
    }
  
    // Initially load all projects
    fetchProjects('All');
  });
  