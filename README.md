<div align="center">

  <img src="assets/logo.svg" alt="GitExplorer Logo" width="80" height="80" />

GitExplorer

Explore GitHub developers and their repositories with vanilla JavaScript.

Search for a GitHub developer, view their profile and public repositories, filter and sort repositories, and save favorite developers for quick access.

  <p>
    <a href="https://naman-gudhka.github.io/GitExplorer/">Live Demo</a>
    ·
    <a href="https://github.com/naman-gudhka/GitExplorer">Repository</a>
  </p>

</div>

Overview

GitExplorer is a GitHub developer discovery app built with HTML, CSS, and vanilla JavaScript.

The app uses the GitHub REST API to retrieve developer profiles and their public repositories. Repository data is fetched and processed locally so users can search, filter, sort, and paginate through the results without making additional requests for each UI interaction.

Features

🔎 Developer Search — Search for a GitHub developer by username.

👤 Developer Profile — View profile information and GitHub details.

📦 Repository Explorer — View all available public repositories.

🔤 Repository Search — Search repositories by name.

🏷️ Language Filter — Dynamically generated from the developer's repositories.

↕️ Repository Sorting — Sort by stars, name, or recently updated.

📄 Local Pagination — Browse repositories six at a time.

⭐ Favorites — Save developers and quickly load them later.

💾 Local Storage — Persist favorites and theme preference across sessions.

🌙 Dark / Light Theme — Switch themes with the selected preference saved locally.

♿ Accessibility — Uses semantic HTML and ARIA attributes for interactive controls and states.

⚠️ Error & Empty States — Handles invalid users, restricted access, unavailable repositories, empty repositories, and unmatched filters.

Tech Stack

HTML5

CSS3

JavaScript (ES Modules)

GitHub REST API

Browser Local Storage

Git & GitHub

No frontend framework or external UI library is used.

How It Works

The application separates API data fetching from repository UI processing:

GitHub REST API
      ↓
Fetch developer profile
      ↓
Fetch all public repositories
      ↓
allRepositories[]
      ↓
Search / Language Filter / Sort
      ↓
Local Pagination
      ↓
Render Repository Cards

Repository filtering, sorting, and pagination happen locally using the fetched repository array.

API

GitExplorer uses the GitHub REST API.

The application uses GitHub endpoints to:

Fetch a developer profile.

Fetch the developer's public repositories.

Handle API pagination while retrieving the complete repository list.

Project Structure

GitExplorer/
├── assets/
│   ├── scripts/
│   │   ├── app.js
│   │   ├── controls.js
│   │   ├── developer.js
│   │   ├── github-api.js
│   │   ├── main.js
│   │   ├── render.js
│   │   └── utils.js
│   └── styles/
├── data/
│   ├── allRepositories.js
│   └── favorites.js
├── index.html
└── README.md

JavaScript Responsibilities

File

Responsibility

app.js

Application events, developer search, favorites interaction, loading and error handling

controls.js

Repository search, language filtering, sorting, and repository controls

developer.js

Developer loading and repository view updates

github-api.js

GitHub API requests and repository fetching

main.js

Theme initialization and theme switching

render.js

Rendering profiles, repositories, favorites, and UI states

utils.js

Local storage, number formatting, and date formatting

Getting Started

1. Clone the repository

git clone https://github.com/naman-gudhka/GitExplorer.git

2. Open the project

Open the project folder in your code editor and run it through a local development server.

For example, you can use the Live Server extension in VS Code.

3. Start exploring

Search for any GitHub username and explore their public profile and repositories.

Live Demo

Open GitExplorer

What I Practiced

This project helped me practice:

JavaScript ES modules

async / await

Promises

fetch()

REST APIs

HTTP response handling

DOM manipulation

Array methods such as filter(), sort(), slice(), and find()

Local storage

Event handling

Client-side filtering and pagination

Dynamic UI rendering

Error and empty-state handling

Git and GitHub workflow

Future Improvements

Possible improvements for future iterations:

Add repository topics and additional metadata.

Add more repository sorting and filtering options.

Improve API rate-limit handling.

Add automated testing.

<div align="center">

Built with HTML, CSS, JavaScript, and the GitHub REST API.

</div>