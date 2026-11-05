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

function createArrowSVG(
    direction
) {

    if (
        direction
        ===
        "left"
    ) {

        return `
            <svg
                class="arrow-icon project-arrow project-arrow-left"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M19 19 L5 5"></path>
                <path d="M14 5 H5 V14"></path>
            </svg>
        `;

    }


    return `
        <svg
            class="arrow-icon project-arrow project-arrow-right"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M5 19 L19 5"></path>
            <path d="M10 5 H19 V14"></path>
        </svg>
    `;

}


// =========================
// PROJECT VISUALS
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


    if (
        project.type
        ===
        "phone"
    ) {

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


    return "";

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

    const articleClass =
        isReverse
            ? "project-feature project-feature-reverse reveal"
            : "project-feature reveal";

    const technologyText =
        project.technologies.join(
            " · "
        );

    const number =
        String(
            project.id
        ).padStart(
            2,
            "0"
        );

    const visual =
        createProjectVisual(
            project
        );

    const leftArrow =
        createArrowSVG(
            "left"
        );

    const rightArrow =
        createArrowSVG(
            "right"
        );


    if (
        !isReverse
    ) {

        return `
            <article class="${articleClass}">

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

                        ${leftArrow}

                        <p class="project-tech">
                            ${technologyText}
                        </p>

                    </div>

                </div>

            </article>
        `;

    }


    return `
        <article class="${articleClass}">

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

                    ${rightArrow}

                </div>

            </div>

        </article>
    `;

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects() {

    const projectShowcase =
        document.querySelector(
            "#project-showcase"
        );


    if (
        !projectShowcase
    ) {
        return;
    }


    projectShowcase.innerHTML =
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


        const cacheIsValid =
            Date.now()
            -
            parsedData.timestamp
            <
            GITHUB_CACHE_TIME;


        if (
            !cacheIsValid
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

    const cacheData = {

        timestamp:
            Date.now(),

        repositories:
            repositories

    };


    localStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify(
            cacheData
        )
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
// DATE FORMATTING
// =========================

function formatRepositoryDate(
    dateString
) {

    const date =
        new Date(
            dateString
        );


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
        date
    );

}


// =========================
// REPOSITORY MARKUP
// =========================

function createRepositoryMarkup(
    repository,
    index
) {

    const description =
        repository.description
        ||
        "Öffentliches GitHub Repository.";

    const language =
        repository.language
        ||
        "Code";

    const updatedDate =
        formatRepositoryDate(
            repository.updated_at
        );

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
                    Updated ${updatedDate}
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
// RENDER REPOSITORIES
// =========================

function renderRepositories(
    repositories
) {

    const repositoryContainer =
        document.querySelector(
            "#github-repositories"
        );


    if (
        !repositoryContainer
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

        repositoryContainer.innerHTML =
            `
                <div class="github-error">
                    Aktuell sind keine öffentlichen Repositories verfügbar.
                </div>
            `;

        return;

    }


    repositoryContainer.innerHTML =
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
// GITHUB STATUS
// =========================

function updateGitHubStatus(
    message
) {

    const statusElement =
        document.querySelector(
            "#github-status"
        );


    if (
        statusElement
    ) {

        statusElement.textContent =
            message;

    }

}


// =========================
// LOAD GITHUB
// =========================

async function loadGitHubRepositories() {

    updateGitHubStatus(
        "Repositories werden geladen..."
    );


    try {

        const result =
            await fetchRepositories();


        renderRepositories(
            result.repositories
        );


        if (
            result.source
            ===
            "cache"
        ) {

            updateGitHubStatus(
                "GitHub Daten aus lokalem Cache geladen"
            );

        } else {

            updateGitHubStatus(
                "GitHub Daten erfolgreich aktualisiert"
            );

        }

    } catch (
        error
    ) {

        console.error(
            "GitHub repositories could not be loaded:",
            error
        );


        updateGitHubStatus(
            "GitHub Daten konnten nicht geladen werden"
        );


        const repositoryContainer =
            document.querySelector(
                "#github-repositories"
            );


        if (
            repositoryContainer
        ) {

            repositoryContainer.innerHTML =
                `
                    <div class="github-error">
                        Die GitHub-Repositories sind momentan nicht verfügbar.
                        Bitte besuche mein GitHub-Profil direkt.
                    </div>
                `;

        }

    }

}


// =========================
// NAVIGATION
// =========================

function initialiseNavigation() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const navigation =
        document.querySelector(
            ".nav-links"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        !menuToggle
        ||
        !navigation
    ) {
        return;
    }


    function openMenu() {

        menuToggle.classList.add(
            "is-active"
        );

        navigation.classList.add(
            "is-open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Navigation schliessen"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenu() {

        menuToggle.classList.remove(
            "is-active"
        );

        navigation.classList.remove(
            "is-open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Navigation öffnen"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    function toggleMenu() {

        if (
            menuToggle.classList.contains(
                "is-active"
            )
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    navigationLinks.forEach(
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
// CONTACT VALIDATION
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


    const MAX_MESSAGE_LENGTH =
        1000;


    function showError(
        input,
        errorElementId,
        message
    ) {

        const errorElement =
            document.querySelector(
                `#${errorElementId}`
            );

        const formGroup =
            input.closest(
                ".form-group"
            );


        if (
            errorElement
        ) {

            errorElement.textContent =
                message;

        }


        if (
            formGroup
        ) {

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
        errorElementId
    ) {

        const errorElement =
            document.querySelector(
                `#${errorElementId}`
            );

        const formGroup =
            input.closest(
                ".form-group"
            );


        if (
            errorElement
        ) {

            errorElement.textContent =
                "";

        }


        if (
            formGroup
        ) {

            formGroup.classList.remove(
                "has-error"
            );

        }


        input.removeAttribute(
            "aria-invalid"
        );

    }


    function validateName() {

        const value =
            nameInput.value.trim();


        if (
            value.length
            < 2
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

        const value =
            emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                value
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

        const value =
            messageInput.value.trim();


        if (
            value.length
            < 10
        ) {

            showError(
                messageInput,
                "message-error",
                "Die Nachricht sollte mindestens 10 Zeichen enthalten."
            );

            return false;

        }


        if (
            value.length
            >
            MAX_MESSAGE_LENGTH
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


    function updateCharacterCount() {

        const length =
            messageInput.value.length;


        characterCount.textContent =
            `${length} / ${MAX_MESSAGE_LENGTH}`;


        if (
            length
            >
            MAX_MESSAGE_LENGTH
        ) {

            characterCount.style.color =
                "#ffb2b2";

        } else {

            characterCount.style.color =
                "";

        }

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
        updateCharacterCount
    );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            formStatus.textContent =
                "";

            formStatus.classList.remove(
                "is-success"
            );


            const nameIsValid =
                validateName();

            const emailIsValid =
                validateEmail();

            const messageIsValid =
                validateMessage();


            if (
                !nameIsValid
                ||
                !emailIsValid
                ||
                !messageIsValid
            ) {

                formStatus.textContent =
                    "Bitte überprüfe die markierten Felder.";

                return;

            }


            const name =
                nameInput.value.trim();

            const senderEmail =
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
                    `E-Mail: ${senderEmail}\n\n` +
                    `Nachricht:\n${message}`
                );


            formStatus.textContent =
                "Alles geprüft – dein E-Mail-Programm wird geöffnet.";

            formStatus.classList.add(
                "is-success"
            );


            window.location.href =
                `mailto:${CONTACT_EMAIL}` +
                `?subject=${subject}` +
                `&body=${body}`;

        }
    );

}


// =========================
// SCROLL ANIMATIONS
// =========================

function initialiseRevealAnimations() {

    const revealElements =
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


    const observerOptions = {

        root:
            null,

        rootMargin:
            "0px 0px -10% 0px",

        threshold:
            0.15

    };


    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

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
            observerOptions
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        }
    );

}


// =========================
// SKILL ANIMATION DELAYS
// =========================

function initialiseSkillAnimations() {

    const skillItems =
        document.querySelectorAll(
            ".skill-item"
        );


    skillItems.forEach(
        (
            element,
            index
        ) => {

            element.style
                .transitionDelay =
                `${index * 0.12}s`;

        }
    );

}


// =========================
// HERO ANIMATION
// =========================

function initialiseHeroAnimation() {

    const heroElements =
        document.querySelectorAll(
            ".hero-label, " +
            ".hero h1, " +
            ".hero-description, " +
            ".hero-link"
        );


    heroElements.forEach(
        (
            element,
            index
        ) => {

            element.classList.add(
                "hero-reveal"
            );


            setTimeout(
                () => {

                    element
                        .classList
                        .add(
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
// START APPLICATION
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProjects();

        initialiseNavigation();

        initialiseContactForm();

        initialiseRevealAnimations();

        initialiseSkillAnimations();

        initialiseHeroAnimation();

        loadGitHubRepositories();

    }
);
