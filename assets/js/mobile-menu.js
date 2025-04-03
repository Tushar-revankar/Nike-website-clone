// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    // Submenu elements
    const submenuToggles = document.querySelectorAll('.toggle-submenu');
    const backButtons = document.querySelectorAll('.back-to-menu');
    const closeSubmenuButtons = document.querySelectorAll('.close-submenu');

    // Function to close the mobile menu and reset state
    const closeMainMenu = () => {
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
        
        document.querySelectorAll('.mobile-submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
    };

    // Function to check viewport width and close menu if needed
    const checkViewportWidth = () => {
        if (window.innerWidth > 960) { // 960px is the mobile breakpoint
            closeMainMenu();
        }
    };

    window.addEventListener('resize', checkViewportWidth);

    // Main menu toggle
    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', closeMainMenu);

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMainMenu);
        }
    }

    let activeSubmenus = [];

    // Submenu toggle
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            
            if (submenu) {
                // Add current submenu to the stack
                activeSubmenus.push(submenu);
                
                submenu.classList.add('active');
                
                // Update the header text for the current submenu if needed
                // This is useful for deeper nested submenus
                const parentName = this.textContent.trim().replace(/\s*\n.*$/g, '');
                const headerSpan = submenu.querySelector('.submenu-header .left-side span');
                if (headerSpan) {
                    headerSpan.setAttribute('data-parent', parentName);
                }
            }
        });
    });

    // Back button in submenu
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.closest('.mobile-submenu');
            if (submenu) {
                submenu.classList.remove('active');
                
                // Remove current submenu from stack
                if (activeSubmenus.length > 0) {
                    activeSubmenus.pop();
                }
            }
        });
    });

    // Close button in submenu
    closeSubmenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Close all submenus
            document.querySelectorAll('.mobile-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
            
            // Reset submenu navigation state
            activeSubmenus = [];
            
            // Close main menu as well
            closeMainMenu();
        });
    });
});