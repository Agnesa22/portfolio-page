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
// PROJECT RENDERING
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
        >
            <svg
                class="arrow-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M5 19 L19 5"></path>
                <path d="M10 5 H19 V14"></path>
            </svg>
        </button>
    `;
}


function createProjectVisual(
    project
) {

    if (
        project.type ===
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
        <div class="project-visual project-visual-fairflat">

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


function createProjectMarkup(
    project,
    index
) {

    const reverse =
        index % 2 !== 0;


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
                        ${String(
                            project.id
                        ).padStart(
                            2,
                            "0"
                        )}
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
                createProjectMarkup
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


                    const moveX =
                        x *
                        10 *
                        multiplier;


                    const moveY =
                        y *
                        8 *
                        multiplier;


                    card.style.translate =
                        `${moveX}px ${moveY}px`;

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
// =========================

function initialiseProjectTilt() {

    const visuals =
        document.querySelectorAll(
            ".project-visual"
        );


    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
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
                            rotateX(
                                ${rotateX}deg
                            )
                            rotateY(
                                ${rotateY}deg
                            )
                        `;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    visual.style.transform =
                        "";

                }
            );

        }
    );

}



// =========================
// MODAL
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


    function openModal(
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
                event.key ===
                "Escape"
            ) {

                closeModal();

            }

        }
    );

}



// =========================
// GITHUB
// =========================

function getCachedRepositories() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    GITHUB_CACHE_KEY
                )
            );


        if (
            !data
        ) {
            return null;
        }


        if (
            Date.now() -
            data.timestamp >
            GITHUB_CACHE_TIME
        ) {

            return null;

        }


        return data.repositories;

    } catch {

        return null;

    }

}


async function fetchRepositories() {

    const cache =
        getCachedRepositories();


    if (
        cache
    ) {

        return cache;

    }


    const response =
        await fetch(
            GITHUB_API_URL
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "GitHub API error"
        );

    }


    const data =
        await response.json();


    localStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify({
            timestamp:
                Date.now(),

            repositories:
                data
        })
    );


    return data;

}


function createRepositoryMarkup(
    repo,
    index
) {

    return `
        <a
            href="${repo.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="github-card"
            data-cursor="OPEN"
        >

            <div class="github-card-top">

                <span>
                    ${String(
                        index + 1
                    ).padStart(
                        2,
                        "0"
                    )}
                </span>

                <span>
                    ${repo.language || "Code"}
                </span>

            </div>


            <h3>
                ${repo.name}
            </h3>


            <p class="github-description">
                ${repo.description ||
                "Öffentliches GitHub Repository."}
            </p>


            <div class="github-card-footer">

                <span>
                    GitHub
                </span>

                <span>
                    ↗
                </span>

            </div>

        </a>
    `;
}


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

        const repositories =
            await fetchRepositories();


        const visible =
            repositories
                .filter(
                    repo =>
                        !repo.fork &&
                        !repo.archived
                )
                .slice(
                    0,
                    3
                );


        container.innerHTML =
            visible
                .map(
                    createRepositoryMarkup
                )
                .join("");


        if (
            status
        ) {

            status.textContent =
                "GitHub repositories loaded";

        }

    } catch (
        error
    ) {

        if (
            status
        ) {

            status.textContent =
                "GitHub data currently unavailable";

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


        document.body.classList.remove(
            "menu-open"
        );

    }


    button.addEventListener(
        "click",
        () => {

            button
                .classList
                .toggle(
                    "is-active"
                );


            menu
                .classList
                .toggle(
                    "is-open"
                );


            document.body
                .classList
                .toggle(
                    "menu-open"
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

}



// =========================
// CONTACT
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


    function setError(
        id,
        text
    ) {

        document.querySelector(
            id
        ).textContent =
            text;

    }


    message.addEventListener(
        "input",
        () => {

            counter.textContent =
                `${message.value.length} / 1000`;

        }
    );


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

            } else {

                setError(
                    "#message-error",
                    ""
                );

            }


            if (
                !valid
            ) {
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
            ".experience-card, " +
            ".skill-item, " +
            ".github-intro, " +
            ".contact-header"
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
                    0.12
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
