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

var hiddenCount = 0;
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.category-button');
  const container = document.getElementById('portfolio-container');
  const expandButton = document.getElementById('expand-button');
  const expandCount = document.getElementById('expand-count');

  let isExpanded = false;

  expandButton.addEventListener('click', function () {
    if (isExpanded) {
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      // Scroll to the top of the portfolio container with an offset of 100px
      window.scrollBy({ top: containerTop + 410 - window.scrollY, behavior: 'smooth' });

      // Delay the collapsing to ensure smooth scrolling
      setTimeout(() => {
        isExpanded = !isExpanded;
        toggleProjectsDisplay();
        expandButton.textContent = isExpanded ? 'Show Less' : 'Expand';
        expandCount.textContent = isExpanded ? '' : "+" + (hiddenCount) + " more...";
      }, 500); // Adjust the delay to match the scroll duration
    } else {
      isExpanded = !isExpanded;
      toggleProjectsDisplay();
      expandButton.textContent = isExpanded ? 'Show Less' : 'Expand';
      expandCount.textContent = isExpanded ? '' : "+" + (hiddenCount) + " more...";
    }
  });

  const unexpandedCount = 12;
  function fetchProjects(category) {
    fetch('/portfolio.json')
      .then(response => response.json())
      .then(projects => {
        const filteredProjects = category === "All" ? projects : projects.filter(project => project.category === category);
        filteredProjects.sort((a, b) => new Date(b.year) - new Date(a.year));
        container.innerHTML = '';
        filteredProjects.forEach((project, index) => {
          const projectElement = document.createElement('portfolio-showcase');
          projectElement.setAttribute('title', project.title);
          projectElement.setAttribute('subtitle', project.subtitle);
          projectElement.setAttribute('img', project.img);
          projectElement.setAttribute('link', project.link);
          projectElement.setAttribute('date', project.year);
          if (index >= unexpandedCount) {
            projectElement.classList.add('portfolio-hidden');
          }
          container.appendChild(projectElement);
        });

        // Update the expand count text
        hiddenCount = filteredProjects.length - unexpandedCount;
        if(hiddenCount > 0) {
          expandCount.textContent = "+" + (hiddenCount) + " more...";
        } else {
         
          expandCount.textContent = "";
        }
        toggleProjectsDisplay();
      })
      .then(() => removeAllLoadHidden()) // Remove all load-hidden classes after loading projects
      .catch(error => console.error('Error loading project data:', error));
  }

  function toggleProjectsDisplay() {
    const projects = container.querySelectorAll('.portfolio-hidden');
    projects.forEach(project => {
      project.classList.toggle('portfolio-expanded', isExpanded);
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-category');
      window.history.pushState(null, null, `?category=${category}`);
      fetchProjects(category);
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    fetchProjects(category);
    const button = document.querySelector(`[data-category="${category}"]`);
    button.classList.add('active');
  } else {
    fetchProjects('All');
    const button = document.querySelector(`[data-category="All"]`);
    button.classList.add('active');
  }
});

/*===== Remove all load-hidden classes =====*/
function removeAllLoadHidden() {
  const hiddenElements = document.querySelectorAll('.load-hidden');
  hiddenElements.forEach(element => {
    element.classList.remove('load-hidden');
  });
}