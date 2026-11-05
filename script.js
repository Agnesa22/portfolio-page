// =========================
// CONFIGURATION
// =========================

const GITHUB_USERNAME = "Agnesa22";
const CONTACT_EMAIL = "pajaziti.agnesa@hotmail.com";

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

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


window.addEventListener(
    "load",
    () => {
        if (!window.location.hash) {
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


    const arrowPaths =
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
                ${arrowPaths}
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

    if (project.type === "browser") {

        return `
            <div
                class="project-visual project-visual-casasierra"
                data-parallax-speed="0.04"
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
            class="project-visual project-visual-fairflat"
            data-parallax-speed="0.04"
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
        String(project.id).padStart(
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


    if (!isReverse) {

        return `
            <article class="project-feature">

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
        <article class="project-feature project-feature-reverse">

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


    if (!container) {
        return;
    }


    container.innerHTML =
        projects
            .map(
                (project, index) =>
                    createProjectMarkup(
                        project,
                        index
                    )
            )
            .join("");
}


// =========================
// HERO MOVEMENT
// =========================

function initialiseHeroMovement() {

    const hero =
        document.querySelector(
            ".hero"
        );

    const orb =
        document.querySelector(
            ".hero-orb-one"
        );

    const grid =
        document.querySelector(
            ".hero-grid-decoration"
        );


    if (
        !hero ||
        !orb ||
        !grid
    ) {
        return;
    }


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !supportsMouse ||
        reducedMotion
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const mouseX =
                (
                    event.clientX -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const mouseY =
                (
                    event.clientY -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            orb.style.translate =
                `${mouseX * 38}px ${mouseY * 38}px`;


            grid.style.transform =
                `translate(
                    ${mouseX * -22}px,
                    ${mouseY * -22}px
                )`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            orb.style.translate =
                "0 0";


            grid.style.transform =
                "translate(0, 0)";

        }
    );
}


// =========================
// PROJECT 3D TILT
// =========================

function initialiseProjectTilt() {

    const projectVisuals =
        document.querySelectorAll(
            ".project-visual"
        );


    if (!projectVisuals.length) {
        return;
    }


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !supportsMouse ||
        reducedMotion
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


                    const relativeX =
                        (
                            event.clientX -
                            rect.left
                        )
                        /
                        rect.width;


                    const relativeY =
                        (
                            event.clientY -
                            rect.top
                        )
                        /
                        rect.height;


                    const rotateY =
                        (
                            relativeX -
                            0.5
                        )
                        *
                        7;


                    const rotateX =
                        (
                            0.5 -
                            relativeY
                        )
                        *
                        7;


                    visual.style.transform =
                        `
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                        `;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    visual.style.transform =
                        "rotateX(0deg) rotateY(0deg)";

                }
            );

        }
    );
}


// =========================
// BIOGRAPHY PARALLAX
// =========================

function initialiseBiographyParallax() {

    const portrait =
        document.querySelector(
            ".bio-image-frame"
        );


    if (!portrait) {
        return;
    }


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !supportsMouse ||
        reducedMotion
    ) {
        return;
    }


    let ticking =
        false;


    function updatePortrait() {

        const rect =
            portrait.getBoundingClientRect();


        const viewportCenter =
            window.innerHeight / 2;


        const portraitCenter =
            rect.top +
            rect.height / 2;


        let movement =
            (
                viewportCenter -
                portraitCenter
            )
            *
            0.035;


        movement =
            Math.max(
                -22,
                Math.min(
                    22,
                    movement
                )
            );


        portrait.style.transform =
            `translateY(${movement}px)`;


        ticking =
            false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updatePortrait
                );


                ticking =
                    true;
            }

        },
        {
            passive: true
        }
    );


    updatePortrait();
}


// =========================
// PROJECT MODAL
// =========================

function initialiseProjectModal() {

    const modal =
        document.querySelector(
            "#project-modal"
        );


    if (!modal) {
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

        const projectNumber =
            document.querySelector(
                "#modal-project-number"
            );


        const projectCategory =
            document.querySelector(
                "#modal-project-category"
            );


        const projectTitle =
            document.querySelector(
                "#modal-project-title"
            );


        const projectDescription =
            document.querySelector(
                "#modal-project-description"
            );


        const projectChallenge =
            document.querySelector(
                "#modal-project-challenge"
            );


        const projectSolution =
            document.querySelector(
                "#modal-project-solution"
            );


        const projectResult =
            document.querySelector(
                "#modal-project-result"
            );


        const projectTechnologies =
            document.querySelector(
                "#modal-project-technologies"
            );


        if (projectNumber) {

            projectNumber.textContent =
                String(
                    project.id
                ).padStart(
                    2,
                    "0"
                );
        }


        if (projectCategory) {

            projectCategory.textContent =
                project.category;
        }


        if (projectTitle) {

            projectTitle.textContent =
                project.title;
        }


        if (projectDescription) {

            projectDescription.textContent =
                project.description;
        }


        if (projectChallenge) {

            projectChallenge.textContent =
                project.challenge;
        }


        if (projectSolution) {

            projectSolution.textContent =
                project.solution;
        }


        if (projectResult) {

            projectResult.textContent =
                project.result;
        }


        if (projectTechnologies) {

            projectTechnologies.textContent =
                project.technologies.join(
                    " · "
                );
        }

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


        if (closeButton) {

            window.setTimeout(
                () => {
                    closeButton.focus();
                },
                50
            );
        }

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
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === "function"
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


            if (trigger) {

                const projectId =
                    Number(
                        trigger.dataset.projectId
                    );


                const project =
                    projects.find(
                        item =>
                            item.id === projectId
                    );


                if (project) {

                    openModal(
                        project
                    );
                }
            }


            const closeTrigger =
                event.target.closest(
                    "[data-modal-close]"
                );


            if (closeTrigger) {

                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeModal();
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


    if (!cachedData) {
        return null;
    }


    try {

        const parsedData =
            JSON.parse(
                cachedData
            );


        const cacheExpired =
            Date.now() -
            parsedData.timestamp >
            GITHUB_CACHE_TIME;


        if (cacheExpired) {

            localStorage.removeItem(
                GITHUB_CACHE_KEY
            );


            return null;
        }


        return parsedData.repositories;

    } catch (error) {

        localStorage.removeItem(
            GITHUB_CACHE_KEY
        );


        return null;
    }
}


function cacheRepositories(
    repositories
) {

    const data = {
        timestamp:
            Date.now(),

        repositories:
            repositories
    };


    localStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify(data)
    );
}


// =========================
// GITHUB API
// =========================

async function fetchRepositories() {

    const cachedRepositories =
        getCachedRepositories();


    if (cachedRepositories) {

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


    if (!response.ok) {

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
// GITHUB DATE
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


// =========================
// GITHUB CARD
// =========================

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


    const language =
        repository.language ||
        "Code";


    const description =
        repository.description ||
        "Öffentliches GitHub Repository.";


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
                    ${language}
                </span>

            </div>


            <h3>
                ${repository.name}
            </h3>


            <p class="github-description">
                ${description}
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


// =========================
// GITHUB RENDERING
// =========================

function renderRepositories(
    repositories
) {

    const container =
        document.querySelector(
            "#github-repositories"
        );


    if (!container) {
        return;
    }


    const visibleRepositories =
        repositories
            .filter(
                repository =>
                    !repository.fork &&
                    !repository.archived
            )
            .slice(
                0,
                3
            );


    if (
        visibleRepositories.length ===
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


// =========================
// LOAD GITHUB
// =========================

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


        if (status) {

            status.textContent =
                result.source === "cache"
                    ? "GitHub Daten aus lokalem Cache geladen"
                    : "GitHub Daten erfolgreich aktualisiert";
        }

    } catch (error) {

        console.error(
            "GitHub API:",
            error
        );


        if (status) {

            status.textContent =
                "GitHub Daten konnten nicht geladen werden";
        }


        const container =
            document.querySelector(
                "#github-repositories"
            );


        if (container) {

            container.innerHTML =
                `
                    <div class="github-error">
                        Die GitHub-Repositories sind momentan nicht verfügbar.
                    </div>
                `;
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
        !button ||
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
                !navigation.classList.contains(
                    "is-open"
                );


            button.classList.toggle(
                "is-active",
                open
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

            if (event.key === "Escape") {

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


    if (!form) {
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


        const formGroup =
            input.closest(
                ".form-group"
            );


        if (errorElement) {

            errorElement.textContent =
                message;
        }


        if (formGroup) {

            formGroup.classList.add(
                "has-error"
            );
        }


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


        const formGroup =
            input.closest(
                ".form-group"
            );


        if (errorElement) {

            errorElement.textContent =
                "";
        }


        if (formGroup) {

            formGroup.classList.remove(
                "has-error"
            );
        }


        input.removeAttribute(
            "aria-invalid"
        );
    }


    function validateName() {

        if (
            nameInput.value
                .trim()
                .length < 2
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
            message.length < 10
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht sollte mindestens 10 Zeichen enthalten."
            );


            return false;
        }


        if (
            message.length > 1000
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


    messageInput.addEventListener(
        "input",
        () => {

            if (characterCount) {

                characterCount.textContent =
                    `${messageInput.value.length} / 1000`;
            }

        }
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
                !nameValid ||
                !emailValid ||
                !messageValid
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Bitte überprüfe die markierten Felder.";
                }


                const firstInvalid =
                    form.querySelector(
                        '[aria-invalid="true"]'
                    );


                if (firstInvalid) {

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


            if (formStatus) {

                formStatus.textContent =
                    "Alles geprüft – dein E-Mail-Programm wird geöffnet.";
            }


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
            ".github-intro, " +
            ".contact-header, " +
            ".contact-form, " +
            ".contact-direct"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );
            }
        );


        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
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
// HERO INTRO ANIMATION
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


            window.setTimeout(
                () => {

                    element.classList.add(
                        "hero-visible"
                    );

                },
                180 +
                index * 180
            );

        }
    );
}


// =========================
// START APPLICATION
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // First render important dynamic content.
        renderProjects();


        // Core functionality.
        initialiseNavigation();
        initialiseProjectModal();
        initialiseContactForm();


        // API.
        loadGitHubRepositories();


        // Visual effects.
        initialiseRevealAnimations();
        initialiseHeroAnimation();
        initialiseHeroMovement();
        initialiseBiographyParallax();
        initialiseProjectTilt();

    }
);
