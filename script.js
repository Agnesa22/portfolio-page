document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".section-number, .section-heading, .section-content, .skill-item, .project-item, .contact-label, .contact-section h2, .contact-text, .contact-link"
    );

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        if (element.classList.contains("skill-item")) {
            element.style.transitionDelay = `${index * 0.04}s`;
        }

        revealObserver.observe(element);
    });

    const heroElements = document.querySelectorAll(
        ".hero-top, .hero-label, .hero h1, .hero-description, .hero-link"
    );

    heroElements.forEach((element, index) => {
        element.classList.add("hero-reveal");

        setTimeout(() => {
            element.classList.add("hero-visible");
        }, 180 + index * 180);
    });
});
