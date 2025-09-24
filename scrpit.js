 
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.querySelector('.carousel');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const pagination = document.getElementById('pagination');
            const carouselItems = document.querySelectorAll('.carousel-item');
            
            let currentSlide = 0;
            const totalSlides = carouselItems.length;
            let autoPlayInterval = null;
            
            // Generate pagination dots
            function createPagination() {
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'pagination-dot';
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    if (i === 0) dot.classList.add('active');
                    dot.dataset.index = i;
                    dot.addEventListener('click', () => goToSlide(i));
                    pagination.appendChild(dot);
                }
            }
            
            // Navigate to a specific slide
            function goToSlide(n) {
                currentSlide = n;
                updateCarousel();
            }
            
            // Navigate to next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }
            
            // Navigate to previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }
            
            // Update carousel position and active dot
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update active dot
                document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Auto-play functionality
            function startAutoPlay() {
                stopAutoPlay();
                autoPlayInterval = setInterval(nextSlide, 3000);
            }
            
            function stopAutoPlay() {
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                }
            }
            
            // Event listeners
            prevBtn.addEventListener('click', function() {
                prevSlide();
                stopAutoPlay();
            });
            
            nextBtn.addEventListener('click', function() {
                nextSlide();
                stopAutoPlay();
            });
            
            // Initialize pagination
            createPagination();
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    stopAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    stopAutoPlay();
                }
            });
            
            // Swipe support for touch devices
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            });
            
            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide(); // Swipe left
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide(); // Swipe right
                }
            }
            
            // Start auto-play if enabled
            startAutoPlay();
            
            // Pause auto-play on hover
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', function() {
                startAutoPlay();
            });
        });
    