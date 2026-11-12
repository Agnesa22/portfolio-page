(() => {

    // =========================================
    // GITHUB ACTIVITY DASHBOARD
    // =========================================
    //
    // Features:
    // - GitHub Profile API
    // - GitHub Repositories API
    // - GitHub Commits API
    // - Kombination mehrerer Datenquellen
    // - LocalStorage Caching
    // - Dynamische Statistiken
    // - Dynamische Sprachfilter
    // - Recent Commit Activity
    // - Responsive Rendering
    // - Fehlerbehandlung
    //
    // Dieses Modul erweitert nur die bestehende
    // GitHub-Sektion des Portfolios.
    // =========================================


    // =========================================
    // CONFIG
    // =========================================

    const GITHUB_USERNAME =
        "Agnesa22";


    const ACTIVITY_REPOSITORY =
        "portfolio-page";


    const PROFILE_API =
        `https://api.github.com/users/${GITHUB_USERNAME}`;


    const REPOSITORIES_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
        "?sort=updated&direction=desc&per_page=100&type=owner";


    const COMMITS_API =
        `https://api.github.com/repos/${GITHUB_USERNAME}/${ACTIVITY_REPOSITORY}/commits` +
        "?per_page=8";


    const CACHE_KEY =
        "agnesa-github-dashboard-v2";


    const CACHE_DURATION =
        30 * 60 * 1000;


    const DEFAULT_FILTER =
        "All";


    const MAX_REPOSITORIES =
        3;


    const MAX_COMMITS =
        5;


    let repositories =
        [];


    let activeFilter =
        DEFAULT_FILTER;


    let requestPromise =
        null;



    // =========================================
    // STYLES
    // =========================================

    function injectStyles() {

        if (
            document.querySelector(
                "#github-dashboard-v2-styles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "github-dashboard-v2-styles";


        style.textContent =
            `

            /* =====================================
               DASHBOARD
            ===================================== */

            .github-dashboard-v2 {
                margin-bottom: 38px;
            }


            /* =====================================
               STATISTICS
            ===================================== */

            .github-stats-v2 {
                display: grid;

                grid-template-columns:
                    repeat(3, 1fr);

                border-top:
                    1px solid var(--line);

                border-left:
                    1px solid var(--line);
            }


            .github-stat-v2 {
                position: relative;

                min-height: 160px;

                padding: 26px;

                display: flex;

                flex-direction: column;

                justify-content:
                    space-between;

                overflow: hidden;

                border-right:
                    1px solid var(--line);

                border-bottom:
                    1px solid var(--line);

                background:
                    var(--cream);

                transition:
                    background-color 0.3s ease,
                    transform 0.3s ease;
            }


            .github-stat-v2:hover {
                background:
                    var(--cream-dark);

                transform:
                    translateY(-3px);
            }


            .github-stat-decoration {
                position: absolute;

                right: -8px;
                bottom: -43px;

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


            .github-stat-label-v2 {
                position: relative;

                z-index: 2;

                font-size: 9px;

                font-weight: 700;

                text-transform: uppercase;

                letter-spacing: 1px;

                color:
                    var(--burgundy);
            }


            .github-stat-value-v2 {
                position: relative;

                z-index: 2;

                display: block;

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


            .github-stat-detail-v2 {
                position: relative;

                z-index: 2;

                margin-top: 8px;

                font-size: 9px;

                text-transform: uppercase;

                letter-spacing: 0.6px;

                color:
                    var(--text-soft);
            }


            /* =====================================
               FILTERS
            ===================================== */

            .github-filter-wrapper-v2 {
                padding: 22px 0 0;

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                gap: 25px;
            }


            .github-filter-wrapper-v2.is-hidden {
                display: none;
            }


            .github-filter-label-v2 {
                font-size: 9px;

                font-weight: 700;

                letter-spacing: 1px;

                text-transform: uppercase;

                color:
                    var(--text-soft);
            }


            .github-filters-v2 {
                display: flex;

                flex-wrap: wrap;

                justify-content: flex-end;

                gap: 7px;
            }


            .github-filter-v2 {
                padding:
                    7px 12px;

                border:
                    1px solid var(--line);

                border-radius:
                    100px;

                background:
                    transparent;

                color:
                    var(--text-soft);

                font-size: 9px;

                font-weight: 700;

                text-transform: uppercase;

                letter-spacing: 0.5px;

                cursor: pointer;

                transition:
                    color 0.25s ease,
                    background-color 0.25s ease,
                    border-color 0.25s ease,
                    transform 0.25s ease;
            }


            .github-filter-v2:hover {
                border-color:
                    var(--burgundy);

                color:
                    var(--burgundy);

                transform:
                    translateY(-2px);
            }


            .github-filter-v2.is-active {
                border-color:
                    var(--burgundy);

                background:
                    var(--burgundy);

                color:
                    var(--cream-light);
            }


            .github-filter-v2:focus-visible {
                outline:
                    2px solid var(--burgundy);

                outline-offset:
                    3px;
            }


            /* =====================================
               TECH INFO
            ===================================== */

            .github-tech-note-v2 {
                margin-top: 20px;

                padding-top: 15px;

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                gap: 20px;

                border-top:
                    1px solid var(--line);

                font-size: 9px;

                letter-spacing: 0.6px;

                text-transform: uppercase;

                color:
                    var(--text-soft);
            }


            .github-tech-note-v2 strong {
                color:
                    var(--burgundy);
            }


            .github-cache-badge-v2 {
                padding:
                    5px 10px;

                border:
                    1px solid var(--line);

                border-radius:
                    100px;

                white-space: nowrap;
            }


            /* =====================================
               CONTENT LAYOUT
            ===================================== */

            .github-content-layout-v2 {
                display: grid;

                grid-template-columns:
                    minmax(0, 0.9fr)
                    minmax(0, 1.1fr);

                gap: 22px;

                align-items: stretch;
            }


            .github-repositories-column-v2 {
                min-width: 0;
            }


            .github-column-heading-v2 {
                margin-bottom: 14px;

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                gap: 15px;
            }


            .github-column-heading-v2 p {
                font-size: 9px;

                font-weight: 700;

                letter-spacing: 1px;

                text-transform: uppercase;

                color:
                    var(--burgundy);
            }


            .github-column-heading-v2 span {
                font-size: 9px;

                text-transform: uppercase;

                color:
                    var(--text-soft);
            }


            /* =====================================
               REPOSITORY GRID OVERRIDE
            ===================================== */

            .github-content-layout-v2
            #github-repositories {
                display: grid;

                grid-template-columns:
                    1fr;

                gap: 0;
            }


            .github-content-layout-v2
            .github-card {
                min-height: 315px;

                margin-right: 0;
            }


            /* =====================================
               RECENT ACTIVITY
            ===================================== */

            .github-activity-panel-v2 {
                min-width: 0;

                border:
                    1px solid var(--line);

                background:
                    var(--cream-light);
            }


            .github-activity-header-v2 {
                min-height: 58px;

                padding:
                    17px 20px;

                display: flex;

                align-items: center;

                justify-content:
                    space-between;

                gap: 20px;

                border-bottom:
                    1px solid var(--line);
            }


            .github-activity-header-v2 p {
                font-size: 9px;

                font-weight: 700;

                letter-spacing: 1px;

                text-transform: uppercase;

                color:
                    var(--burgundy);
            }


            .github-activity-header-v2 span {
                font-size: 9px;

                text-transform: uppercase;

                color:
                    var(--text-soft);
            }


            .github-activity-list-v2 {
                display: flex;

                flex-direction: column;
            }


            .github-activity-item-v2 {
                position: relative;

                min-height: 88px;

                padding:
                    17px 20px;

                display: grid;

                grid-template-columns:
                    34px minmax(0, 1fr) auto;

                gap: 14px;

                align-items: start;

                border-bottom:
                    1px solid var(--line);

                transition:
                    background-color 0.25s ease;
            }


            .github-activity-item-v2:last-child {
                border-bottom: 0;
            }


            .github-activity-item-v2:hover {
                background:
                    var(--cream);
            }


            .github-activity-number-v2 {
                width: 26px;
                height: 26px;

                display: flex;

                align-items: center;

                justify-content: center;

                border:
                    1px solid var(--line);

                border-radius: 50%;

                font-size: 8px;

                font-weight: 700;

                color:
                    var(--burgundy);
            }


            .github-activity-content-v2 {
                min-width: 0;
            }


            .github-activity-message-v2 {
                margin-bottom: 5px;

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size: 17px;

                line-height: 1.25;

                color:
                    var(--text);

                overflow-wrap: anywhere;
            }


            .github-activity-meta-v2 {
                display: flex;

                flex-wrap: wrap;

                gap: 5px 12px;

                font-size: 8px;

                font-weight: 700;

                text-transform: uppercase;

                letter-spacing: 0.5px;

                color:
                    var(--text-soft);
            }


            .github-activity-meta-v2 strong {
                color:
                    var(--burgundy);
            }


            .github-activity-arrow-v2 {
                width: 20px;
                height: 20px;

                fill: none;

                stroke:
                    var(--burgundy);

                stroke-width: 1.7;

                transition:
                    transform 0.25s ease;
            }


            .github-activity-item-v2:hover
            .github-activity-arrow-v2 {
                transform:
                    translate(
                        2px,
                        -2px
                    );
            }


            /* =====================================
               EMPTY STATE
            ===================================== */

            .github-empty-v2 {
                min-height: 210px;

                padding: 35px;

                display: flex;

                align-items: center;

                justify-content: center;

                color:
                    var(--text-soft);

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size: 20px;

                text-align: center;
            }


            /* =====================================
               TABLET
            ===================================== */

            @media (
                max-width: 1024px
            ) {

                .github-content-layout-v2 {
                    grid-template-columns:
                        1fr;
                }


                .github-content-layout-v2
                #github-repositories {
                    grid-template-columns:
                        repeat(
                            2,
                            1fr
                        );
                }

            }


            /* =====================================
               MOBILE
            ===================================== */

            @media (
                max-width: 768px
            ) {

                .github-stats-v2 {
                    grid-template-columns:
                        1fr;
                }


                .github-stat-v2 {
                    min-height:
                        125px;
                }


                .github-filter-wrapper-v2 {
                    align-items:
                        flex-start;

                    flex-direction:
                        column;
                }


                .github-filters-v2 {
                    justify-content:
                        flex-start;
                }


                .github-tech-note-v2 {
                    align-items:
                        flex-start;

                    flex-direction:
                        column;
                }


                .github-content-layout-v2
                #github-repositories {
                    grid-template-columns:
                        1fr;
                }


                .github-activity-item-v2 {
                    grid-template-columns:
                        30px minmax(0, 1fr) 20px;

                    padding:
                        15px;
                }


                .github-activity-message-v2 {
                    font-size:
                        16px;
                }

            }

            `;


        document.head.appendChild(
            style
        );

    }



    // =========================================
    // HTML ESCAPING
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
    // DATE FORMATTING
    // =========================================

    function formatDate(
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
    // CACHE
    // =========================================

    function getCachedData() {

        try {

            const cached =
                localStorage.getItem(
                    CACHE_KEY
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
                CACHE_DURATION
            ) {

                localStorage.removeItem(
                    CACHE_KEY
                );


                return null;

            }


            if (
                !data.profile ||
                !Array.isArray(
                    data.repositories
                ) ||
                !Array.isArray(
                    data.commits
                )
            ) {
                return null;
            }


            return data;

        } catch (
            error
        ) {

            console.warn(
                "GitHub cache could not be read.",
                error
            );


            localStorage.removeItem(
                CACHE_KEY
            );


            return null;

        }

    }


    function cacheData(
        profile,
        repositoryData,
        commits
    ) {

        try {

            localStorage.setItem(
                CACHE_KEY,

                JSON.stringify({
                    timestamp:
                        Date.now(),

                    profile:
                        profile,

                    repositories:
                        repositoryData,

                    commits:
                        commits
                })
            );

        } catch (
            error
        ) {

            console.warn(
                "GitHub cache could not be saved.",
                error
            );

        }

    }



    // =========================================
    // API
    // =========================================

    async function requestGitHubData() {

        const cached =
            getCachedData();


        if (
            cached
        ) {

            return {
                profile:
                    cached.profile,

                repositories:
                    cached.repositories,

                commits:
                    cached.commits,

                source:
                    "cache"
            };

        }


        const options = {

            headers: {
                Accept:
                    "application/vnd.github+json"
            }

        };


        const [
            profileResponse,
            repositoryResponse,
            commitResponse
        ] =
            await Promise.all([

                fetch(
                    PROFILE_API,
                    options
                ),

                fetch(
                    REPOSITORIES_API,
                    options
                ),

                fetch(
                    COMMITS_API,
                    options
                )

            ]);


        if (
            !profileResponse.ok
        ) {

            throw new Error(
                `Profile API: ${profileResponse.status}`
            );

        }


        if (
            !repositoryResponse.ok
        ) {

            throw new Error(
                `Repositories API: ${repositoryResponse.status}`
            );

        }


        if (
            !commitResponse.ok
        ) {

            throw new Error(
                `Commits API: ${commitResponse.status}`
            );

        }


        const [
            profile,
            repositoryData,
            commits
        ] =
            await Promise.all([

                profileResponse.json(),

                repositoryResponse.json(),

                commitResponse.json()

            ]);


        cacheData(
            profile,
            repositoryData,
            commits
        );


        return {

            profile:
                profile,

            repositories:
                repositoryData,

            commits:
                commits,

            source:
                "api"

        };

    }



    // =========================================
    // REPOSITORIES
    // =========================================

    function prepareRepositories(
        repositoryData
    ) {

        return repositoryData
            .filter(
                repository =>
                    !repository.fork &&
                    !repository.archived
            )
            .sort(
                (
                    first,
                    second
                ) =>

                    new Date(
                        second.updated_at
                    ) -

                    new Date(
                        first.updated_at
                    )
            );

    }



    // =========================================
    // LANGUAGE STATISTICS
    // =========================================

    function getLanguages(
        repositoryData
    ) {

        const counts =
            {};


        repositoryData.forEach(
            repository => {

                if (
                    !repository.language
                ) {
                    return;
                }


                counts[
                    repository.language
                ] =
                    (
                        counts[
                            repository.language
                        ] ||
                        0
                    ) +
                    1;

            }
        );


        return Object
            .entries(
                counts
            )
            .sort(
                (
                    first,
                    second
                ) =>
                    second[1] -
                    first[1]
            );

    }



    // =========================================
    // DASHBOARD STRUCTURE
    // =========================================

    function createDashboard() {

        const githubInner =
            document.querySelector(
                "#github .github-inner"
            );


        const githubStatus =
            document.querySelector(
                "#github-status"
            );


        const repositoryGrid =
            document.querySelector(
                "#github-repositories"
            );


        if (
            !githubInner ||
            !githubStatus ||
            !repositoryGrid
        ) {
            return;
        }


        if (
            document.querySelector(
                "#github-dashboard-v2"
            )
        ) {
            return;
        }


        const dashboard =
            document.createElement(
                "div"
            );


        dashboard.id =
            "github-dashboard-v2";


        dashboard.className =
            "github-dashboard-v2";


        dashboard.innerHTML =
            `

            <div
                class="github-stats-v2"
                aria-label="GitHub Statistiken"
            >

                <article class="github-stat-v2">

                    <span class="github-stat-decoration">
                        01
                    </span>

                    <span class="github-stat-label-v2">
                        Repositories
                    </span>

                    <div>

                        <strong
                            class="github-stat-value-v2"
                            id="github-repository-count"
                        >
                            —
                        </strong>

                        <p class="github-stat-detail-v2">
                            Public repositories
                        </p>

                    </div>

                </article>


                <article class="github-stat-v2">

                    <span class="github-stat-decoration">
                        02
                    </span>

                    <span class="github-stat-label-v2">
                        Languages
                    </span>

                    <div>

                        <strong
                            class="github-stat-value-v2"
                            id="github-language-count"
                        >
                            —
                        </strong>

                        <p
                            class="github-stat-detail-v2"
                            id="github-language-summary"
                        >
                            Technologies detected
                        </p>

                    </div>

                </article>


                <article class="github-stat-v2">

                    <span class="github-stat-decoration">
                        03
                    </span>

                    <span class="github-stat-label-v2">
                        Last Activity
                    </span>

                    <div>

                        <strong
                            class="github-stat-value-v2"
                            id="github-last-activity"
                        >
                            —
                        </strong>

                        <p class="github-stat-detail-v2">
                            Latest repository update
                        </p>

                    </div>

                </article>

            </div>


            <div
                class="github-filter-wrapper-v2"
                id="github-filter-wrapper-v2"
            >

                <p class="github-filter-label-v2">
                    Filter by language
                </p>


                <div
                    class="github-filters-v2"
                    id="github-filters-v2"
                    role="group"
                    aria-label="Repositories nach Sprache filtern"
                ></div>

            </div>


            <div class="github-tech-note-v2">

                <p>
                    Live data via
                    <strong>
                        GitHub REST API
                    </strong>
                    · Profile + repositories + commits
                </p>


                <span class="github-cache-badge-v2">
                    LocalStorage cache · 30 min
                </span>

            </div>

            `;


        githubInner.insertBefore(
            dashboard,
            githubStatus
        );


        const layout =
            document.createElement(
                "div"
            );


        layout.id =
            "github-content-layout-v2";


        layout.className =
            "github-content-layout-v2";


        const repositoryColumn =
            document.createElement(
                "div"
            );


        repositoryColumn.className =
            "github-repositories-column-v2";


        repositoryColumn.innerHTML =
            `

            <div class="github-column-heading-v2">

                <p>
                    Repositories
                </p>

                <span id="github-visible-repository-count">
                    —
                </span>

            </div>

            `;


        repositoryGrid
            .parentNode
            .insertBefore(
                layout,
                repositoryGrid
            );


        layout.appendChild(
            repositoryColumn
        );


        repositoryColumn.appendChild(
            repositoryGrid
        );


        const activityPanel =
            document.createElement(
                "aside"
            );


        activityPanel.className =
            "github-activity-panel-v2";


        activityPanel.innerHTML =
            `

            <div class="github-activity-header-v2">

                <p>
                    Recent Activity
                </p>

                <span>
                    ${escapeHTML(
                        ACTIVITY_REPOSITORY
                    )}
                </span>

            </div>


            <div
                class="github-activity-list-v2"
                id="github-activity-list-v2"
            ></div>

            `;


        layout.appendChild(
            activityPanel
        );

    }



    // =========================================
    // STATISTICS
    // =========================================

    function renderStatistics(
        profile,
        repositoryData
    ) {

        const repositoryCount =
            document.querySelector(
                "#github-repository-count"
            );


        const languageCount =
            document.querySelector(
                "#github-language-count"
            );


        const languageSummary =
            document.querySelector(
                "#github-language-summary"
            );


        const lastActivity =
            document.querySelector(
                "#github-last-activity"
            );


        const languages =
            getLanguages(
                repositoryData
            );


        const latestRepository =
            repositoryData[0];


        if (
            repositoryCount
        ) {

            repositoryCount.textContent =
                profile.public_repos ??
                repositoryData.length;

        }


        if (
            languageCount
        ) {

            languageCount.textContent =
                languages.length;

        }


        if (
            languageSummary
        ) {

            languageSummary.textContent =
                languages.length

                    ?

                    languages
                        .slice(
                            0,
                            3
                        )
                        .map(
                            item =>
                                item[0]
                        )
                        .join(
                            " · "
                        )

                    :

                    "No language data";

        }


        if (
            lastActivity
        ) {

            lastActivity.textContent =
                latestRepository

                    ?

                    formatDate(
                        latestRepository.updated_at
                    )

                    :

                    "—";

        }

    }



    // =========================================
    // FILTERS
    // =========================================

    function renderFilters() {

        const wrapper =
            document.querySelector(
                "#github-filter-wrapper-v2"
            );


        const container =
            document.querySelector(
                "#github-filters-v2"
            );


        if (
            !wrapper ||
            !container
        ) {
            return;
        }


        const languages =
            getLanguages(
                repositories
            );


        /*
         * Wenn nur eine Sprache vorhanden ist,
         * macht ein Filter für den Besucher
         * keinen wirklichen Sinn.
         */

        if (
            languages.length <=
            1
        ) {

            wrapper.classList.add(
                "is-hidden"
            );


            activeFilter =
                DEFAULT_FILTER;


            return;

        }


        wrapper.classList.remove(
            "is-hidden"
        );


        const options = [

            DEFAULT_FILTER,

            ...languages.map(
                language =>
                    language[0]
            )

        ];


        container.innerHTML =
            options
                .map(
                    language => {

                        const active =
                            language ===
                            activeFilter;


                        return `

                            <button
                                type="button"
                                class="
                                    github-filter-v2
                                    ${
                                        active
                                            ?
                                            "is-active"
                                            :
                                            ""
                                    }
                                "
                                data-language="${escapeHTML(
                                    language
                                )}"
                                aria-pressed="${
                                    active
                                        ?
                                        "true"
                                        :
                                        "false"
                                }"
                            >
                                ${escapeHTML(
                                    language
                                )}
                            </button>

                        `;

                    }
                )
                .join("");

    }



    // =========================================
    // REPOSITORY CARD
    // =========================================

    function createRepositoryCard(
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
                        Updated
                        ${formatDate(
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



    // =========================================
    // RENDER REPOSITORIES
    // =========================================

    function renderRepositories() {

        const container =
            document.querySelector(
                "#github-repositories"
            );


        const count =
            document.querySelector(
                "#github-visible-repository-count"
            );


        if (
            !container
        ) {
            return;
        }


        const filtered =
            activeFilter ===
            DEFAULT_FILTER

                ?

                repositories

                :

                repositories.filter(
                    repository =>
                        repository.language ===
                        activeFilter
                );


        const visible =
            filtered.slice(
                0,
                MAX_REPOSITORIES
            );


        if (
            count
        ) {

            count.textContent =
                `${filtered.length} ${
                    filtered.length ===
                    1
                        ?
                        "repository"
                        :
                        "repositories"
                }`;

        }


        if (
            !visible.length
        ) {

            container.innerHTML =
                `

                <div class="github-empty-v2">
                    Keine Repositories für
                    diesen Filter vorhanden.
                </div>

                `;


            return;

        }


        container.innerHTML =
            visible
                .map(
                    (
                        repository,
                        index
                    ) =>
                        createRepositoryCard(
                            repository,
                            index
                        )
                )
                .join("");

    }



    // =========================================
    // COMMIT MESSAGE
    // =========================================

    function getCommitMessage(
        commit
    ) {

        const message =
            commit?.commit?.message ||
            "Repository update";


        /*
         * Git Commit Messages können mehrere
         * Zeilen enthalten.
         *
         * Für die Karte verwenden wir nur
         * die erste Zeile.
         */

        return message
            .split(
                "\n"
            )[0]
            .trim();

    }



    // =========================================
    // COMMIT DATE
    // =========================================

    function getCommitDate(
        commit
    ) {

        return (
            commit?.commit
                ?.author
                ?.date
            ||
            commit?.commit
                ?.committer
                ?.date
            ||
            null
        );

    }



    // =========================================
    // ACTIVITY
    // =========================================

    function renderActivity(
        commits
    ) {

        const container =
            document.querySelector(
                "#github-activity-list-v2"
            );


        if (
            !container
        ) {
            return;
        }


        const visibleCommits =
            commits.slice(
                0,
                MAX_COMMITS
            );


        if (
            !visibleCommits.length
        ) {

            container.innerHTML =
                `

                <div class="github-empty-v2">
                    Aktuell sind keine
                    Commit-Daten verfügbar.
                </div>

                `;


            return;

        }


        container.innerHTML =
            visibleCommits
                .map(
                    (
                        commit,
                        index
                    ) => {

                        const number =
                            String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            );


                        const message =
                            getCommitMessage(
                                commit
                            );


                        const date =
                            formatDate(
                                getCommitDate(
                                    commit
                                )
                            );


                        const shortSha =
                            commit.sha

                                ?

                                commit.sha
                                    .slice(
                                        0,
                                        7
                                    )

                                :

                                "—";


                        return `

                            <a
                                href="${escapeHTML(
                                    commit.html_url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="github-activity-item-v2"
                                data-cursor="OPEN"
                            >

                                <span class="github-activity-number-v2">
                                    ${number}
                                </span>


                                <div class="github-activity-content-v2">

                                    <p class="github-activity-message-v2">
                                        ${escapeHTML(
                                            message
                                        )}
                                    </p>


                                    <div class="github-activity-meta-v2">

                                        <span>
                                            ${date}
                                        </span>


                                        <span>
                                            Commit
                                            <strong>
                                                ${escapeHTML(
                                                    shortSha
                                                )}
                                            </strong>
                                        </span>

                                    </div>

                                </div>


                                <svg
                                    class="github-activity-arrow-v2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M5 19 L19 5"></path>

                                    <path d="M10 5 H19 V14"></path>
                                </svg>

                            </a>

                        `;

                    }
                )
                .join("");

    }



    // =========================================
    // FILTER EVENTS
    // =========================================

    function initialiseFilters() {

        const container =
            document.querySelector(
                "#github-filters-v2"
            );


        if (
            !container
        ) {
            return;
        }


        if (
            container.dataset.initialised ===
            "true"
        ) {
            return;
        }


        container.dataset.initialised =
            "true";


        container.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-language]"
                    );


                if (
                    !button
                ) {
                    return;
                }


                activeFilter =
                    button.dataset.language;


                document
                    .querySelectorAll(
                        ".github-filter-v2"
                    )
                    .forEach(
                        filterButton => {

                            const active =
                                filterButton.dataset.language ===
                                activeFilter;


                            filterButton
                                .classList
                                .toggle(
                                    "is-active",
                                    active
                                );


                            filterButton
                                .setAttribute(
                                    "aria-pressed",
                                    String(
                                        active
                                    )
                                );

                        }
                    );


                renderRepositories();

            }
        );

    }



    // =========================================
    // STATUS
    // =========================================

    function updateStatus(
        text
    ) {

        const status =
            document.querySelector(
                "#github-status"
            );


        if (
            status
        ) {

            status.textContent =
                text;

        }

    }



    // =========================================
    // INITIALISE
    // =========================================

    async function loadEnhancedGitHubDashboard() {

        if (
            requestPromise
        ) {

            return requestPromise;

        }


        requestPromise =
            (async () => {

                injectStyles();


                createDashboard();


                updateStatus(
                    "GitHub Daten werden geladen..."
                );


                try {

                    const data =
                        await requestGitHubData();


                    repositories =
                        prepareRepositories(
                            data.repositories
                        );


                    renderStatistics(
                        data.profile,
                        repositories
                    );


                    renderFilters();


                    initialiseFilters();


                    renderRepositories();


                    renderActivity(
                        data.commits
                    );


                    updateStatus(

                        data.source ===
                        "cache"

                            ?

                            "Profil, Repositories und Commit-Aktivität aus lokalem Cache geladen"

                            :

                            "Profil, Repositories und Commit-Aktivität über GitHub API aktualisiert"

                    );


                } catch (
                    error
                ) {

                    console.error(
                        "GitHub dashboard error:",
                        error
                    );


                    updateStatus(
                        "GitHub Daten konnten momentan nicht geladen werden"
                    );


                    const repositoryContainer =
                        document.querySelector(
                            "#github-repositories"
                        );


                    const activityContainer =
                        document.querySelector(
                            "#github-activity-list-v2"
                        );


                    if (
                        repositoryContainer
                    ) {

                        repositoryContainer.innerHTML =
                            `

                            <div class="github-empty-v2">
                                Repository-Daten sind
                                momentan nicht verfügbar.
                            </div>

                            `;

                    }


                    if (
                        activityContainer
                    ) {

                        activityContainer.innerHTML =
                            `

                            <div class="github-empty-v2">
                                Commit-Aktivität ist
                                momentan nicht verfügbar.
                            </div>

                            `;

                    }

                }

            })();


        return requestPromise;

    }



    // =========================================
    // REPLACE EXISTING GITHUB LOADER
    // =========================================

    /*
     * script.js besitzt bereits eine Funktion
     * namens loadGitHubRepositories().
     *
     * Da github-enhancements.js nach script.js
     * geladen wird, ersetzen wir diese Funktion
     * durch die erweiterte Version.
     */

    window.loadGitHubRepositories =
        loadEnhancedGitHubDashboard;



    // =========================================
    // FALLBACK START
    // =========================================

    function start() {

        loadEnhancedGitHubDashboard();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start,
            {
                once:
                    true
            }
        );

    } else {

        start();

    }

})();
