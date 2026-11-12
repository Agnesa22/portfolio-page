(() => {

    // =========================================
    // ACCESSIBILITY ENHANCEMENTS
    // =========================================
    //
    // Ergänzt die bestehende Portfolio-Seite um:
    //
    // - Skip Link
    // - sichtbare Tastatur-Fokuszustände
    // - Fokussteuerung im Menü
    // - Fokus-Falle im Projekt-Modal
    // - verbesserte ARIA-Attribute
    // - zugänglichere Formularvalidierung
    //
    // Die bestehenden Funktionen aus script.js
    // werden nicht ersetzt.
    // =========================================


    // =========================================
    // ACCESSIBILITY STYLES
    // =========================================

    function injectAccessibilityStyles() {

        if (
            document.querySelector(
                "#accessibility-enhancement-styles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "accessibility-enhancement-styles";


        style.textContent =
            `

            /* =====================================
               SKIP LINK
            ===================================== */

            .skip-link {
                position: fixed;

                top: 14px;
                left: 14px;

                z-index: 10000;

                padding:
                    10px 15px;

                border:
                    2px solid
                    var(--burgundy);

                border-radius:
                    100px;

                background:
                    var(--cream-light);

                color:
                    var(--burgundy);

                font-size:
                    11px;

                font-weight:
                    700;

                letter-spacing:
                    0.6px;

                text-transform:
                    uppercase;

                transform:
                    translateY(-180%);

                transition:
                    transform 0.2s ease;
            }


            .skip-link:focus {
                transform:
                    translateY(0);
            }


            /* =====================================
               KEYBOARD FOCUS
            ===================================== */

            a:focus-visible,
            button:focus-visible,
            input:focus-visible,
            textarea:focus-visible,
            [tabindex]:focus-visible {
                outline:
                    2px solid
                    var(--burgundy);

                outline-offset:
                    4px;
            }


            .current-work
            a:focus-visible,
            .current-work
            button:focus-visible,
            .skills-section
            a:focus-visible,
            .skills-section
            button:focus-visible,
            .contact-section
            a:focus-visible,
            .contact-section
            button:focus-visible,
            .contact-section
            input:focus-visible,
            .contact-section
            textarea:focus-visible {
                outline-color:
                    var(--cream-light);
            }


            /* =====================================
               FORM VALIDATION
            ===================================== */

            .form-group
            input[aria-invalid="true"],
            .form-group
            textarea[aria-invalid="true"] {
                box-shadow:
                    inset 0 -2px 0
                    #ffb2b2;
            }


            .form-group
            input[aria-invalid="true"]:focus-visible,
            .form-group
            textarea[aria-invalid="true"]:focus-visible {
                outline-color:
                    #ffb2b2;
            }


            /* =====================================
               MAIN TARGET
            ===================================== */

            #main-content:focus {
                outline: none;
            }

            `;


        document.head.appendChild(
            style
        );

    }



    // =========================================
    // SKIP LINK
    // =========================================

    function initialiseSkipLink() {

        const main =
            document.querySelector(
                "main"
            );


        if (
            !main
        ) {
            return;
        }


        main.id =
            main.id ||
            "main-content";


        main.setAttribute(
            "tabindex",
            "-1"
        );


        if (
            document.querySelector(
                ".skip-link"
            )
        ) {
            return;
        }


        const skipLink =
            document.createElement(
                "a"
            );


        skipLink.href =
            `#${main.id}`;


        skipLink.className =
            "skip-link";


        skipLink.textContent =
            "Zum Inhalt springen";


        skipLink.addEventListener(
            "click",
            () => {

                window.setTimeout(
                    () => {

                        main.focus({
                            preventScroll:
                                true
                        });

                    },
                    50
                );

            }
        );


        document.body.insertBefore(
            skipLink,
            document.body.firstChild
        );

    }



    // =========================================
    // NAVIGATION ACCESSIBILITY
    // =========================================

    function initialiseAccessibleNavigation() {

        const menuButton =
            document.querySelector(
                ".menu-toggle"
            );


        const navigation =
            document.querySelector(
                "#main-navigation"
            );


        if (
            !menuButton ||
            !navigation
        ) {
            return;
        }


        const navbar =
            document.querySelector(
                ".navbar"
            );


        if (
            navbar
        ) {

            navbar.setAttribute(
                "aria-label",
                "Hauptnavigation"
            );

        }


        function getNavigationLinks() {

            return Array.from(
                navigation.querySelectorAll(
                    "a[href]"
                )
            );

        }


        function isMenuOpen() {

            return navigation
                .classList
                .contains(
                    "is-open"
                );

        }


        function updateMenuAccessibility() {

            const open =
                isMenuOpen();


            menuButton.setAttribute(
                "aria-label",
                open
                    ?
                    "Navigation schliessen"
                    :
                    "Navigation öffnen"
            );


            navigation.setAttribute(
                "aria-hidden",
                String(
                    !open
                )
            );


            if (
                open
            ) {

                const links =
                    getNavigationLinks();


                if (
                    links.length
                ) {

                    window.setTimeout(
                        () => {

                            links[0].focus();

                        },
                        120
                    );

                }

            }

        }


        menuButton.addEventListener(
            "click",
            () => {

                window.setTimeout(
                    updateMenuAccessibility,
                    20
                );

            }
        );


        navigation
            .querySelectorAll(
                "a"
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            menuButton.setAttribute(
                                "aria-label",
                                "Navigation öffnen"
                            );


                            navigation.setAttribute(
                                "aria-hidden",
                                "true"
                            );

                        }
                    );

                }
            );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    !isMenuOpen()
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    window.setTimeout(
                        () => {

                            menuButton.focus();

                            menuButton.setAttribute(
                                "aria-label",
                                "Navigation öffnen"
                            );


                            navigation.setAttribute(
                                "aria-hidden",
                                "true"
                            );

                        },
                        30
                    );


                    return;

                }


                if (
                    event.key !==
                    "Tab"
                ) {
                    return;
                }


                const links =
                    getNavigationLinks();


                const focusableItems = [
                    menuButton,
                    ...links
                ];


                const firstItem =
                    focusableItems[0];


                const lastItem =
                    focusableItems[
                        focusableItems.length -
                        1
                    ];


                if (
                    event.shiftKey &&
                    document.activeElement ===
                    firstItem
                ) {

                    event.preventDefault();

                    lastItem.focus();

                } else if (
                    !event.shiftKey &&
                    document.activeElement ===
                    lastItem
                ) {

                    event.preventDefault();

                    firstItem.focus();

                }

            }
        );


        navigation.setAttribute(
            "aria-hidden",
            "true"
        );

    }



    // =========================================
    // MODAL ACCESSIBILITY
    // =========================================

    function initialiseAccessibleModal() {

        const modal =
            document.querySelector(
                "#project-modal"
            );


        const dialog =
            modal?.querySelector(
                ".project-modal-dialog"
            );


        if (
            !modal ||
            !dialog
        ) {
            return;
        }


        dialog.setAttribute(
            "aria-describedby",
            "modal-project-description"
        );


        function modalIsOpen() {

            return modal
                .classList
                .contains(
                    "is-open"
                );

        }


        function getFocusableElements() {

            return Array.from(
                dialog.querySelectorAll(
                    `
                    a[href],
                    button:not([disabled]),
                    input:not([disabled]),
                    textarea:not([disabled]),
                    select:not([disabled]),
                    [tabindex]:not([tabindex="-1"])
                    `
                )
            ).filter(
                element =>
                    element.offsetParent !==
                    null
            );

        }


        document.addEventListener(
            "keydown",
            event => {

                if (
                    !modalIsOpen() ||
                    event.key !==
                    "Tab"
                ) {
                    return;
                }


                const focusableElements =
                    getFocusableElements();


                if (
                    !focusableElements.length
                ) {
                    return;
                }


                const firstElement =
                    focusableElements[0];


                const lastElement =
                    focusableElements[
                        focusableElements.length -
                        1
                    ];


                if (
                    event.shiftKey &&
                    document.activeElement ===
                    firstElement
                ) {

                    event.preventDefault();

                    lastElement.focus();

                } else if (
                    !event.shiftKey &&
                    document.activeElement ===
                    lastElement
                ) {

                    event.preventDefault();

                    firstElement.focus();

                }

            }
        );

    }



    // =========================================
    // FORM ACCESSIBILITY
    // =========================================

    function initialiseAccessibleForm() {

        const form =
            document.querySelector(
                "#contact-form"
            );


        if (
            !form
        ) {
            return;
        }


        const fields = [

            {
                input:
                    document.querySelector(
                        "#contact-name"
                    ),

                error:
                    document.querySelector(
                        "#name-error"
                    )
            },


            {
                input:
                    document.querySelector(
                        "#contact-email"
                    ),

                error:
                    document.querySelector(
                        "#email-error"
                    )
            },


            {
                input:
                    document.querySelector(
                        "#contact-message"
                    ),

                error:
                    document.querySelector(
                        "#message-error"
                    )
            }

        ];


        fields.forEach(
            field => {

                if (
                    !field.input ||
                    !field.error
                ) {
                    return;
                }


                field.input.setAttribute(
                    "aria-describedby",
                    field.error.id
                );


                field.input.setAttribute(
                    "aria-invalid",
                    "false"
                );


                field.error.setAttribute(
                    "aria-live",
                    "polite"
                );


                field.error.setAttribute(
                    "role",
                    "status"
                );


                field.input.addEventListener(
                    "input",
                    () => {

                        if (
                            field.error
                                .textContent
                                .trim() ===
                            ""
                        ) {

                            field.input
                                .setAttribute(
                                    "aria-invalid",
                                    "false"
                                );

                        }

                    }
                );

            }
        );


        form.addEventListener(
            "submit",
            () => {

                /*
                 * Die bestehende Validierung aus
                 * script.js läuft zuerst.
                 *
                 * Danach lesen wir deren
                 * Fehlermeldungen aus.
                 */

                window.setTimeout(
                    () => {

                        let firstInvalidField =
                            null;


                        fields.forEach(
                            field => {

                                if (
                                    !field.input ||
                                    !field.error
                                ) {
                                    return;
                                }


                                const hasError =
                                    field.error
                                        .textContent
                                        .trim()
                                        .length >
                                    0;


                                field.input
                                    .setAttribute(
                                        "aria-invalid",
                                        String(
                                            hasError
                                        )
                                    );


                                if (
                                    hasError &&
                                    !firstInvalidField
                                ) {

                                    firstInvalidField =
                                        field.input;

                                }

                            }
                        );


                        if (
                            firstInvalidField
                        ) {

                            firstInvalidField.focus();

                        }

                    },
                    0
                );

            }
        );

    }



    // =========================================
    // EXTERNAL LINKS
    // =========================================

    function initialiseExternalLinkLabels() {

        const externalLinks =
            document.querySelectorAll(
                'a[target="_blank"]'
            );


        externalLinks.forEach(
            link => {

                const existingLabel =
                    link.getAttribute(
                        "aria-label"
                    );


                if (
                    existingLabel
                ) {
                    return;
                }


                const visibleText =
                    link.textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                if (
                    !visibleText
                ) {
                    return;
                }


                link.setAttribute(
                    "aria-label",
                    `${visibleText} – öffnet in einem neuen Tab`
                );

            }
        );

    }



    // =========================================
    // INITIALISATION
    // =========================================

    function initialiseAccessibility() {

        injectAccessibilityStyles();

        initialiseSkipLink();

        initialiseAccessibleNavigation();

        initialiseAccessibleModal();

        initialiseAccessibleForm();

        initialiseExternalLinkLabels();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseAccessibility,
            {
                once:
                    true
            }
        );

    } else {

        initialiseAccessibility();

    }

})();
