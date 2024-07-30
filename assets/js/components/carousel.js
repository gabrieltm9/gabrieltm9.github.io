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
        this.verticalSwipe = false;
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
        window.addEventListener('resize', () => {
            if (window.innerHeight !== this.prevHeight) {
            this.checkMobileView();
            this.prevHeight = window.innerHeight;
            }
        });
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
        this.verticalSwipe = false;
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
  
        if (this.horizontalSwipe) {
            if (movedByX < -50) {
                this.swipeDirection = -1;
                this.changeCategory(1); // Swipe left
            } else if (movedByX > 50) {
                this.swipeDirection = 1;
                this.changeCategory(-1); // Swipe right
            }
        } else if (this.verticalSwipe) {
            if (movedByY < -50) {
                this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
            } else if (movedByY > 50) {
                this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
            }
        }
        this.setPositionByIndex();
    }
  
    touchMove(event) {
        if (this.isDragging) {
            const currentPositionX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            const currentPositionY = event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
            const movedX = currentPositionX - this.startX;
            const movedY = currentPositionY - this.startY;
  
            if (!this.horizontalSwipe && !this.verticalSwipe) {
                if (Math.abs(movedX) > Math.abs(movedY)) {
                    this.horizontalSwipe = true;
                } else {
                    this.verticalSwipe = true;
                }
            }
  
            if (this.horizontalSwipe) {
                this.currentTranslateX = this.prevTranslateX + movedX;
                this.carousel.style.transform = `translateX(${this.currentTranslateX}px)`;
            } else if (this.verticalSwipe) {
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
        const items = [this.filteredItems[this.currentIndex],
                       this.filteredItems[(this.currentIndex + 1) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 2) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 3) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 4) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 5) % this.filteredItems.length]];
  
        const scales = [1.05, 0.85, 0.85, 0.85, 0.85, 0.85];
        const offsets = [offsetY, offsetY + this.carousel.clientHeight / 5,
                         offsetY + 2 * this.carousel.clientHeight / 5,
                         offsetY + 3 * this.carousel.clientHeight / 5,
                         offsetY + 4 * this.carousel.clientHeight / 5,
                         offsetY + 5 * this.carousel.clientHeight / 5];
  
        items.forEach((item, index) => {
            item.style.transform = `translate(-50%, calc(-50% + ${offsets[index]}px)) scale(${scales[index]})`;
        });
    }
  
    setPositionByIndex() {
        const items = [this.filteredItems[this.currentIndex],
                       this.filteredItems[(this.currentIndex + 1) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 2) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 3) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 4) % this.filteredItems.length],
                       this.filteredItems[(this.currentIndex + 5) % this.filteredItems.length]];
  
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
  
        const transforms = ['translate(-50%, -50%) scale(1)',
                            'translate(-50%, calc(-50% - 13px)) scale(0.9)',
                            'translate(-50%, calc(-50% - 22px)) scale(0.85)',
                            'translate(-50%, calc(-50% - 31px)) scale(0.8)',
                            'translate(-50%, calc(-50% - 40px)) scale(0.75)',
                            'translate(-50%, calc(-50% - 49px)) scale(0.7)'];
  
        items.forEach((item, index) => {
            item.style.transition = 'transform 0.5s ease';
            item.style.transform = transforms[index];
        });
  
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
            document.getElementById('portfolio').classList.add("hidden");
            this.carousel.parentElement.classList.remove("hidden");
            document.getElementById('toggleButton').classList.remove("hidden");
        } else {
            document.getElementById('portfolio').classList.remove("hidden");
            this.carousel.parentElement.classList.add("hidden");
            document.getElementById('toggleButton').classList.add("hidden");
        }
    }
  
    updateCarousel() {
        this.filteredItems.forEach((item, index) => {
            item.classList.remove('active', 'previous', 'next', 'next-2', 'next-3', 'next-4', 'next-5');
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
            } else if (index === (this.currentIndex + 5) % this.filteredItems.length) {
                item.classList.add('next-5');
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
  
  document.getElementById('toggleButton').addEventListener('click', function() {
      const carousel = document.getElementById('carousel');
      const section = document.getElementById('portfolio');
    
      if (carousel.classList.contains('hidden')) { //Activate carousel
        carousel.classList.remove('hidden');
        section.classList.add('hidden');
        document.getElementById('toggleButton').querySelector('img').src = 'https://img.icons8.com/?size=100&id=49602&format=png&color=000000';
      } else { //Activate section
        carousel.classList.add('hidden'); 
        section.classList.remove('hidden');
        document.getElementById('toggleButton').querySelector('img').src = 'https://img.icons8.com/?size=100&id=n6zGx09EP6Hc&format=png&color=000000';
        document.getElementById('portfolio-container').style.opacity = 1;
  
      const categoryButtons = document.getElementsByClassName('category-button');
      for (let i = 0; i < categoryButtons.length; i++) {
          categoryButtons[i].style.opacity = 1;
      }
  
      const sr = ScrollReveal({
          origin: 'top',
          distance: '60px',
          duration: 2000,
          delay: 200,
      });
      sr.reveal('.category-button', { 
          delay: 500, 
          interval: 60, 
          origin: 'bottom', 
          distance: '20px', 
          beforeReveal: (el) => el.classList.remove('sr-hidden'),
      });
      }
  }); 