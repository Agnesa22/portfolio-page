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
// PROJECT BUTTON
// =========================

function createProjectButton(
    project
) {

    return `
        <button
            type="button"
            class="project-modal-trigger"
            data-project-id="${project.id}"
            data-cursor="VIEW"
            aria-label="Details zu ${project.title} anzeigen"
        >

            <span>
                Projekt ansehen
            </span>

            <svg
                class="project-button-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M5 19 L19 5"></path>
                <path d="M10 5 H19 V14"></path>
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
        project.type ===
        "browser"
    ) {

        return `
            <div
                class="project-visual project-visual-casasierra"
                data-project-tilt
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

                    <img
                        src="${project.image}"
                        alt="${project.imageAlt}"
                        class="project-preview-image"
                    >

                </div>

            </div>
        `;
    }


    return `
        <div
            class="project-visual project-visual-fairflat"
            data-project-tilt
        >

            <div class="fairflat-device">

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

    const reverse =
        index % 2 !== 0;


    const number =
        String(
            project.id
        ).padStart(
            2,
            "0"
        );


    return `
        <article
            class="
                project-feature
                ${reverse
                    ? "project-feature-reverse"
                    : ""
                }
            "
        >

            ${createProjectVisual(
                project
            )}


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
                        ${project.technologies.join(
                            " · "
                        )}
                    </p>


                    ${createProjectButton(
                        project
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
// CUSTOM CURSOR
// =========================

function initialiseCustomCursor() {

    const cursor =
        document.querySelector(
            "#custom-cursor"
        );


    const cursorText =
        document.querySelector(
            "#custom-cursor-text"
        );


    if (
        !cursor ||
        !cursorText
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

        cursor.style.display =
            "none";

        return;
    }


    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                `${event.clientX}px`;


            cursor.style.top =
                `${event.clientY}px`;

        }
    );


    document.addEventListener(
        "mouseover",
        event => {

            const target =
                event.target.closest(
                    "[data-cursor]"
                );


            if (
                !target
            ) {
                return;
            }


            cursor.classList.add(
                "is-active"
            );


            cursorText.textContent =
                target.dataset.cursor;

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            const target =
                event.target.closest(
                    "[data-cursor]"
                );


            if (
                !target
            ) {
                return;
            }


            cursor.classList.remove(
                "is-active"
            );


            cursorText.textContent =
                "";

        }
    );

}


// =========================
// HERO FLOATING CARDS
// =========================

function initialiseHeroCards() {

    const hero =
        document.querySelector(
            ".hero"
        );


    const cards =
        document.querySelectorAll(
            ".hero-card"
        );


    if (
        !hero ||
        !cards.length
    ) {
        return;
    }


    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
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
                    event.clientX -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            cards.forEach(
                (
                    card,
                    index
                ) => {

                    const multiplier =
                        index + 1;


                    card.style.translate =
                        `${x * 9 * multiplier}px ${y * 7 * multiplier}px`;

                }
            );

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            cards.forEach(
                card => {

                    card.style.translate =
                        "0 0";

                }
            );

        }
    );

}


// =========================
// PROJECT TILT
// CasaSierra + FairFlat
// =========================

function initialiseProjectTilt() {

    const visuals =
        document.querySelectorAll(
            "[data-project-tilt]"
        );


    if (
        !visuals.length
    ) {
        return;
    }


    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !supportsMouse ||
        reduceMotion
    ) {
        return;
    }


    visuals.forEach(
        visual => {

            visual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        visual
                            .getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        )
                        /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        )
                        /
                        rect.height;


                    const rotateY =
                        (
                            x -
                            0.5
                        )
                        *
                        7;


                    const rotateX =
                        (
                            0.5 -
                            y
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


    function setText(
        selector,
        value
    ) {

        const element =
            document.querySelector(
                selector
            );


        if (
            element
        ) {

            element.textContent =
                value;

        }

    }


    function openModal(
        project
    ) {

        previouslyFocusedElement =
            document.activeElement;


        setText(
            "#modal-project-number",
            String(
                project.id
            ).padStart(
                2,
                "0"
            )
        );


        setText(
            "#modal-project-category",
            project.category
        );


        setText(
            "#modal-project-title",
            project.title
        );


        setText(
            "#modal-project-description",
            project.description
        );


        setText(
            "#modal-project-challenge",
            project.challenge
        );


        setText(
            "#modal-project-solution",
            project.solution
        );


        setText(
            "#modal-project-result",
            project.result
        );


        setText(
            "#modal-project-technologies",
            project.technologies.join(
                " · "
            )
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


        if (
            closeButton
        ) {

            window.setTimeout(
                () => {

                    closeButton.focus();

                },
                40
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
            typeof
            previouslyFocusedElement.focus
            ===
            "function"
        ) {

            previouslyFocusedElement.focus();

        }

    }


    document.addEventListener(
        "click",
        event => {

            const projectButton =
                event.target.closest(
                    ".project-modal-trigger"
                );


            if (
                projectButton
            ) {

                const project =
                    projects.find(
                        item =>
                            item.id ===
                            Number(
                                projectButton
                                    .dataset
                                    .projectId
                            )
                    );


                if (
                    project
                ) {

                    openModal(
                        project
                    );

                }

            }


            const closeTrigger =
                event.target.closest(
                    "[data-modal-close]"
                );


            if (
                closeTrigger
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape" &&
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

    try {

        const cached =
            localStorage.getItem(
                GITHUB_CACHE_KEY
            );


        if (
            !cached
        ) {
            return null;
        }


        const data =
            JSON.parse(
                cached
            );


        if (
            Date.now() -
            data.timestamp >
            GITHUB_CACHE_TIME
        ) {

            localStorage.removeItem(
                GITHUB_CACHE_KEY
            );


            return null;

        }


        return data.repositories;

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

    const cached =
        getCachedRepositories();


    if (
        cached
    ) {

        return {
            repositories:
                cached,

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


    const updated =
        formatRepositoryDate(
            repository.updated_at
        );


    return `
        <a
            href="${repository.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="github-card"
            data-cursor="OPEN"
        >

            <div class="github-card-top">

                <span>
                    ${number}
                </span>

                <span>
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
                    Updated ${updated}
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
// LOAD GITHUB
// =========================

async function loadGitHubRepositories() {

    const container =
        document.querySelector(
            "#github-repositories"
        );


    const status =
        document.querySelector(
            "#github-status"
        );


    if (
        !container
    ) {
        return;
    }


    try {

        const result =
            await fetchRepositories();


        const visible =
            result.repositories
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
            !visible.length
        ) {

            container.innerHTML =
                `
                    <div class="github-error">
                        Aktuell sind keine öffentlichen Repositories verfügbar.
                    </div>
                `;

        } else {

            container.innerHTML =
                visible
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


        if (
            status
        ) {

            status.textContent =
                result.source ===
                "cache"
                    ? "GitHub Daten aus lokalem Cache geladen"
                    : "GitHub Daten erfolgreich aktualisiert";

        }

    } catch (
        error
    ) {

        console.error(
            "GitHub API:",
            error
        );


        if (
            status
        ) {

            status.textContent =
                "GitHub Daten konnten nicht geladen werden";

        }


        container.innerHTML =
            `
                <div class="github-error">
                    Die GitHub-Repositories sind momentan nicht verfügbar.
                </div>
            `;

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


    const menu =
        document.querySelector(
            ".nav-links"
        );


    if (
        !button ||
        !menu
    ) {
        return;
    }


    function closeMenu() {

        button.classList.remove(
            "is-active"
        );


        menu.classList.remove(
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
                !menu.classList.contains(
                    "is-open"
                );


            button.classList.toggle(
                "is-active",
                open
            );


            menu.classList.toggle(
                "is-open",
                open
            );


            button.setAttribute(
                "aria-expanded",
                String(
                    open
                )
            );


            document.body.classList.toggle(
                "menu-open",
                open
            );

        }
    );


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
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
                event.key ===
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


    const name =
        document.querySelector(
            "#contact-name"
        );


    const email =
        document.querySelector(
            "#contact-email"
        );


    const message =
        document.querySelector(
            "#contact-message"
        );


    const counter =
        document.querySelector(
            "#character-count"
        );


    const status =
        document.querySelector(
            "#form-status"
        );


    function setError(
        id,
        text
    ) {

        const element =
            document.querySelector(
                id
            );


        if (
            element
        ) {

            element.textContent =
                text;

        }

    }


    if (
        message &&
        counter
    ) {

        message.addEventListener(
            "input",
            () => {

                counter.textContent =
                    `${message.value.length} / 1000`;

            }
        );

    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let valid =
                true;


            if (
                name.value
                    .trim()
                    .length < 2
            ) {

                setError(
                    "#name-error",
                    "Bitte gib deinen Namen ein."
                );


                valid =
                    false;

            } else {

                setError(
                    "#name-error",
                    ""
                );

            }


            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(
                    email.value.trim()
                )
            ) {

                setError(
                    "#email-error",
                    "Bitte gib eine gültige E-Mail-Adresse ein."
                );


                valid =
                    false;

            } else {

                setError(
                    "#email-error",
                    ""
                );

            }


            if (
                message.value
                    .trim()
                    .length < 10
            ) {

                setError(
                    "#message-error",
                    "Die Nachricht sollte mindestens 10 Zeichen enthalten."
                );


                valid =
                    false;

            } else if (
                message.value.length >
                1000
            ) {

                setError(
                    "#message-error",
                    "Die Nachricht darf maximal 1000 Zeichen enthalten."
                );


                valid =
                    false;

            } else {

                setError(
                    "#message-error",
                    ""
                );

            }


            if (
                !valid
            ) {

                if (
                    status
                ) {

                    status.textContent =
                        "Bitte überprüfe die Angaben.";

                }


                return;

            }


            const subject =
                encodeURIComponent(
                    `Portfolio Anfrage von ${name.value.trim()}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name.value.trim()}\n` +
                    `E-Mail: ${email.value.trim()}\n\n` +
                    `Nachricht:\n${message.value.trim()}`
                );


            if (
                status
            ) {

                status.textContent =
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
// REVEAL
// =========================

function initialiseReveal() {

    const elements =
        document.querySelectorAll(
            ".section-heading, " +
            ".bio-layout, " +
            ".current-card, " +
            ".career-link, " +
            ".skill-item, " +
            ".github-intro, " +
            ".contact-header, " +
            ".cv-entry, " +
            ".education-card, " +
            ".cv-tool-grid, " +
            ".language-grid"
        );


    if (
        !elements.length
    ) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in
            window
        )
    ) {

        elements.forEach(
            element =>
                element
                    .classList
                    .add(
                        "is-visible"
                    )
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
                    0.12,

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
// START
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProjects();

        initialiseNavigation();

        initialiseProjectModal();

        initialiseContactForm();

        initialiseCustomCursor();

        initialiseHeroCards();

        initialiseProjectTilt();

        initialiseReveal();

        loadGitHubRepositories();

    }
);
