class TimelineItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var text = this.getAttribute('text') ?? "Event";
    var date = this.getAttribute('date') ?? "2024";
    var img = this.getAttribute('img') ?? "";
    var link = this.getAttribute('link') ?? "/";

    this.innerHTML = `
    <div class="c-scrolling-line">
      <a href="` + link + `">
        <img src="` + img + `" class="scroll-indicator icon">
      </a>
      <div class="scroll-line"></div>
    </div>
    <div class="c-scrolling-details">
        <h4 class="scroll-item-header">` + date + `</h4>
        <div class="scroll-details">` + text + `</div>
    </div> `;
  }
}

customElements.define('timeline-item', TimelineItem);

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('timeline-parent');
  const section = document.getElementById('timeline');

  fetchTimeline()

  /* ==================== FETCH TIMELINE ==================== */
  function fetchTimeline() {
    fetch('/timeline.json')
      .then(response => response.json())
      .then(timeline => {
        // Clear existing projects
        container.innerHTML = '';

        // Add timeline objects to the container
        timeline.forEach(obj => {
          const timelineElement = document.createElement('timeline-item');

          /* Replace instances of /n in obj.text with <br> */
          obj.text = obj.text.replaceAll('\n', '<br>');

          timelineElement.setAttribute('text', obj.text);
          timelineElement.setAttribute('date', obj.date);
          timelineElement.setAttribute('img', obj.img);
          timelineElement.setAttribute('link', obj.link);

          timelineElement.classList.add('c-scrolling-item'); // Start transition to show the element

          container.appendChild(timelineElement);
        });

        // Set the height of the timeline section
        if (window.innerWidth <= 600) {
          section.classList.remove('expand');
        } else {
          section.style.height = container.offsetWidth + 300 + "px"; // Set the height of the timeline section to the width of the timeline container. 300 = arbitrary value to pad section
        }
      })
      .catch(error => console.error('Error loading timeline data:', error));
  }

  /* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
  const stickyTimeline = document.querySelector('.timeline-container.sticky');
  const sectionExpand = document.querySelector('.section.expand');
  
  let isStickyActive = false;

  function handleScroll() {
    const stickyTop = stickyTimeline.getBoundingClientRect().top;
    const stickyBottom = stickyTimeline.getBoundingClientRect().bottom;

    if (window.innerWidth >= 600) {
      if (stickyTop <= window.innerHeight * 0.305 && stickyBottom > 0) {
        // Activate sticky behavior
        if (!isStickyActive) {
          stickyTimeline.classList.add('fixed');
          isStickyActive = true;
        }
  
        // Horizontal scroll logic
        let scrollDistance = window.scrollY - sectionExpand.offsetTop;
        stickyTimeline.scrollLeft = scrollDistance;
      } else {
        // Deactivate sticky behavior
        if (isStickyActive) {
          stickyTimeline.classList.remove('fixed');
          isStickyActive = false;
        }
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
});
  