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

    // Main menu toggle
    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });

        const closeMainMenu = () => {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Close any open submenus
            document.querySelectorAll('.mobile-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        };

        closeMenu.addEventListener('click', closeMainMenu);

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMainMenu);
        }
    }

    // Submenu toggle
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            if (submenu) {
                submenu.classList.add('active');
            }
        });
    });

    // Back button in submenu
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.closest('.mobile-submenu');
            if (submenu) {
                submenu.classList.remove('active');
            }
        });
    });

    // Close button in submenu
    closeSubmenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.closest('.mobile-submenu');
            if (submenu) {
                submenu.classList.remove('active');
            }
            // Close main menu as well
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });
});