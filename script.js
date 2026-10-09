// =========================
// SCROLL POSITION
// =========================

// Prevent the browser from automatically restoring
// an old scroll position when the page is reopened.
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


// =========================
// PAGE LOAD
// =========================

window.addEventListener("load", () => {

    // Only scroll to the top when the URL does not
    // explicitly contain an anchor such as #projects.
    if (!window.location.hash) {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }

});


// =========================
// DOM READY
// =========================

document.addEventListener("DOMContentLoaded", () => {


    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");


    function openMenu() {

        menuToggle.classList.add("is-active");
        navigation.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Navigation schliessen");

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        menuToggle.classList.remove("is-active");
        navigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Navigation öffnen");

        document.body.classList.remove("menu-open");

    }


    function toggleMenu() {

        const menuIsOpen =
            menuToggle.classList.contains("is-active");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", toggleMenu);


        // Close menu after clicking a navigation link.
        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        // Close menu using Escape key.
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Reset menu when returning to desktop size.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    // =========================
    // SCROLL ANIMATIONS
    // =========================

    const revealElements = document.querySelectorAll(
        ".section-number, " +
        ".section-heading, " +
        ".section-content, " +
        ".skill-item, " +
        ".project-item, " +
        ".contact-label, " +
        ".contact-section h2, " +
        ".contact-text, " +
        ".contact-link"
    );


    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
    };


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    // =========================
    // SKILL ANIMATION DELAYS
    // =========================

    const skillItems =
        document.querySelectorAll(".skill-item");

    skillItems.forEach((element, index) => {

        element.style.transitionDelay =
            `${index * 0.12}s`;

    });


    // =========================
    // HERO ANIMATION
    // =========================

    const heroElements = document.querySelectorAll(
        ".hero-top, " +
        ".hero-label, " +
        ".hero h1, " +
        ".hero-description, " +
        ".hero-link"
    );


    heroElements.forEach((element, index) => {

        element.classList.add("hero-reveal");

        setTimeout(() => {

            element.classList.add("hero-visible");

        }, 180 + index * 180);

    });

});
