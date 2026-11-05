// =========================
// CONFIGURATION
// =========================

const GITHUB_USERNAME =
    "Agnesa22";

const CONTACT_EMAIL =
    "pajaziti.agnesa@hotmail.com";

const GITHUB_API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
    "?sort=updated&direction=desc&per_page=6&type=owner";

const GITHUB_CACHE_KEY =
    "agnesa-github-repositories";

const GITHUB_CACHE_TIME =
    30 * 60 * 1000;


// =========================
// PROJECT DATA
// =========================

const projects = [

    {
        id: 1,

        title:
            "CasaSierra",

        category:
            "Web Development",

        description:
            "Konzeption und Entwicklung einer modernen Website für ein Immobilien- und Treuhandunternehmen.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        challenge:
            "Die Dienstleistungen rund um Immobilienbuchhaltung und Treuhand sollten klar, professionell und verständlich auf einer modernen Website präsentiert werden.",

        solution:
            "Die Website wurde mit einer klaren Informationsarchitektur, einer ruhigen visuellen Gestaltung und einer benutzerfreundlichen Navigation konzipiert und umgesetzt.",

        result:
            "Entstanden ist eine moderne Unternehmenswebsite, welche Leistungen strukturiert präsentiert und gleichzeitig eine professionelle digitale Präsenz schafft.",

        type:
            "browser",

        image:
            "casasierra-preview.png",

        imageAlt:
            "Vorschau der CasaSierra Website",

        browserAddress:
            "casasierra.ch"
    },


    {
        id: 2,

        title:
            "FairFlat",

        category:
            "UX/UI Design",

        description:
            "Entwicklung eines UX/UI-Konzepts für eine App zur Organisation des Zusammenlebens in Wohngemeinschaften.",

        technologies: [
            "Figma",
            "UX Research",
            "Prototyping"
        ],

        challenge:
            "Typische Aufgaben im WG-Alltag sollten einfacher organisiert und für alle Bewohnerinnen und Bewohner transparent dargestellt werden.",

        solution:
            "Auf Basis von UX-Überlegungen wurde eine übersichtliche App-Struktur entwickelt und anschliessend als interaktiver Prototyp in Figma gestaltet.",

        result:
            "Der entstandene Prototyp zeigt eine intuitive und visuell klare Lösung für die gemeinsame Organisation des WG-Alltags.",

        type:
            "phone",

        image:
            "fairflat-preview.png",

        imageAlt:
            "Vorschau des FairFlat Projekts"
    }

];


// =========================
// SCROLL POSITION
// =========================

if (
    "scrollRestoration"
    in
    history
) {

    history.scrollRestoration =
        "manual";

}


window.addEventListener(
    "load",
    () => {

        if (
            !window.location.hash
        ) {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });

        }

    }
);


// =========================
// PROJECT BUTTON
// =========================

function createProjectButton(
    project,
    direction
) {

    const directionClass =
        direction === "left"
            ? "project-modal-trigger-left"
            : "project-modal-trigger-right";


    const arrow =
        direction === "left"
            ? `
                <path d="M19 19 L5 5"></path>
                <path d="M14 5 H5 V14"></path>
            `
            : `
                <path d="M5 19 L19 5"></path>
                <path d="M10 5 H19 V14"></path>
            `;


    return `
        <button
            type="button"
            class="project-modal-trigger ${directionClass}"
            data-project-id="${project.id}"
            aria-label="Details zu ${project.title} anzeigen"
        >
            <svg
                class="arrow-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                ${arrow}
            </svg>
        </button>
    `;

}


// =========================
// PROJECT VISUAL
// =========================

function createProjectVisual(
    project
) {

    if (
        project.type
        ===
        "browser"
    ) {

        return `
            <div
                class="project-visual project-visual-casasierra parallax-element"
                data-parallax-speed="0.05"
            >

                <div class="browser-mockup">

                    <div class="browser-topbar">

                        <div class="browser-controls">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div class="browser-address">
                            ${project.browserAddress}
                        </div>

                    </div>

                    <div class="browser-content">

                        <img
                            src="${project.image}"
                            alt="${project.imageAlt}"
                            class="project-preview-image"
                        >

                    </div>

                </div>

            </div>
        `;

    }


    return `
        <div
            class="project-visual project-visual-fairflat parallax-element"
            data-parallax-speed="0.05"
        >

            <div class="fairflat-device">

                <div class="fairflat-device-speaker"></div>

                <div class="fairflat-device-screen">

                    <img
                        src="${project.image}"
                        alt="${project.imageAlt}"
                        class="fairflat-preview-image"
                    >

                </div>

            </div>

        </div>
    `;

}


// =========================
// PROJECT MARKUP
// =========================

function createProjectMarkup(
    project,
    index
) {

    const isReverse =
        index % 2 !== 0;


    const number =
        String(
            project.id
        ).padStart(
            2,
            "0"
        );


    const technologyText =
        project.technologies.join(
            " · "
        );


    const visual =
        createProjectVisual(
            project
        );


    if (
        !isReverse
    ) {

        return `
            <article class="project-feature reveal">

                ${visual}

                <div class="project-details">

                    <div class="project-meta">

                        <span>
                            ${number}
                        </span>

                        <span>
                            ${project.category}
                        </span>

                    </div>

                    <h3>
                        ${project.title}
                    </h3>

                    <p class="project-description">
                        ${project.description}
                    </p>

                    <div class="project-footer project-footer-casasierra">

                        ${createProjectButton(
                            project,
                            "left"
                        )}

                        <p class="project-tech">
                            ${technologyText}
                        </p>

                    </div>

                </div>

            </article>
        `;

    }


    return `
        <article class="project-feature project-feature-reverse reveal">

            ${visual}

            <div class="project-details">

                <div class="project-meta">

                    <span>
                        ${number}
                    </span>

                    <span>
                        ${project.category}
                    </span>

                </div>

                <h3>
                    ${project.title}
                </h3>

                <p class="project-description">
                    ${project.description}
                </p>

                <div class="project-footer">

                    <p class="project-tech">
                        ${technologyText}
                    </p>

                    ${createProjectButton(
                        project,
                        "right"
                    )}

                </div>

            </div>

        </article>
    `;

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects() {

    const container =
        document.querySelector(
            "#project-showcase"
        );


    if (
        !container
    ) {
        return;
    }


    container.innerHTML =
        projects
            .map(
                (
                    project,
                    index
                ) =>
                    createProjectMarkup(
                        project,
                        index
                    )
            )
            .join("");

}


// =========================
// HERO MOUSE MOVEMENT
// =========================

function initialiseHeroMovement() {

    const hero =
        document.querySelector(
            ".hero"
        );

    const orbOne =
        document.querySelector(
            ".hero-orb-one"
        );

    const grid =
        document.querySelector(
            ".hero-grid-decoration"
        );


    if (
        !hero
        ||
        !orbOne
        ||
        !grid
    ) {
        return;
    }


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        !supportsMouse
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX
                    -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const y =
                (
                    event.clientY
                    -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            orbOne.style.transform =
                `translate(${x * 38}px, ${y * 38}px)`;


            grid.style.transform =
                `translate(${x * -22}px, ${y * -22}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            orbOne.style.transform =
                "";

            grid.style.transform =
                "";

        }
    );

}


// =========================
// PARALLAX
// =========================

function initialiseParallax() {

    const elements =
        document.querySelectorAll(
            ".parallax-element"
        );


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        !window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        reduceMotion
        ||
        touchDevice
    ) {
        return;
    }


    let ticking =
        false;


    function updateParallax() {

        const viewportHeight =
            window.innerHeight;


        elements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();


                const speed =
                    Number(
                        element.dataset.parallaxSpeed
                    )
                    ||
                    0.05;


                const elementCenter =
                    rect.top
                    +
                    rect.height / 2;


                const viewportCenter =
                    viewportHeight / 2;


                const distance =
                    viewportCenter
                    -
                    elementCenter;


                const movement =
                    distance
                    *
                    speed;


                element.style.setProperty(
                    "--parallax-y",
                    `${movement}px`
                );

            }
        );


        ticking =
            false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (
                !ticking
            ) {

                requestAnimationFrame(
                    updateParallax
                );


                ticking =
                    true;

            }

        },
        {
            passive:
                true
        }
    );


    updateParallax();

}


// =========================
// PROJECT 3D TILT
// =========================

function initialiseProjectTilt() {

    const projectVisuals =
        document.querySelectorAll(
            ".project-visual"
        );


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !supportsMouse
        ||
        reduceMotion
    ) {
        return;
    }


    projectVisuals.forEach(
        visual => {

            visual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        visual.getBoundingClientRect();


                    const x =
                        (
                            event.clientX
                            -
                            rect.left
                        )
                        /
                        rect.width;


                    const y =
                        (
                            event.clientY
                            -
                            rect.top
                        )
                        /
                        rect.height;


                    const rotateY =
                        (
                            x
                            -
                            0.5
                        )
                        *
                        8;


                    const rotateX =
                        (
                            0.5
                            -
                            y
                        )
                        *
                        8;


                    visual.style.transform =
                        `translateY(var(--parallax-y, 0px)) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    visual.style.transform =
                        "translateY(var(--parallax-y, 0px)) rotateX(0deg) rotateY(0deg)";

                }
            );

        }
    );

}


// =========================
// PROJECT MODAL
// =========================

function initialiseProjectModal() {

    const modal =
        document.querySelector(
            "#project-modal"
        );


    if (
        !modal
    ) {
        return;
    }


    const closeButton =
        modal.querySelector(
            ".project-modal-close"
        );


    let previouslyFocusedElement =
        null;


    function populateModal(
        project
    ) {

        document.querySelector(
            "#modal-project-number"
        ).textContent =
            String(
                project.id
            ).padStart(
                2,
                "0"
            );


        document.querySelector(
            "#modal-project-category"
        ).textContent =
            project.category;


        document.querySelector(
            "#modal-project-title"
        ).textContent =
            project.title;


        document.querySelector(
            "#modal-project-description"
        ).textContent =
            project.description;


        document.querySelector(
            "#modal-project-challenge"
        ).textContent =
            project.challenge;


        document.querySelector(
            "#modal-project-solution"
        ).textContent =
            project.solution;


        document.querySelector(
            "#modal-project-result"
        ).textContent =
            project.result;


        document.querySelector(
            "#modal-project-technologies"
        ).textContent =
            project.technologies.join(
                " · "
            );

    }


    function openModal(
        project
    ) {

        previouslyFocusedElement =
            document.activeElement;


        populateModal(
            project
        );


        modal.classList.add(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );


        setTimeout(
            () => {

                closeButton.focus();

            },
            50
        );

    }


    function closeModal() {

        modal.classList.remove(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        if (
            previouslyFocusedElement
        ) {

            previouslyFocusedElement.focus();

        }

    }


    document.addEventListener(
        "click",
        event => {

            const trigger =
                event.target.closest(
                    ".project-modal-trigger"
                );


            if (
                trigger
            ) {

                const projectId =
                    Number(
                        trigger.dataset.projectId
                    );


                const project =
                    projects.find(
                        item =>
                            item.id
                            ===
                            projectId
                    );


                if (
                    project
                ) {

                    openModal(
                        project
                    );

                }

            }


            if (
                event.target.closest(
                    "[data-modal-close]"
                )
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key
                ===
                "Escape"
                &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeModal();

            }


            if (
                event.key
                ===
                "Tab"
                &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                const focusableElements =
                    modal.querySelectorAll(
                        "button, a, input, textarea, [tabindex]:not([tabindex='-1'])"
                    );


                const firstElement =
                    focusableElements[0];


                const lastElement =
                    focusableElements[
                        focusableElements.length - 1
                    ];


                if (
                    event.shiftKey
                    &&
                    document.activeElement
                    ===
                    firstElement
                ) {

                    event.preventDefault();

                    lastElement.focus();

                } else if (
                    !event.shiftKey
                    &&
                    document.activeElement
                    ===
                    lastElement
                ) {

                    event.preventDefault();

                    firstElement.focus();

                }

            }

        }
    );

}


// =========================
// GITHUB CACHE
// =========================

function getCachedRepositories() {

    const cachedData =
        localStorage.getItem(
            GITHUB_CACHE_KEY
        );


    if (
        !cachedData
    ) {
        return null;
    }


    try {

        const parsedData =
            JSON.parse(
                cachedData
            );


        if (
            Date.now()
            -
            parsedData.timestamp
            >
            GITHUB_CACHE_TIME
        ) {

            localStorage.removeItem(
                GITHUB_CACHE_KEY
            );


            return null;

        }


        return parsedData.repositories;

    } catch (
        error
    ) {

        localStorage.removeItem(
            GITHUB_CACHE_KEY
        );


        return null;

    }

}


function cacheRepositories(
    repositories
) {

    localStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify({
            timestamp:
                Date.now(),

            repositories:
                repositories
        })
    );

}


// =========================
// GITHUB API
// =========================

async function fetchRepositories() {

    const cachedRepositories =
        getCachedRepositories();


    if (
        cachedRepositories
    ) {

        return {
            repositories:
                cachedRepositories,

            source:
                "cache"
        };

    }


    const response =
        await fetch(
            GITHUB_API_URL,
            {
                headers: {
                    Accept:
                        "application/vnd.github+json"
                }
            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            `GitHub API Error: ${response.status}`
        );

    }


    const repositories =
        await response.json();


    cacheRepositories(
        repositories
    );


    return {
        repositories:
            repositories,

        source:
            "api"
    };

}


// =========================
// GITHUB RENDERING
// =========================

function formatRepositoryDate(
    dateString
) {

    return new Intl.DateTimeFormat(
        "de-CH",
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    ).format(
        new Date(
            dateString
        )
    );

}


function createRepositoryMarkup(
    repository,
    index
) {

    const number =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    return `
        <a
            href="${repository.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="github-card"
        >

            <div class="github-card-top">

                <span class="github-card-number">
                    ${number}
                </span>

                <span class="github-language">
                    ${repository.language || "Code"}
                </span>

            </div>


            <h3>
                ${repository.name}
            </h3>


            <p class="github-description">
                ${repository.description || "Öffentliches GitHub Repository."}
            </p>


            <div class="github-card-footer">

                <span class="github-updated">
                    Updated ${formatRepositoryDate(
                        repository.updated_at
                    )}
                </span>


                <svg
                    class="arrow-icon github-open"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M5 19 L19 5"></path>
                    <path d="M10 5 H19 V14"></path>
                </svg>

            </div>

        </a>
    `;

}


function renderRepositories(
    repositories
) {

    const container =
        document.querySelector(
            "#github-repositories"
        );


    if (
        !container
    ) {
        return;
    }


    const visibleRepositories =
        repositories
            .filter(
                repository =>
                    !repository.fork
                    &&
                    !repository.archived
            )
            .slice(
                0,
                3
            );


    if (
        visibleRepositories.length
        ===
        0
    ) {

        container.innerHTML =
            `
                <div class="github-error">
                    Aktuell sind keine öffentlichen Repositories verfügbar.
                </div>
            `;


        return;

    }


    container.innerHTML =
        visibleRepositories
            .map(
                (
                    repository,
                    index
                ) =>
                    createRepositoryMarkup(
                        repository,
                        index
                    )
            )
            .join("");

}


async function loadGitHubRepositories() {

    const status =
        document.querySelector(
            "#github-status"
        );


    try {

        const result =
            await fetchRepositories();


        renderRepositories(
            result.repositories
        );


        if (
            status
        ) {

            status.textContent =
                result.source
                ===
                "cache"
                    ? "GitHub Daten aus lokalem Cache geladen"
                    : "GitHub Daten erfolgreich aktualisiert";

        }

    } catch (
        error
    ) {

        console.error(
            error
        );


        if (
            status
        ) {

            status.textContent =
                "GitHub Daten konnten nicht geladen werden";

        }

    }

}


// =========================
// NAVIGATION
// =========================

function initialiseNavigation() {

    const button =
        document.querySelector(
            ".menu-toggle"
        );


    const navigation =
        document.querySelector(
            ".nav-links"
        );


    if (
        !button
        ||
        !navigation
    ) {
        return;
    }


    function closeMenu() {

        button.classList.remove(
            "is-active"
        );


        navigation.classList.remove(
            "is-open"
        );


        button.setAttribute(
            "aria-expanded",
            "false"
        );


        button.setAttribute(
            "aria-label",
            "Navigation öffnen"
        );


        document.body.classList.remove(
            "menu-open"
        );

    }


    button.addEventListener(
        "click",
        () => {

            const open =
                button.classList.toggle(
                    "is-active"
                );


            navigation.classList.toggle(
                "is-open",
                open
            );


            button.setAttribute(
                "aria-expanded",
                String(open)
            );


            button.setAttribute(
                "aria-label",
                open
                    ? "Navigation schliessen"
                    : "Navigation öffnen"
            );


            document.body.classList.toggle(
                "menu-open",
                open
            );

        }
    );


    document.querySelectorAll(
        ".nav-links a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key
                ===
                "Escape"
            ) {

                closeMenu();

            }

        }
    );

}


// =========================
// CONTACT FORM
// =========================

function initialiseContactForm() {

    const form =
        document.querySelector(
            "#contact-form"
        );


    if (
        !form
    ) {
        return;
    }


    const nameInput =
        document.querySelector(
            "#contact-name"
        );


    const emailInput =
        document.querySelector(
            "#contact-email"
        );


    const messageInput =
        document.querySelector(
            "#contact-message"
        );


    const characterCount =
        document.querySelector(
            "#character-count"
        );


    const formStatus =
        document.querySelector(
            "#form-status"
        );


    function showError(
        input,
        errorId,
        message
    ) {

        const errorElement =
            document.querySelector(
                `#${errorId}`
            );


        if (
            errorElement
        ) {

            errorElement.textContent =
                message;

        }


        input
            .closest(
                ".form-group"
            )
            .classList
            .add(
                "has-error"
            );


        input.setAttribute(
            "aria-invalid",
            "true"
        );

    }


    function clearError(
        input,
        errorId
    ) {

        const errorElement =
            document.querySelector(
                `#${errorId}`
            );


        if (
            errorElement
        ) {

            errorElement.textContent =
                "";

        }


        input
            .closest(
                ".form-group"
            )
            .classList
            .remove(
                "has-error"
            );


        input.removeAttribute(
            "aria-invalid"
        );

    }


    function validateName() {

        if (
            nameInput.value
                .trim()
                .length
            <
            2
        ) {

            showError(
                nameInput,
                "name-error",
                "Bitte gib deinen Namen ein."
            );


            return false;

        }


        clearError(
            nameInput,
            "name-error"
        );


        return true;

    }


    function validateEmail() {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                emailInput.value.trim()
            )
        ) {

            showError(
                emailInput,
                "email-error",
                "Bitte gib eine gültige E-Mail-Adresse ein."
            );


            return false;

        }


        clearError(
            emailInput,
            "email-error"
        );


        return true;

    }


    function validateMessage() {

        const message =
            messageInput.value.trim();


        if (
            message.length
            <
            10
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht sollte mindestens 10 Zeichen enthalten."
            );


            return false;

        }


        if (
            message.length
            >
            1000
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht darf maximal 1000 Zeichen enthalten."
            );


            return false;

        }


        clearError(
            messageInput,
            "message-error"
        );


        return true;

    }


    messageInput.addEventListener(
        "input",
        () => {

            characterCount.textContent =
                `${messageInput.value.length} / 1000`;

        }
    );


    nameInput.addEventListener(
        "blur",
        validateName
    );


    emailInput.addEventListener(
        "blur",
        validateEmail
    );


    messageInput.addEventListener(
        "blur",
        validateMessage
    );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nameValid =
                validateName();


            const emailValid =
                validateEmail();


            const messageValid =
                validateMessage();


            if (
                !nameValid
                ||
                !emailValid
                ||
                !messageValid
            ) {

                formStatus.textContent =
                    "Bitte überprüfe die markierten Felder.";


                const firstInvalid =
                    form.querySelector(
                        '[aria-invalid="true"]'
                    );


                if (
                    firstInvalid
                ) {

                    firstInvalid.focus();

                }


                return;

            }


            const name =
                nameInput.value.trim();


            const sender =
                emailInput.value.trim();


            const message =
                messageInput.value.trim();


            const subject =
                encodeURIComponent(
                    `Portfolio Anfrage von ${name}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n` +
                    `E-Mail: ${sender}\n\n` +
                    `Nachricht:\n${message}`
                );


            formStatus.textContent =
                "Alles geprüft – dein E-Mail-Programm wird geöffnet.";


            window.location.href =
                `mailto:${CONTACT_EMAIL}` +
                `?subject=${subject}` +
                `&body=${body}`;

        }
    );

}


// =========================
// REVEAL ANIMATIONS
// =========================

function initialiseRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".section-number, " +
            ".section-heading, " +
            ".bio-layout, " +
            ".skill-item, " +
            ".project-feature, " +
            ".github-intro, " +
            ".contact-header, " +
            ".contact-form, " +
            ".contact-direct"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.15,

                rootMargin:
                    "0px 0px -8% 0px"
            }
        );


    elements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );


            observer.observe(
                element
            );

        }
    );

}


// =========================
// HERO ANIMATION
// =========================

function initialiseHeroAnimation() {

    const elements =
        document.querySelectorAll(
            ".hero-label, " +
            ".hero h1, " +
            ".hero-description, " +
            ".hero-link"
        );


    elements.forEach(
        (
            element,
            index
        ) => {

            element.classList.add(
                "hero-reveal"
            );


            setTimeout(
                () => {

                    element.classList.add(
                        "hero-visible"
                    );

                },
                180
                +
                index
                *
                180
            );

        }
    );

}


// =========================
// START
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProjects();

        initialiseProjectModal();

        initialiseNavigation();

        initialiseContactForm();

        initialiseRevealAnimations();

        initialiseHeroAnimation();

        initialiseHeroMovement();

        initialiseParallax();

        initialiseProjectTilt();

        loadGitHubRepositories();

    }
);
        description:
            "Entwicklung eines UX/UI-Konzepts für eine App zur Organisation des Zusammenlebens in Wohngemeinschaften.",

        technologies: [
            "Figma",
            "UX Research",
            "Prototyping"
        ],

        challenge:
            "Typische Aufgaben im WG-Alltag sollten einfacher organisiert und für alle Bewohnerinnen und Bewohner transparent dargestellt werden.",

        solution:
            "Auf Basis von UX-Überlegungen wurde eine übersichtliche App-Struktur entwickelt und anschliessend als interaktiver Prototyp in Figma gestaltet.",

        result:
            "Der entstandene Prototyp zeigt eine intuitive und visuell klare Lösung für die gemeinsame Organisation des WG-Alltags.",

        type:
            "phone",

        image:
            "fairflat-preview.png",

        imageAlt:
            "Vorschau des FairFlat Projekts"
    }

];


// =========================
// SCROLL POSITION
// =========================

if (
    "scrollRestoration"
    in
    history
) {

    history.scrollRestoration =
        "manual";

}


window.addEventListener(
    "load",
    () => {

        if (
            !window.location.hash
        ) {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });

        }

    }
);


// =========================
// PROJECT ARROW
// =========================

function createProjectButton(
    project,
    direction
) {

    const directionClass =
        direction === "left"
            ? "project-modal-trigger-left"
            : "project-modal-trigger-right";

    const arrow =
        direction === "left"
            ? `
                <path d="M19 19 L5 5"></path>
                <path d="M14 5 H5 V14"></path>
            `
            : `
                <path d="M5 19 L19 5"></path>
                <path d="M10 5 H19 V14"></path>
            `;


    return `
        <button
            type="button"
            class="project-modal-trigger ${directionClass}"
            data-project-id="${project.id}"
            aria-label="Details zu ${project.title} anzeigen"
        >
            <svg
                class="arrow-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                ${arrow}
            </svg>
        </button>
    `;

}


// =========================
// PROJECT VISUAL
// =========================

function createProjectVisual(
    project
) {

    if (
        project.type
        ===
        "browser"
    ) {

        return `
            <div class="project-visual project-visual-casasierra">

                <div class="browser-mockup">

                    <div class="browser-topbar">

                        <div class="browser-controls">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div class="browser-address">
                            ${project.browserAddress}
                        </div>

                    </div>

                    <div class="browser-content">

                        <img
                            src="${project.image}"
                            alt="${project.imageAlt}"
                            class="project-preview-image"
                        >

                    </div>

                </div>

            </div>
        `;

    }


    return `
        <div class="project-visual project-visual-fairflat">

            <div class="fairflat-device">

                <div class="fairflat-device-speaker"></div>

                <div class="fairflat-device-screen">

                    <img
                        src="${project.image}"
                        alt="${project.imageAlt}"
                        class="fairflat-preview-image"
                    >

                </div>

            </div>

        </div>
    `;

}


// =========================
// PROJECT MARKUP
// =========================

function createProjectMarkup(
    project,
    index
) {

    const isReverse =
        index % 2 !== 0;

    const number =
        String(
            project.id
        ).padStart(
            2,
            "0"
        );

    const technologyText =
        project.technologies.join(
            " · "
        );

    const visual =
        createProjectVisual(
            project
        );


    if (
        !isReverse
    ) {

        return `
            <article class="project-feature reveal">

                ${visual}

                <div class="project-details">

                    <div class="project-meta">

                        <span>
                            ${number}
                        </span>

                        <span>
                            ${project.category}
                        </span>

                    </div>

                    <h3>
                        ${project.title}
                    </h3>

                    <p class="project-description">
                        ${project.description}
                    </p>

                    <div class="project-footer project-footer-casasierra">

                        ${createProjectButton(
                            project,
                            "left"
                        )}

                        <p class="project-tech">
                            ${technologyText}
                        </p>

                    </div>

                </div>

            </article>
        `;

    }


    return `
        <article class="project-feature project-feature-reverse reveal">

            ${visual}

            <div class="project-details">

                <div class="project-meta">

                    <span>
                        ${number}
                    </span>

                    <span>
                        ${project.category}
                    </span>

                </div>

                <h3>
                    ${project.title}
                </h3>

                <p class="project-description">
                    ${project.description}
                </p>

                <div class="project-footer">

                    <p class="project-tech">
                        ${technologyText}
                    </p>

                    ${createProjectButton(
                        project,
                        "right"
                    )}

                </div>

            </div>

        </article>
    `;

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects() {

    const container =
        document.querySelector(
            "#project-showcase"
        );


    if (
        !container
    ) {
        return;
    }


    container.innerHTML =
        projects
            .map(
                (
                    project,
                    index
                ) =>
                    createProjectMarkup(
                        project,
                        index
                    )
            )
            .join("");

}


// =========================
// PROJECT MODAL
// =========================

function initialiseProjectModal() {

    const modal =
        document.querySelector(
            "#project-modal"
        );

    if (
        !modal
    ) {
        return;
    }


    const closeButton =
        modal.querySelector(
            ".project-modal-close"
        );

    let previouslyFocusedElement =
        null;


    function populateModal(
        project
    ) {

        document.querySelector(
            "#modal-project-number"
        ).textContent =
            String(
                project.id
            ).padStart(
                2,
                "0"
            );


        document.querySelector(
            "#modal-project-category"
        ).textContent =
            project.category;


        document.querySelector(
            "#modal-project-title"
        ).textContent =
            project.title;


        document.querySelector(
            "#modal-project-description"
        ).textContent =
            project.description;


        document.querySelector(
            "#modal-project-challenge"
        ).textContent =
            project.challenge;


        document.querySelector(
            "#modal-project-solution"
        ).textContent =
            project.solution;


        document.querySelector(
            "#modal-project-result"
        ).textContent =
            project.result;


        document.querySelector(
            "#modal-project-technologies"
        ).textContent =
            project.technologies.join(
                " · "
            );

    }


    function openModal(
        project
    ) {

        previouslyFocusedElement =
            document.activeElement;


        populateModal(
            project
        );


        modal.classList.add(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );


        setTimeout(
            () => {

                closeButton.focus();

            },
            50
        );

    }


    function closeModal() {

        modal.classList.remove(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        if (
            previouslyFocusedElement
        ) {

            previouslyFocusedElement.focus();

        }

    }


    document.addEventListener(
        "click",
        event => {

            const trigger =
                event.target.closest(
                    ".project-modal-trigger"
                );


            if (
                trigger
            ) {

                const projectId =
                    Number(
                        trigger.dataset.projectId
                    );


                const project =
                    projects.find(
                        item =>
                            item.id
                            ===
                            projectId
                    );


                if (
                    project
                ) {

                    openModal(
                        project
                    );

                }

            }


            if (
                event.target.closest(
                    "[data-modal-close]"
                )
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key
                ===
                "Escape"
                &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeModal();

            }


            if (
                event.key
                ===
                "Tab"
                &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                const focusableElements =
                    modal.querySelectorAll(
                        "button, a, input, textarea, [tabindex]:not([tabindex='-1'])"
                    );


                const firstElement =
                    focusableElements[0];

                const lastElement =
                    focusableElements[
                        focusableElements.length - 1
                    ];


                if (
                    event.shiftKey
                    &&
                    document.activeElement
                    ===
                    firstElement
                ) {

                    event.preventDefault();

                    lastElement.focus();

                } else if (
                    !event.shiftKey
                    &&
                    document.activeElement
                    ===
                    lastElement
                ) {

                    event.preventDefault();

                    firstElement.focus();

                }

            }

        }
    );

}


// =========================
// GITHUB CACHE
// =========================

function getCachedRepositories() {

    const cachedData =
        localStorage.getItem(
            GITHUB_CACHE_KEY
        );


    if (
        !cachedData
    ) {
        return null;
    }


    try {

        const parsedData =
            JSON.parse(
                cachedData
            );


        if (
            Date.now()
            -
            parsedData.timestamp
            >
            GITHUB_CACHE_TIME
        ) {

            localStorage.removeItem(
                GITHUB_CACHE_KEY
            );

            return null;

        }


        return parsedData.repositories;

    } catch (
        error
    ) {

        localStorage.removeItem(
            GITHUB_CACHE_KEY
        );

        return null;

    }

}


function cacheRepositories(
    repositories
) {

    localStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify({
            timestamp:
                Date.now(),

            repositories:
                repositories
        })
    );

}


// =========================
// GITHUB API
// =========================

async function fetchRepositories() {

    const cachedRepositories =
        getCachedRepositories();


    if (
        cachedRepositories
    ) {

        return {
            repositories:
                cachedRepositories,

            source:
                "cache"
        };

    }


    const response =
        await fetch(
            GITHUB_API_URL,
            {
                headers: {
                    Accept:
                        "application/vnd.github+json"
                }
            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            `GitHub API Error: ${response.status}`
        );

    }


    const repositories =
        await response.json();


    cacheRepositories(
        repositories
    );


    return {
        repositories:
            repositories,

        source:
            "api"
    };

}


// =========================
// GITHUB RENDERING
// =========================

function formatRepositoryDate(
    dateString
) {

    return new Intl.DateTimeFormat(
        "de-CH",
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    ).format(
        new Date(
            dateString
        )
    );

}


function createRepositoryMarkup(
    repository,
    index
) {

    const number =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    return `
        <a
            href="${repository.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="github-card"
        >

            <div class="github-card-top">

                <span class="github-card-number">
                    ${number}
                </span>

                <span class="github-language">
                    ${repository.language || "Code"}
                </span>

            </div>


            <h3>
                ${repository.name}
            </h3>


            <p class="github-description">
                ${repository.description || "Öffentliches GitHub Repository."}
            </p>


            <div class="github-card-footer">

                <span class="github-updated">
                    Updated ${formatRepositoryDate(
                        repository.updated_at
                    )}
                </span>


                <svg
                    class="arrow-icon github-open"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M5 19 L19 5"></path>
                    <path d="M10 5 H19 V14"></path>
                </svg>

            </div>

        </a>
    `;

}


function renderRepositories(
    repositories
) {

    const container =
        document.querySelector(
            "#github-repositories"
        );


    const visibleRepositories =
        repositories
            .filter(
                repository =>
                    !repository.fork
                    &&
                    !repository.archived
            )
            .slice(
                0,
                3
            );


    if (
        visibleRepositories.length
        ===
        0
    ) {

        container.innerHTML =
            `
                <div class="github-error">
                    Aktuell sind keine öffentlichen Repositories verfügbar.
                </div>
            `;

        return;

    }


    container.innerHTML =
        visibleRepositories
            .map(
                (
                    repository,
                    index
                ) =>
                    createRepositoryMarkup(
                        repository,
                        index
                    )
            )
            .join("");

}


async function loadGitHubRepositories() {

    const status =
        document.querySelector(
            "#github-status"
        );


    try {

        const result =
            await fetchRepositories();


        renderRepositories(
            result.repositories
        );


        status.textContent =
            result.source
            ===
            "cache"
                ? "GitHub Daten aus lokalem Cache geladen"
                : "GitHub Daten erfolgreich aktualisiert";

    } catch (
        error
    ) {

        console.error(
            error
        );


        status.textContent =
            "GitHub Daten konnten nicht geladen werden";

    }

}


// =========================
// NAVIGATION
// =========================

function initialiseNavigation() {

    const button =
        document.querySelector(
            ".menu-toggle"
        );

    const navigation =
        document.querySelector(
            ".nav-links"
        );


    function closeMenu() {

        button.classList.remove(
            "is-active"
        );

        navigation.classList.remove(
            "is-open"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    button.addEventListener(
        "click",
        () => {

            const open =
                button.classList.toggle(
                    "is-active"
                );


            navigation.classList.toggle(
                "is-open",
                open
            );


            button.setAttribute(
                "aria-expanded",
                String(open)
            );


            document.body.classList.toggle(
                "menu-open",
                open
            );

        }
    );


    document.querySelectorAll(
        ".nav-links a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );

}


// =========================
// CONTACT FORM
// =========================

function initialiseContactForm() {

    const form =
        document.querySelector(
            "#contact-form"
        );

    if (
        !form
    ) {
        return;
    }


    const nameInput =
        document.querySelector(
            "#contact-name"
        );

    const emailInput =
        document.querySelector(
            "#contact-email"
        );

    const messageInput =
        document.querySelector(
            "#contact-message"
        );

    const characterCount =
        document.querySelector(
            "#character-count"
        );

    const formStatus =
        document.querySelector(
            "#form-status"
        );


    function showError(
        input,
        errorId,
        message
    ) {

        document.querySelector(
            `#${errorId}`
        ).textContent =
            message;


        input
            .closest(
                ".form-group"
            )
            .classList
            .add(
                "has-error"
            );

    }


    function clearError(
        input,
        errorId
    ) {

        document.querySelector(
            `#${errorId}`
        ).textContent =
            "";


        input
            .closest(
                ".form-group"
            )
            .classList
            .remove(
                "has-error"
            );

    }


    function validateName() {

        if (
            nameInput.value
                .trim()
                .length
            <
            2
        ) {

            showError(
                nameInput,
                "name-error",
                "Bitte gib deinen Namen ein."
            );

            return false;

        }


        clearError(
            nameInput,
            "name-error"
        );

        return true;

    }


    function validateEmail() {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                emailInput.value.trim()
            )
        ) {

            showError(
                emailInput,
                "email-error",
                "Bitte gib eine gültige E-Mail-Adresse ein."
            );

            return false;

        }


        clearError(
            emailInput,
            "email-error"
        );

        return true;

    }


    function validateMessage() {

        const message =
            messageInput.value.trim();


        if (
            message.length
            <
            10
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht sollte mindestens 10 Zeichen enthalten."
            );

            return false;

        }


        if (
            message.length
            >
            1000
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht darf maximal 1000 Zeichen enthalten."
            );

            return false;

        }


        clearError(
            messageInput,
            "message-error"
        );

        return true;

    }


    messageInput.addEventListener(
        "input",
        () => {

            characterCount.textContent =
                `${messageInput.value.length} / 1000`;

        }
    );


    nameInput.addEventListener(
        "blur",
        validateName
    );


    emailInput.addEventListener(
        "blur",
        validateEmail
    );


    messageInput.addEventListener(
        "blur",
        validateMessage
    );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const valid =
                validateName()
                &&
                validateEmail()
                &&
                validateMessage();


            if (
                !valid
            ) {

                formStatus.textContent =
                    "Bitte überprüfe die markierten Felder.";

                return;

            }


            const name =
                nameInput.value.trim();

            const sender =
                emailInput.value.trim();

            const message =
                messageInput.value.trim();


            const subject =
                encodeURIComponent(
                    `Portfolio Anfrage von ${name}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n` +
                    `E-Mail: ${sender}\n\n` +
                    `Nachricht:\n${message}`
                );


            formStatus.textContent =
                "Alles geprüft – dein E-Mail-Programm wird geöffnet.";


            window.location.href =
                `mailto:${CONTACT_EMAIL}` +
                `?subject=${subject}` +
                `&body=${body}`;

        }
    );

}


// =========================
// REVEAL ANIMATIONS
// =========================

function initialiseRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".section-number, " +
            ".section-heading, " +
            ".bio-layout, " +
            ".skill-item, " +
            ".project-feature, " +
            ".github-intro, " +
            ".contact-header, " +
            ".contact-form, " +
            ".contact-direct"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.15
            }
        );


    elements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

            observer.observe(
                element
            );

        }
    );

}


// =========================
// HERO ANIMATION
// =========================

function initialiseHeroAnimation() {

    const elements =
        document.querySelectorAll(
            ".hero-label, " +
            ".hero h1, " +
            ".hero-description, " +
            ".hero-link"
        );


    elements.forEach(
        (
            element,
            index
        ) => {

            element.classList.add(
                "hero-reveal"
            );


            setTimeout(
                () => {

                    element.classList.add(
                        "hero-visible"
                    );

                },
                180
                +
                index
                *
                180
            );

        }
    );

}


// =========================
// START
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProjects();

        initialiseProjectModal();

        initialiseNavigation();

        initialiseContactForm();

        initialiseRevealAnimations();

        initialiseHeroAnimation();

        loadGitHubRepositories();

    }
);
