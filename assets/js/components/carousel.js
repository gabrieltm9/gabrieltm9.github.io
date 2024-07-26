class Carousel {
  constructor(element) {
      this.carousel = element.querySelector('.carousel');
      this.header = element.querySelector('.carousel-header');
      this.bubblesContainer = element.querySelector('.carousel-bubbles');
      this.categoryName = element.querySelector('.carousel-category-name');
      this.cardCount = element.querySelector('.carousel-card-count');
      this.cardYear = element.querySelector('.carousel-card-year');
      this.items = [];
      this.filteredItems = [];
      this.currentIndex = 0;
      this.currentCategory = "All";
      this.categories = ["All", "GameDev", "Software", "Business", "Production"];
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.currentTranslateX = 0;
      this.currentTranslateY = 0;
      this.prevTranslateX = 0;
      this.prevTranslateY = 0;
      this.animationID = 0;
      this.horizontalSwipe = false;
      this.swipeDirection = 0; // 1 for right, -1 for left
      this.init();
  }

  init() {
      this.addEventListeners();
      this.createBubbles();
      this.fetchProjects(this.currentCategory);
  }

  addEventListeners() {
      this.carousel.addEventListener('touchstart', this.touchStart.bind(this));
      this.carousel.addEventListener('touchend', this.touchEnd.bind(this));
      this.carousel.addEventListener('touchmove', this.touchMove.bind(this));
      this.carousel.addEventListener('mousedown', this.touchStart.bind(this));
      this.carousel.addEventListener('mouseup', this.touchEnd.bind(this));
      this.carousel.addEventListener('mousemove', this.touchMove.bind(this));
      this.carousel.addEventListener('mouseleave', this.touchEnd.bind(this));
      window.addEventListener('resize', this.checkMobileView.bind(this));
      this.checkMobileView();
  }

  updateHeader() {
      if (this.filteredItems.length > 0) {
          const activeItem = this.filteredItems[this.currentIndex];
          const activeItemName = activeItem.querySelector('img').alt;
          this.header.textContent = activeItemName;
      } else {
          this.header.textContent = '';
      }
  }

  updateCardCount() {
      if (this.filteredItems.length > 0) {
          this.cardCount.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
      } else {
          this.cardCount.textContent = '';
      }
  }

  updateCardYear() {
      if (this.filteredItems.length > 0) {
          const activeItem = this.filteredItems[this.currentIndex];
          const year = activeItem.dataset.year;
          this.cardYear.textContent = year;
      } else {
          this.cardYear.textContent = '';
      }
  }

  createBubbles() {
      this.bubblesContainer.innerHTML = '';
      this.bubbles = this.categories.map((category, index) => {
          const bubble = document.createElement('div');
          bubble.classList.add('carousel-bubble');
          if (category === this.currentCategory) {
              bubble.classList.add('active');
          }
          bubble.addEventListener('click', () => {
              this.currentCategory = category;
              this.currentIndex = 0;
              this.filterItems(this.currentCategory);
              this.createCarousel();
              this.updateCategoryName();
              this.updateBubbles();
              this.updateCardCount();
              this.updateCardYear();
          });
          this.bubblesContainer.appendChild(bubble);
          return bubble;
      });
  }

  updateBubbles() {
      this.bubbles.forEach((bubble, index) => {
          bubble.classList.toggle('active', this.categories[index] === this.currentCategory);
      });
  }

  updateCategoryName() {
      this.categoryName.textContent = this.currentCategory;
  }

  touchStart(event) {
      this.isDragging = true;
      this.horizontalSwipe = false;
      this.startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      this.startY = event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
      this.carousel.style.transition = 'none';
      if (event.type.includes('mouse')) {
          event.preventDefault(); // Prevent text selection
      }
      this.animationID = requestAnimationFrame(this.animation.bind(this));
  }

  touchEnd() {
      cancelAnimationFrame(this.animationID);
      this.isDragging = false;
      const movedByX = this.currentTranslateX - this.prevTranslateX;
      const movedByY = this.currentTranslateY - this.prevTranslateY;

      if (Math.abs(movedByX) > Math.abs(movedByY)) {
          // Horizontal swipe
          this.horizontalSwipe = true;
          if (movedByX < -50) {
              this.swipeDirection = -1;
              this.changeCategory(1); // Swipe left
          } else if (movedByX > 50) {
              this.swipeDirection = 1;
              this.changeCategory(-1); // Swipe right
          }
      } else {
          // Vertical swipe
          if (movedByY < -50) {
              this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
          } else if (movedByY > 50) {
              this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
          }
          this.setPositionByIndex();
      }

      this.setPositionByIndex();
  }

  touchMove(event) {
      if (this.isDragging) {
          const currentPositionX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
          const currentPositionY = event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
          const movedX = currentPositionX - this.startX;
          const movedY = currentPositionY - this.startY;
          if (Math.abs(movedX) > Math.abs(movedY)) {
              this.currentTranslateX = this.prevTranslateX + movedX;
              this.carousel.style.transform = `translateX(${this.currentTranslateX}px)`;
          } else {
              this.currentTranslateY = this.prevTranslateY + movedY;
              this.animateCard(this.currentTranslateY - this.prevTranslateY);
          }
          event.preventDefault(); // Prevent scrolling the page
      }
  }

  animation() {
      if (this.isDragging) requestAnimationFrame(this.animation.bind(this));
  }

  animateCard(offsetY) {
      const activeItem = this.filteredItems[this.currentIndex];
      const nextItem = this.filteredItems[(this.currentIndex + 1) % this.filteredItems.length];
      const nextItem2 = this.filteredItems[(this.currentIndex + 2) % this.filteredItems.length];
      const nextItem3 = this.filteredItems[(this.currentIndex + 3) % this.filteredItems.length];
      const nextItem4 = this.filteredItems[(this.currentIndex + 4) % this.filteredItems.length];

      if (offsetY < 0) {
          // Swiping up
          activeItem.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(1)`;
          nextItem.style.transform = `translate(-50%, calc(-50% + ${offsetY + this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem2.style.transform = `translate(-50%, calc(-50% + ${offsetY + 2 * this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem3.style.transform = `translate(-50%, calc(-50% + ${offsetY + 3 * this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem4.style.transform = `translate(-50%, calc(-50% + ${offsetY + 4 * this.carousel.clientHeight}px)) scale(0.85)`;
      } else {
          // Swiping down
          activeItem.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(1)`;
          nextItem.style.transform = `translate(-50%, calc(-50% + ${offsetY - this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem2.style.transform = `translate(-50%, calc(-50% + ${offsetY - 2 * this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem3.style.transform = `translate(-50%, calc(-50% + ${offsetY - 3 * this.carousel.clientHeight}px)) scale(0.85)`;
          nextItem4.style.transform = `translate(-50%, calc(-50% + ${offsetY - 4 * this.carousel.clientHeight}px)) scale(0.85)`;
      }
  }

  setPositionByIndex() {
      const activeItem = this.filteredItems[this.currentIndex];
      const nextItem = this.filteredItems[(this.currentIndex + 1) % this.filteredItems.length];
      const nextItem2 = this.filteredItems[(this.currentIndex + 2) % this.filteredItems.length];
      const nextItem3 = this.filteredItems[(this.currentIndex + 3) % this.filteredItems.length];
      const nextItem4 = this.filteredItems[(this.currentIndex + 4) % this.filteredItems.length];

      this.currentTranslateY = 0;
      this.prevTranslateY = 0;
      this.currentTranslateX = 0;
      this.prevTranslateX = 0;

      if (this.horizontalSwipe) {
          if (this.swipeDirection === -1) {
              // Swipe left, reset position off-screen to the right
              this.carousel.style.transition = 'none';
              this.carousel.style.transform = 'translateX(100%)';
          } else {
              // Swipe right, reset position off-screen to the left
              this.carousel.style.transition = 'none';
              this.carousel.style.transform = 'translateX(-100%)';
          }
          setTimeout(() => {
              this.carousel.style.transition = 'transform 0.5s ease';
              this.carousel.style.transform = 'translateX(0)';
              this.horizontalSwipe = false;
          }, 50);
      }

      activeItem.style.transition = 'transform 0.5s ease';
      nextItem.style.transition = 'transform 0.5s ease';
      nextItem2.style.transition = 'transform 0.5s ease';
      nextItem3.style.transition = 'transform 0.5s ease';
      nextItem4.style.transition = 'transform 0.5s ease';

      activeItem.style.transform = 'translate(-50%, -50%) scale(1)';
      nextItem.style.transform = `translate(-50%, calc(-50% + 18px)) scale(0.9)`;
      nextItem2.style.transform = `translate(-50%, calc(-50% + 27px)) scale(0.85)`;
      nextItem3.style.transform = `translate(-50%, calc(-50% + 36px)) scale(0.8)`;
      nextItem4.style.transform = `translate(-50%, calc(-50% + 47px)) scale(0.75)`;

      this.updateHeader();
      this.updateCardCount();
      this.updateCardYear();
      this.updateCarousel();
  }

  changeCategory(direction) {
      const currentCategoryIndex = this.categories.indexOf(this.currentCategory);
      const newCategoryIndex = (currentCategoryIndex + direction + this.categories.length) % this.categories.length;
      this.currentCategory = this.categories[newCategoryIndex];
      this.currentIndex = 0;
      this.filterItems(this.currentCategory);
      this.createCarousel();
      this.updateCategoryName();
      this.updateBubbles();
      this.updateCardCount();
      this.updateCardYear();
  }

  checkMobileView() {
      if (window.innerWidth <= 767) {
          document.getElementById('portfolio').style.display = 'none';
          this.carousel.parentElement.style.display = 'block';
      } else {
          document.getElementById('portfolio').style.display = 'block';
          this.carousel.parentElement.style.display = 'none';
      }
  }

  updateCarousel() {
      this.filteredItems.forEach((item, index) => {
          item.classList.remove('active', 'previous', 'next', 'next-2', 'next-3', 'next-4');
          if (index === this.currentIndex) {
              item.classList.add('active');
          } else if (index === (this.currentIndex + 1) % this.filteredItems.length) {
              item.classList.add('next');
          } else if (index === (this.currentIndex + 2) % this.filteredItems.length) {
              item.classList.add('next-2');
          } else if (index === (this.currentIndex + 3) % this.filteredItems.length) {
              item.classList.add('next-3');
          } else if (index === (this.currentIndex + 4) % this.filteredItems.length) {
              item.classList.add('next-4');
          }
      });
      this.updateBubbles();
      this.updateCardCount();
      this.updateCardYear();
  }

  fetchProjects(category) {
      fetch('/portfolio.json')
          .then(response => response.json())
          .then(projects => {
              this.items = projects.map(project => {
                  const carouselItem = document.createElement('div');
                  carouselItem.classList.add('carousel-item');
                  carouselItem.dataset.category = project.category;
                  carouselItem.dataset.year = project.year; // Add year data attribute
                  carouselItem.innerHTML = `<a href="${project.link}"><img src="${project.img}" alt="${project.title}"></a>`;
                  return carouselItem;
              });
              this.items.sort((a, b) => b.dataset.year - a.dataset.year); // Sort by year, most recent first
              this.filterItems(category);
              this.createCarousel();
              this.updateHeader();
              this.updateCategoryName();
              this.updateBubbles();
              this.updateCardCount();
              this.updateCardYear();
          })
          .catch(error => console.error('Error loading project data:', error));
  }

  filterItems(category) {
      this.filteredItems = this.items.filter(item => category === "All" || item.dataset.category === category);
  }

  createCarousel() {
      this.carousel.innerHTML = '';
      this.filteredItems.forEach(item => this.carousel.appendChild(item));
      this.setPositionByIndex();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('.carousel-container');
  new Carousel(carouselElement);
});
