(() => {

    // =========================================
    // GITHUB ACTIVITY ENHANCEMENT
    // =========================================
    //
    // Erweiterung der bestehenden GitHub-Sektion:
    //
    // - GitHub Profile API
    // - Repository API
    // - Datenkombination
    // - LocalStorage Cache
    // - Statistiken
    // - Dynamische Sprachfilter
    // - Fehlerbehandlung
    //
    // Die Datei ist bewusst als separates Modul
    // aufgebaut, damit der bestehende Code
    // übersichtlich und wartbar bleibt.
    // =========================================


    // =========================================
    // CONFIGURATION
    // =========================================

    const GITHUB_ENHANCEMENT_USERNAME =
        "Agnesa22";


    const GITHUB_PROFILE_URL =
        `https://api.github.com/users/${GITHUB_ENHANCEMENT_USERNAME}`;


    const GITHUB_REPOSITORIES_URL =
        `https://api.github.com/users/${GITHUB_ENHANCEMENT_USERNAME}/repos` +
        "?sort=updated&direction=desc&per_page=100&type=owner";


    const GITHUB_ENHANCEMENT_CACHE_KEY =
        "agnesa-github-dashboard";


    const GITHUB_ENHANCEMENT_CACHE_TIME =
        30 * 60 * 1000;


    const DEFAULT_FILTER =
        "All";


    let activeLanguageFilter =
        DEFAULT_FILTER;


    let githubRepositories =
        [];


    let githubRequestPromise =
        null;



    // =========================================
    // CSS
    // =========================================

    function injectGitHubEnhancementStyles() {

        if (
            document.querySelector(
                "#github-enhancement-styles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "github-enhancement-styles";


        style.textContent =
            `

            /* =========================================
               GITHUB DASHBOARD
            ========================================= */

            .github-dashboard {
                margin-bottom: 36px;

                border-top:
                    1px solid
                    var(--line);

                border-left:
                    1px solid
                    var(--line);
            }


            /* STATISTICS */

            .github-stats {
                display: grid;

                grid-template-columns:
                    repeat(3, 1fr);
            }


            .github-stat {
                position: relative;

                min-height: 165px;

                padding: 24px 26px;

                display: flex;

                flex-direction: column;

                justify-content:
                    space-between;

                overflow: hidden;

                border-right:
                    1px solid
                    var(--line);

                border-bottom:
                    1px solid
                    var(--line);

                background:
                    var(--cream);

                transition:
                    background-color 0.3s ease,
                    transform 0.3s ease;
            }


            .github-stat:hover {
                background:
                    var(--cream-dark);

                transform:
                    translateY(-3px);
            }


            .github-stat-number {
                position: absolute;

                right: -8px;
                bottom: -42px;

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size: 125px;

                line-height: 1;

                color:
                    rgba(122, 31, 43, 0.045);

                pointer-events: none;
            }


            .github-stat-label {
                position: relative;

                z-index: 2;

                font-size: 9px;

                font-weight: 700;

                letter-spacing: 1px;

                text-transform:
                    uppercase;

                color:
                    var(--burgundy);
            }


            .github-stat-value {
                position: relative;

                z-index: 2;

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    clamp(
                        30px,
                        3vw,
                        44px
                    );

                font-weight: 400;

                line-height: 1;

                color:
                    var(--text);
            }


            .github-stat-detail {
                position: relative;

                z-index: 2;

                margin-top: 8px;

                font-size: 9px;

                text-transform:
                    uppercase;

                letter-spacing: 0.6px;

                color:
                    var(--text-soft);
            }


            /* FILTER AREA */

            .github-filter-area {
                padding: 22px 0 0;

                display: flex;

                align-items: flex-start;

                justify-content:
                    space-between;

                gap: 30px;
            }


            .github-filter-heading {
                flex-shrink: 0;

                padding-top: 8px;

                font-size: 9px;

                font-weight: 700;

                letter-spacing: 1px;

                text-transform:
                    uppercase;

                color:
                    var(--text-soft);
            }


            .github-filters {
                display: flex;

                flex-wrap: wrap;

                justify-content: flex-end;

                gap: 7px;
            }


            .github-filter {
                padding:
                    7px 12px;

                border:
                    1px solid
                    var(--line);

                border-radius:
                    100px;

                background:
                    transparent;

                color:
                    var(--text-soft);

                font-size: 9px;

                font-weight: 700;

                letter-spacing: 0.5px;

                text-transform:
                    uppercase;

                cursor: pointer;

                transition:
                    color 0.25s ease,
                    border-color 0.25s ease,
                    background-color 0.25s ease,
                    transform 0.25s ease;
            }


            .github-filter:hover {
                color:
                    var(--burgundy);

                border-color:
                    var(--burgundy);

                transform:
                    translateY(-2px);
            }


            .github-filter.is-active {
                background:
                    var(--burgundy);

                border-color:
                    var(--burgundy);

                color:
                    var(--cream-light);
            }


            /* TECHNICAL NOTE */

            .github-tech-note {
                margin-top: 19px;

                padding-top: 14px;

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                gap: 20px;

                border-top:
                    1px solid
                    var(--line);

                font-size: 9px;

                text-transform:
                    uppercase;

                letter-spacing: 0.6px;

                color:
                    var(--text-soft);
            }


            .github-tech-note strong {
                color:
                    var(--burgundy);
            }


            .github-tech-badge {
                padding:
                    5px 9px;

                border:
                    1px solid
                    var(--line);

                border-radius:
                    100px;

                white-space: nowrap;
            }


            /* FILTERED RESULT MESSAGE */

            .github-empty-state {
                grid-column:
                    1 / -1;

                min-height: 200px;

                padding: 35px;

                display: flex;

                align-items: center;

                justify-content: center;

                border:
                    1px solid
                    var(--line);

                color:
                    var(--text-soft);

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size: 23px;

                text-align: center;
            }


            /* ACCESSIBILITY */

            .github-filter:focus-visible {
                outline:
                    2px solid
                    var(--burgundy);

                outline-offset:
                    3px;
            }


            /* TABLET */

            @media (
                max-width: 1024px
            ) {

                .github-stats {
                    grid-template-columns:
                        repeat(3, 1fr);
                }


                .github-stat {
                    min-height:
                        145px;
                }

            }


            /* MOBILE */

            @media (
                max-width: 768px
            ) {

                .github-stats {
                    grid-template-columns:
                        1fr;
                }


                .github-stat {
                    min-height:
                        125px;
                }


                .github-filter-area {
                    flex-direction:
                        column;

                    gap:
                        15px;
                }


                .github-filters {
                    justify-content:
                        flex-start;
                }


                .github-tech-note {
                    align-items:
                        flex-start;

                    flex-direction:
                        column;
                }

            }

            `;


        document.head.appendChild(
            style
        );

    }



    // =========================================
    // CREATE DASHBOARD STRUCTURE
    // =========================================

    function createGitHubDashboard() {

        const githubSection =
            document.querySelector(
                "#github .github-inner"
            );


        const githubStatus =
            document.querySelector(
                "#github-status"
            );


        if (
            !githubSection ||
            !githubStatus
        ) {
            return null;
        }


        let dashboard =
            document.querySelector(
                "#github-dashboard"
            );


        if (
            dashboard
        ) {
            return dashboard;
        }


        dashboard =
            document.createElement(
                "div"
            );


        dashboard.id =
            "github-dashboard";


        dashboard.className =
            "github-dashboard";


        dashboard.innerHTML =
            `

            <div
                class="github-stats"
                id="github-stats"
                aria-label="GitHub Statistiken"
            >

                <article class="github-stat">

                    <span class="github-stat-number">
                        01
                    </span>

                    <span class="github-stat-label">
                        Repositories
                    </span>

                    <div>

                        <strong
                            class="github-stat-value"
                            id="github-stat-repositories"
                        >
                            —
                        </strong>

                        <p class="github-stat-detail">
                            Public repositories
                        </p>

                    </div>

                </article>


                <article class="github-stat">

                    <span class="github-stat-number">
                        02
                    </span>

                    <span class="github-stat-label">
                        Languages
                    </span>

                    <div>

                        <strong
                            class="github-stat-value"
                            id="github-stat-languages"
                        >
                            —
                        </strong>

                        <p
                            class="github-stat-detail"
                            id="github-stat-language-detail"
                        >
                            Technologies detected
                        </p>

                    </div>

                </article>


                <article class="github-stat">

                    <span class="github-stat-number">
                        03
                    </span>

                    <span class="github-stat-label">
                        Last Activity
                    </span>

                    <div>

                        <strong
                            class="github-stat-value"
                            id="github-stat-activity"
                        >
                            —
                        </strong>

                        <p class="github-stat-detail">
                            Latest repository update
                        </p>

                    </div>

                </article>

            </div>


            <div class="github-filter-area">

                <p class="github-filter-heading">
                    Filter by language
                </p>


                <div
                    class="github-filters"
                    id="github-language-filters"
                    role="group"
                    aria-label="Repositories nach Sprache filtern"
                ></div>

            </div>


            <div class="github-tech-note">

                <p>
                    Live data via
                    <strong>
                        GitHub REST API
                    </strong>
                    · Profile + repository data
                </p>


                <span class="github-tech-badge">
                    LocalStorage cache · 30 min
                </span>

            </div>

            `;


        githubSection.insertBefore(
            dashboard,
            githubStatus
        );


        return dashboard;

    }



    // =========================================
    // CACHE
    // =========================================

    function getCachedGitHubDashboard() {

        try {

            const cachedData =
                localStorage.getItem(
                    GITHUB_ENHANCEMENT_CACHE_KEY
                );


            if (
                !cachedData
            ) {
                return null;
            }


            const parsedData =
                JSON.parse(
                    cachedData
                );


            const cacheAge =
                Date.now() -
                parsedData.timestamp;


            if (
                cacheAge >
                GITHUB_ENHANCEMENT_CACHE_TIME
            ) {

                localStorage.removeItem(
                    GITHUB_ENHANCEMENT_CACHE_KEY
                );


                return null;

            }


            if (
                !parsedData.profile ||
                !Array.isArray(
                    parsedData.repositories
                )
            ) {

                return null;

            }


            return {
                profile:
                    parsedData.profile,

                repositories:
                    parsedData.repositories
            };

        } catch (
            error
        ) {

            console.warn(
                "GitHub dashboard cache could not be read.",
                error
            );


            localStorage.removeItem(
                GITHUB_ENHANCEMENT_CACHE_KEY
            );


            return null;

        }

    }


    function cacheGitHubDashboard(
        profile,
        repositories
    ) {

        try {

            localStorage.setItem(
                GITHUB_ENHANCEMENT_CACHE_KEY,

                JSON.stringify({
                    timestamp:
                        Date.now(),

                    profile:
                        profile,

                    repositories:
                        repositories
                })
            );

        } catch (
            error
        ) {

            console.warn(
                "GitHub dashboard cache could not be saved.",
                error
            );

        }

    }



    // =========================================
    // API REQUEST
    // =========================================

    async function fetchGitHubDashboardData() {

        const cached =
            getCachedGitHubDashboard();


        if (
            cached
        ) {

            return {
                ...cached,
                source:
                    "cache"
            };

        }


        const requestOptions = {
            headers: {
                Accept:
                    "application/vnd.github+json"
            }
        };


        const [
            profileResponse,
            repositoriesResponse
        ] =
            await Promise.all([
                fetch(
                    GITHUB_PROFILE_URL,
                    requestOptions
                ),

                fetch(
                    GITHUB_REPOSITORIES_URL,
                    requestOptions
                )
            ]);


        if (
            !profileResponse.ok
        ) {

            throw new Error(
                `GitHub profile request failed: ${profileResponse.status}`
            );

        }


        if (
            !repositoriesResponse.ok
        ) {

            throw new Error(
                `GitHub repository request failed: ${repositoriesResponse.status}`
            );

        }


        const [
            profile,
            repositories
        ] =
            await Promise.all([
                profileResponse.json(),
                repositoriesResponse.json()
            ]);


        cacheGitHubDashboard(
            profile,
            repositories
        );


        return {
            profile:
                profile,

            repositories:
                repositories,

            source:
                "api"
        };

    }



    // =========================================
    // REPOSITORY PREPARATION
    // =========================================

    function getRelevantRepositories(
        repositories
    ) {

        return repositories
            .filter(
                repository =>
                    !repository.fork &&
                    !repository.archived
            )
            .sort(
                (
                    firstRepository,
                    secondRepository
                ) =>
                    new Date(
                        secondRepository.updated_at
                    ) -
                    new Date(
                        firstRepository.updated_at
                    )
            );

    }



    // =========================================
    // LANGUAGE DATA
    // =========================================

    function getLanguageStatistics(
        repositories
    ) {

        const languageCounts =
            repositories.reduce(
                (
                    result,
                    repository
                ) => {

                    const language =
                        repository.language;


                    if (
                        !language
                    ) {
                        return result;
                    }


                    if (
                        !result[language]
                    ) {

                        result[language] =
                            0;

                    }


                    result[language] +=
                        1;


                    return result;

                },
                {}
            );


        return Object.entries(
            languageCounts
        ).sort(
            (
                firstLanguage,
                secondLanguage
            ) =>
                secondLanguage[1] -
                firstLanguage[1]
        );

    }



    // =========================================
    // DATE FORMATTING
    // =========================================

    function formatDashboardDate(
        dateString
    ) {

        if (
            !dateString
        ) {
            return "—";
        }


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



    // =========================================
    // SAFE TEXT
    // =========================================

    function escapeHTML(
        value
    ) {

        return String(
            value ?? ""
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }



    // =========================================
    // STATISTICS
    // =========================================

    function renderGitHubStatistics(
        profile,
        repositories
    ) {

        const repositoryElement =
            document.querySelector(
                "#github-stat-repositories"
            );


        const languageElement =
            document.querySelector(
                "#github-stat-languages"
            );


        const languageDetailElement =
            document.querySelector(
                "#github-stat-language-detail"
            );


        const activityElement =
            document.querySelector(
                "#github-stat-activity"
            );


        const languageStatistics =
            getLanguageStatistics(
                repositories
            );


        const latestRepository =
            repositories[0];


        if (
            repositoryElement
        ) {

            repositoryElement.textContent =
                profile.public_repos ??
                repositories.length;

        }


        if (
            languageElement
        ) {

            languageElement.textContent =
                languageStatistics.length;

        }


        if (
            languageDetailElement
        ) {

            const topLanguages =
                languageStatistics
                    .slice(
                        0,
                        3
                    )
                    .map(
                        item =>
                            item[0]
                    );


            languageDetailElement.textContent =
                topLanguages.length
                    ?
                    topLanguages.join(
                        " · "
                    )
                    :
                    "No language data";

        }


        if (
            activityElement
        ) {

            activityElement.textContent =
                latestRepository
                    ?
                    formatDashboardDate(
                        latestRepository.updated_at
                    )
                    :
                    "—";

        }

    }



    // =========================================
    // FILTER BUTTONS
    // =========================================

    function renderLanguageFilters(
        repositories
    ) {

        const filterContainer =
            document.querySelector(
                "#github-language-filters"
            );


        if (
            !filterContainer
        ) {
            return;
        }


        const languageStatistics =
            getLanguageStatistics(
                repositories
            );


        const languages = [
            DEFAULT_FILTER,
            ...languageStatistics.map(
                item =>
                    item[0]
            )
        ];


        filterContainer.innerHTML =
            languages
                .map(
                    language => {

                        const activeClass =
                            language ===
                            activeLanguageFilter
                                ?
                                "is-active"
                                :
                                "";


                        const label =
                            language ===
                            DEFAULT_FILTER
                                ?
                                "All"
                                :
                                escapeHTML(
                                    language
                                );


                        return `
                            <button
                                type="button"
                                class="github-filter ${activeClass}"
                                data-github-language="${escapeHTML(
                                    language
                                )}"
                                aria-pressed="${
                                    language ===
                                    activeLanguageFilter
                                        ?
                                        "true"
                                        :
                                        "false"
                                }"
                            >
                                ${label}
                            </button>
                        `;

                    }
                )
                .join("");

    }



    // =========================================
    // REPOSITORY CARD
    // =========================================

    function createEnhancedRepositoryMarkup(
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
            formatDashboardDate(
                repository.updated_at
            );


        return `
            <a
                href="${escapeHTML(
                    repository.html_url
                )}"
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
                        ${escapeHTML(
                            language
                        )}
                    </span>

                </div>


                <h3>
                    ${escapeHTML(
                        repository.name
                    )}
                </h3>


                <p class="github-description">
                    ${escapeHTML(
                        description
                    )}
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



    // =========================================
    // REPOSITORY RENDERING
    // =========================================

    function renderFilteredRepositories() {

        const repositoryContainer =
            document.querySelector(
                "#github-repositories"
            );


        if (
            !repositoryContainer
        ) {
            return;
        }


        const filteredRepositories =
            activeLanguageFilter ===
            DEFAULT_FILTER

                ?
                githubRepositories

                :
                githubRepositories.filter(
                    repository =>
                        repository.language ===
                        activeLanguageFilter
                );


        /*
         * Heute zeigen wir maximal sechs.
         *
         * Im nächsten Ausbauschritt können wir
         * daraus "Load more" / Pagination machen.
         */

        const visibleRepositories =
            filteredRepositories.slice(
                0,
                6
            );


        if (
            !visibleRepositories.length
        ) {

            repositoryContainer.innerHTML =
                `
                    <div class="github-empty-state">
                        Für diesen Filter sind aktuell
                        keine Repositories vorhanden.
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
                        createEnhancedRepositoryMarkup(
                            repository,
                            index
                        )
                )
                .join("");

    }



    // =========================================
    // FILTER INTERACTION
    // =========================================

    function initialiseLanguageFilters() {

        const filterContainer =
            document.querySelector(
                "#github-language-filters"
            );


        if (
            !filterContainer ||
            filterContainer.dataset.initialised ===
            "true"
        ) {
            return;
        }


        filterContainer.dataset.initialised =
            "true";


        filterContainer.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-github-language]"
                    );


                if (
                    !button
                ) {
                    return;
                }


                activeLanguageFilter =
                    button.dataset.githubLanguage;


                document
                    .querySelectorAll(
                        ".github-filter"
                    )
                    .forEach(
                        filterButton => {

                            const isActive =
                                filterButton.dataset.githubLanguage ===
                                activeLanguageFilter;


                            filterButton.classList.toggle(
                                "is-active",
                                isActive
                            );


                            filterButton.setAttribute(
                                "aria-pressed",
                                String(
                                    isActive
                                )
                            );

                        }
                    );


                renderFilteredRepositories();

            }
        );

    }



    // =========================================
    // STATUS
    // =========================================

    function updateEnhancedGitHubStatus(
        message
    ) {

        const status =
            document.querySelector(
                "#github-status"
            );


        if (
            status
        ) {

            status.textContent =
                message;

        }

    }



    // =========================================
    // MAIN GITHUB LOADER
    // =========================================

    async function enhancedLoadGitHubRepositories() {

        if (
            githubRequestPromise
        ) {

            return githubRequestPromise;

        }


        githubRequestPromise =
            (async () => {

                injectGitHubEnhancementStyles();


                createGitHubDashboard();


                updateEnhancedGitHubStatus(
                    "GitHub Daten werden geladen..."
                );


                try {

                    const result =
                        await fetchGitHubDashboardData();


                    githubRepositories =
                        getRelevantRepositories(
                            result.repositories
                        );


                    renderGitHubStatistics(
                        result.profile,
                        githubRepositories
                    );


                    renderLanguageFilters(
                        githubRepositories
                    );


                    initialiseLanguageFilters();


                    renderFilteredRepositories();


                    updateEnhancedGitHubStatus(
                        result.source ===
                        "cache"

                            ?
                            "Profil und Repositories aus lokalem Cache geladen"

                            :
                            "Profil und Repositories über GitHub API aktualisiert"
                    );


                } catch (
                    error
                ) {

                    console.error(
                        "Enhanced GitHub dashboard:",
                        error
                    );


                    updateEnhancedGitHubStatus(
                        "GitHub Daten konnten momentan nicht geladen werden"
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
                                <div class="github-empty-state">
                                    Die GitHub-Daten sind momentan
                                    nicht verfügbar.
                                </div>
                            `;

                    }

                }

            })();


        return githubRequestPromise;

    }



    // =========================================
    // OVERRIDE EXISTING GITHUB LOADER
    // =========================================
    //
    // Die bestehende script.js ruft bereits
    // loadGitHubRepositories() auf.
    //
    // Wir ersetzen nur diese Funktion durch die
    // erweiterte Version. Der restliche bestehende
    // JavaScript-Code bleibt unverändert.
    // =========================================

    window.loadGitHubRepositories =
        enhancedLoadGitHubRepositories;



    // =========================================
    // FALLBACK INITIALISATION
    // =========================================

    function initialiseGitHubEnhancement() {

        enhancedLoadGitHubRepositories();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseGitHubEnhancement,
            {
                once:
                    true
            }
        );

    } else {

        initialiseGitHubEnhancement();

    }

})();
