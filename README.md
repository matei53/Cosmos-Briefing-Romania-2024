# Cosmos Briefing Romania 2024

A multi-page static website for **Cosmos Briefing Romania 2024 (CBR24)**, a fictional one-day conference on astronomy and space science held in Bucharest. It was built with plain HTML, CSS and JavaScript as the project for the *Tehnici Web* (Web Techniques) course.

The site's content is in Romanian.

> **This event is fictional.** The speakers, schedule, contact details and the event's history are all made up. Real organizations (ESA, NASA, JAXA, CSA and the sponsors in the footer) appear only as part of the scenario. The project is not affiliated with or endorsed by them, and their names and logos belong to their owners.

## The event

- **Date:** 26 June 2024, 09:00–18:30
- **Venue:** International Conference Centre of the Chamber of Deputies, Palace of the Parliament, Bucharest
- **Organizer (in the story):** the European Space Agency, with NASA, JAXA and CSA as partners

Keynote speakers:

| Speaker | Role | Talk |
|---|---|---|
| Dr. Elena Văleanu | Romanian astrophysicist at ESA | Recent discoveries about exoplanets and extraterrestrial life |
| Dr. Michael Harrington | Research director, NASA | Humanity on Mars: reality or fantasy? |
| Prof. Akira Nakamura | Cosmologist, University of Tokyo | Dark energy and the expansion of the universe |
| Laura McAllister | Space engineer, SpaceX | Revolutionary technologies for lunar exploration |

The day also includes an interactive 3D "Map of the Universe" exhibit, a panel on international collaboration in space exploration, a VR walk on the surface of Mars, and a closing Q&A with all the guests.

## Pages

| Page | File | Contents |
|---|---|---|
| Home (*Acasă*) | `acasa.html` | Event description, speakers, highlights, promo video, login/welcome banner |
| About (*Despre*) | `despre.html` | History of Cosmos Briefing, ESA, and the partner agencies |
| Schedule (*Program*) | `program.html` | The full day's schedule, 10 sessions |
| Contact | `contact.html` | FAQ, contact details, map, and a question form |
| Login | `login.html` | Sign in, sign up, account settings, log out |

There is no `index.html`. The home page is `acasa.html`.

## Features

- **Rotating taglines.** Every page loads `subtitles.json` and shows a random tagline under the title, fading to a new one every 10 seconds.
- **Accounts stored in the browser.** On `login.html`, visitors can register, log in, change their username, email or password, and log out. Rules:
  - Passwords need at least 5 characters, including a lowercase letter, an uppercase letter, a digit and one of `? ! $ % & # @`.
  - Usernames must be shorter than 16 characters.
  - Usernames and emails must be unique.
- **Personalized home page.** Logged-in users see a "Bine ai venit, *name*!" banner. Visitors who aren't logged in see a link to the login page instead. The banner's border changes color every second.
- **Question form for members only.** On the Contact page, the form is read-only until you log in. Clicking a field shows a popup that links to the login page. Questions from logged-in users are saved in the browser.
- **Canvas and SVG graphics.** The About page draws CBR and ESA badges on `<canvas>`, and pressing any key recolors their outlines. Inline SVG constellations decorate the page.
- **Responsive layout.** The pages use CSS Grid, media queries, keyframe animations and drop-down submenus in the navigation bar.

## Running it locally

The scripts fetch the taglines from `http://localhost:8000/subtitles.json`, so the folder has to be served by a local web server on **port 8000**. There is nothing to install and no build step.

1. Open a terminal in the project folder. The path contains spaces, so put it in quotes when you `cd` into it.
2. Start a static server on port 8000 with either of these:

   ```sh
   # Python 3 (on Windows, use "py" if "python" isn't found)
   python -m http.server 8000

   # Node.js
   npx http-server -p 8000
   ```

3. Open <http://localhost:8000/acasa.html> in a browser.

Press `Ctrl+C` in the terminal to stop the server.

**VS Code Live Server:** it uses port 5500 by default. Add `"liveServer.settings.port": 8000` to your VS Code settings so the tagline request reaches the same server.

**Opening the files directly** (double-clicking an `.html` file) mostly works, but the taglines won't load and the space under the title stays empty.

The YouTube video, the Google Maps embed and the Font Awesome icons on the Contact page need an internet connection.

### Resetting saved data

There is no back end. Everything is saved in the browser's `localStorage` for `http://localhost:8000`, under these keys:

| Key | Contents |
|---|---|
| `lista` | Registered accounts as `[username, email, password]` |
| `username` | The account that is currently logged in |
| `intrebari` | Submitted questions as `[username, subject, text]` |

To start over, open the browser's developer tools, go to **Application → Local Storage → http://localhost:8000** and delete these keys, or run `localStorage.clear()` in the console.

Data is kept separately for each address, so accounts created at `localhost:8000` won't appear on another port.

> Passwords are stored as plain text in `localStorage`. That's fine for a demo, but this is not a real authentication system.

## Project structure

```
.
├── acasa.html   acasa.css   acasa.js     Home
├── despre.html  despre.css  despre.js    About
├── program.html program.css program.js   Schedule
├── contact.html contact.css contact.js   Contact and question form
├── login.html   login.css   login.js     Accounts
├── subtitles.json                        50 taglines for the page header
└── poze/                                 Images: speakers, highlights, logos, backgrounds
```

Each page has its own stylesheet and script. The header, navigation bar and footer are repeated in every HTML file.

## Built with

- HTML5 and CSS3
- Vanilla JavaScript: Fetch API, Web Animations API, `localStorage`, Canvas 2D
- Inline SVG
- [Font Awesome 4.7](https://fontawesome.com/v4/) (loaded from a CDN, Contact page only)

No frameworks and no dependencies.
