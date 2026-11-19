# Agnesa Portfolio

Persönliche Portfolio-Website von **Agnesa Pajaziti**, entwickelt im Rahmen des Moduls **Web Engineering** an der Berner Fachhochschule (BFH).

Die Website dient als digitale Visitenkarte und verbindet persönliche Informationen, ausgewählte Projekte, technische Kompetenzen und dynamische GitHub-Daten in einer modernen und responsiven Webanwendung.

## Live Website

https://agnesa22.github.io/portfolio-page/

## Über das Projekt

Das Portfolio wurde als persönliche Webpräsenz entwickelt und zeigt ausgewählte Projekte und Erfahrungen aus dem Bereich Wirtschaftsinformatik.

Der Fokus liegt auf der Verbindung von Business und Technologie sowie auf einer modernen, benutzerfreundlichen und responsiven Darstellung.

Neben statischen Inhalten beinhaltet die Website verschiedene dynamische und interaktive Funktionen. Dazu gehören unter anderem eine GitHub REST API Integration, dynamische Projektdarstellungen, Projekt-Modals, Formularvalidierung sowie Funktionen zur Verbesserung der Barrierefreiheit.

Die Website wurde mit HTML, CSS und JavaScript umgesetzt und über GitHub Pages veröffentlicht.

## Inhalte

Die Portfolio-Website beinhaltet:

- persönliche Kurzvorstellung und Biography
- aktuelle Berufserfahrung und Studium
- Skills und Kompetenzen
- ausgewählte Projekte
- interaktive Projekt-Detailansichten
- dynamisch geladene GitHub-Daten
- aktuelle GitHub Commit-Aktivitäten
- Kontaktformular mit Validierung
- responsive Navigation
- Accessibility-Optimierungen
- Download beziehungsweise Anzeige des Lebenslaufs

## Projekte

### CasaSierra

Konzeption und Entwicklung einer modernen Website für ein Immobilien- und Treuhandunternehmen.

Das Projekt beinhaltet die Gestaltung und technische Umsetzung einer übersichtlichen und benutzerfreundlichen Webpräsenz.

**Technologien:**

HTML, CSS, JavaScript

### FairFlat

Entwicklung eines UX/UI-Konzepts für eine App zur Organisation des Zusammenlebens in Wohngemeinschaften.

Der Fokus lag auf User Experience, Strukturierung der Benutzerführung und der Entwicklung eines interaktiven Prototyps.

**Tools und Methoden:**

Figma, UX Research, Prototyping

## Technische Funktionen

Die Website beinhaltet verschiedene technische und interaktive Funktionen.

### Dynamische Projektdarstellung

Die Projektdaten werden mit JavaScript verarbeitet und dynamisch im DOM dargestellt.

Projektinformationen werden in einer strukturierten Datenbasis innerhalb des JavaScript-Codes verwaltet und zur Laufzeit in die Benutzeroberfläche integriert.

### Projekt-Modals

Für die ausgewählten Projekte stehen interaktive Detailansichten zur Verfügung.

Die Modal-Fenster zeigen zusätzliche Informationen zu:

- Ausgangslage
- Umsetzung
- Ergebnis
- eingesetzten Technologien

Die Modals unterstützen zusätzlich Tastatursteuerung und Escape-Navigation.

### GitHub REST API

Die Portfolio-Seite verwendet die öffentliche GitHub REST API, um aktuelle GitHub-Daten dynamisch abzurufen.

Dabei werden mehrere Datenquellen kombiniert:

- GitHub-Profil
- öffentliche Repositories
- aktuelle Commits

Die Daten werden dynamisch verarbeitet und in einem eigenen GitHub Activity Dashboard dargestellt.

### GitHub Activity Dashboard

Das GitHub Dashboard zeigt unter anderem:

- Anzahl öffentlicher Repositories
- verwendete Hauptsprache
- Datum der letzten GitHub-Aktivität
- öffentliches Repository
- aktuelle Commit-Aktivitäten
- direkte Links zu einzelnen GitHub Commits

Dadurch werden aktuelle Entwicklungsaktivitäten automatisch auf der Portfolio-Seite dargestellt.

### LocalStorage Cache

GitHub API-Daten werden temporär im LocalStorage des Browsers gespeichert.

Dadurch werden unnötige API-Anfragen reduziert und bereits geladene Daten können effizient wiederverwendet werden.

Der Cache wird automatisch nach einer definierten Zeit aktualisiert.

### API-Fehlerbehandlung

Für GitHub API-Anfragen wurde eine Fehlerbehandlung implementiert.

Falls Daten nicht geladen werden können, werden entsprechende Statusmeldungen auf der Website angezeigt.

### Kontaktformular

Das Kontaktformular beinhaltet eine clientseitige Formularvalidierung.

Überprüft werden:

- Name
- E-Mail-Adresse
- Nachricht

Zusätzlich beinhaltet das Formular einen Live-Zeichenzähler.

Bei erfolgreicher Validierung wird eine vorbereitete E-Mail mit den eingegebenen Informationen erstellt.

## Accessibility

Die Website beinhaltet verschiedene Funktionen zur Verbesserung der Barrierefreiheit.

Dazu gehören:

- sichtbare Tastatur-Fokuszustände
- Navigation mit der Tab-Taste
- Skip-Link zum direkten Springen zum Hauptinhalt
- Fokusmanagement innerhalb der Navigation
- Fokusmanagement innerhalb der Projekt-Modals
- Escape-Steuerung
- ARIA-Attribute
- Screenreader-Unterstützung bei Formularfehlern
- Kennzeichnung ungültiger Formularfelder

Dadurch können zentrale Funktionen der Website auch ohne Maus bedient werden.

## Responsive Design

Die Website wurde für unterschiedliche Bildschirmgrössen optimiert.

Unterstützt werden:

- Desktop
- Tablet
- Smartphone

Für das responsive Layout werden unter anderem folgende CSS-Techniken eingesetzt:

- CSS Grid
- Flexbox
- Media Queries
- flexible Grössen
- responsive Typografie
- flexible Layout-Strukturen

Die Darstellung wurde auf unterschiedlichen Bildschirmbreiten überprüft, damit keine zentralen Inhalte abgeschnitten werden oder horizontale Scrollprobleme entstehen.

## Code-Struktur

Das Projekt ist modular aufgebaut.

### `index.html`

Enthält die semantische Grundstruktur und sämtliche Hauptbereiche der Website.

### `style.css`

Enthält das visuelle Design, Layouts, Animationen sowie responsive Anpassungen.

### `script.js`

Beinhaltet die zentralen Funktionen der Website, beispielsweise:

- dynamische Projektdarstellung
- Projekt-Modals
- Navigation
- Kontaktformular
- Animationen
- Custom Cursor

### `github-enhancements.js`

Eigenständiges Modul für die erweiterte GitHub-Integration.

Beinhaltet unter anderem:

- GitHub Profile API
- GitHub Repository API
- GitHub Commits API
- Datenkombination
- Caching
- Statistiken
- Recent Activity

### `accessibility-enhancements.js`

Eigenständiges Modul für zusätzliche Accessibility-Funktionen.

Beinhaltet unter anderem:

- Skip Navigation
- Keyboard Focus
- Menü-Fokussteuerung
- Modal-Fokussteuerung
- ARIA-Erweiterungen
- zugänglichere Formularvalidierung

## Technologien

**Frontend**

HTML5  
CSS3  
JavaScript

**Layout & Design**

CSS Grid  
Flexbox  
Responsive Design  
Media Queries

**APIs & Daten**

GitHub REST API  
LocalStorage

**Tools**

GitHub  
GitHub Pages  
Figma

## Projektstruktur

```text
portfolio-page/
│
├── index.html
├── style.css
├── script.js
├── github-enhancements.js
├── accessibility-enhancements.js
├── README.md
├── CV.pdf
├── Pajaziti_Agnesa_paz_10922_bea.jpg
├── casasierra-preview.png
└── fairflat-preview.png
