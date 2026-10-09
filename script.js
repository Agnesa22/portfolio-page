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
// ANIMATIONS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // Elements that should appear while scrolling.
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


    // Settings for the Intersection Observer.
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
    };


    // Observe when elements become visible.
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Stop observing after the animation
                    // has been triggered once.
                    observer.unobserve(entry.target);
                }

            });

        },
        observerOptions
    );


    // Add reveal class and observe elements.
    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    // =========================
    // SKILL DELAYS
    // =========================

    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((element, index) => {

        element.style.transitionDelay = `${index * 0.12}s`;

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


    // Hero elements appear one after another.
    heroElements.forEach((element, index) => {

        element.classList.add("hero-reveal");

        setTimeout(() => {

            element.classList.add("hero-visible");

        }, 180 + index * 180);

    });

});
