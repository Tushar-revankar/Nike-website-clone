// Global variables to track scroll position and timer
let lastScrollTop = 0;
let scrollTimer = null;
let isMobileView = window.innerWidth <= 960;

// Update mobile view status on resize
window.addEventListener('resize', function() {
    isMobileView = window.innerWidth <= 960;
    // Reinitialize scroll containers on resize
    initializeAllScrollContainers();
});

// Header scroll behavior management
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header-top');
    const headerMain = document.querySelector('.header-main-section');
    const dropdownContent = document.querySelector('.dropdown-content');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }

    // Prevent excessive scroll calculations by setting a minimum threshold
    if (Math.abs(scrollDelta) < 5) {
        return;
    }

    // Mobile view has different behavior
    if (isMobileView) {
        if (scrollDelta > 0 && scrollTop > 60) {
            // Scrolling down - hide header
            header.classList.add('header--hidden');
            header.classList.remove('header--compact');
        } else {
            // Scrolling up or at top - show header
            header.classList.remove('header--hidden');
        }
    } else {
        // Desktop behavior
        // Handle scrolling down behavior
        if (scrollDelta > 0) {
            // Scrolling down
            if (scrollTop > 200) {
                header.classList.add('header--hidden');
                header.classList.remove('header--compact');
                header.classList.remove('header-scrolled');
            } else if (scrollTop > headerTop.offsetHeight) {
                header.classList.add('header--compact');
                header.classList.add('header-scrolled');
                if (dropdownContent && dropdownContent.style.display === 'block') {
                    dropdownContent.style.top = '60px';
                }
            }
        } else {
            // Scrolling up
            header.classList.remove('header--hidden');
            
            if (scrollTop > headerTop.offsetHeight) {
                header.classList.add('header--compact');
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header--compact');
                header.classList.remove('header-scrolled');
                if (dropdownContent && dropdownContent.style.display === 'block') {
                    dropdownContent.style.top = '100%';
                }
            }
        }
    }

    // Reset header states when scrolled to top
    scrollTimer = setTimeout(() => {
        if (scrollTop <= 0) {
            header.classList.remove('header--hidden', 'header--compact', 'header-scrolled');
        }
    }, 150);

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Image Carousel/Scroll Container Implementation 

function initializeScrollContainer(sectionNum) {
    const imageContainer = document.getElementById(`imageScrollContainers${sectionNum}`);
    const leftArrow = document.getElementById(`leftArrows${sectionNum}`);
    const rightArrow = document.getElementById(`rightArrows${sectionNum}`);

    if (!imageContainer || !leftArrow || !rightArrow) return;

    function calculateScrollAmount() {
        const containerWidth = imageContainer.clientWidth;
        const itemWidth = imageContainer.children[0]?.offsetWidth || 0;
        const gap = 12; 

        // For smaller screens, scroll one item at a time
        if (window.innerWidth <= 600) {
            return itemWidth + gap;
        }
        
        // For larger screens, try to scroll multiple items while keeping them aligned
        const itemsPerView = Math.floor(containerWidth / (itemWidth + gap));
        return (itemWidth + gap) * Math.max(1, Math.floor(itemsPerView / 2));
    }

    function updateArrows() {
        const maxScrollLeft = imageContainer.scrollWidth - imageContainer.clientWidth;

        // At the start
        if (imageContainer.scrollLeft <= 0) {
            leftArrow.style.backgroundColor = '#cdcdcd';
            leftArrow.style.color = '#000';
            rightArrow.style.backgroundColor = '#000';
            rightArrow.style.color = '#fff';
        } 
        // At the end
        else if (imageContainer.scrollLeft >= maxScrollLeft - 1) {
            rightArrow.style.backgroundColor = '#cdcdcd';
            rightArrow.style.color = '#000';
            leftArrow.style.backgroundColor = '#000';
            leftArrow.style.color = '#fff';
        } 
        // In the middle
        else {
            leftArrow.style.backgroundColor = '#e7e7e7';
            leftArrow.style.color = '#000';
            rightArrow.style.backgroundColor = '#e7e7e7';
            rightArrow.style.color = '#000';
        }
    }

    function handleScroll() {
        requestAnimationFrame(updateArrows);
    }

    function scrollLeft() {
        const scrollAmount = calculateScrollAmount();
        imageContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }

    function scrollRight() {
        const scrollAmount = calculateScrollAmount();
        imageContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Remove existing event listeners if any
    leftArrow.removeEventListener('click', scrollLeft);
    rightArrow.removeEventListener('click', scrollRight);
    imageContainer.removeEventListener('scroll', handleScroll);

    // Add new event listeners
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);
    imageContainer.addEventListener('scroll', handleScroll);

    updateArrows();

    let touchStartX = 0;
    let touchEndX = 0;

    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                scrollRight();
            } else {
                scrollLeft();
            }
        }
    }, { passive: true });
}

function initializeAllScrollContainers() {
    // Initialize for all sections
    [2, 3, 4].forEach(sectionNum => {
        initializeScrollContainer(sectionNum);
    });
}

document.addEventListener('DOMContentLoaded', initializeAllScrollContainers);