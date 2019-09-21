console.log('\'Allo \'Allo!');

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

//Used IIFE to enable show and hide menu
(function () {
    const btnToggle = document.getElementById('togglebtn');
    const btncloseMenu = document.getElementById('closeMenu');
    const overlay = document.querySelector('div.overlay');
    const body = document.body;

    //This for screenreaders and helping those impaired
    const setAriaHidden = (val) =>{
        overlay.setAttribute('aria-hidden', val);
    }

    //Toggle Menu 
    const toogleMenuBtn = () =>{
        // Toggle Button
        if (btnToggle) {
            btnToggle.addEventListener('click', function() {
                overlay.style.width = '100%';
                overlay.scrollTop = 0;
                body.classList.add('noScroll');
                setAriaHidden('false');
            });
        }

        if (btncloseMenu) {
            btncloseMenu.addEventListener('click', function() {
                overlay.style.width = '0%';
                body.classList.remove('noScroll');
                setAriaHidden('true');
            });
        }
    }

    toogleMenuBtn();
})()