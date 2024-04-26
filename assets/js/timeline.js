document.addEventListener('DOMContentLoaded', function() {
    const stickyTimeline = document.querySelector('.timeline-container.sticky');
    const sectionExpand = document.querySelector('.section.expand');
    
    let isStickyActive = false;
  
    function handleScroll() {
      const stickyTop = stickyTimeline.getBoundingClientRect().top;
      const stickyBottom = stickyTimeline.getBoundingClientRect().bottom;
  
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
  
    window.addEventListener('scroll', handleScroll);
  });
  