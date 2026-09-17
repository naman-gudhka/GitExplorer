GitExplorer

Explore GitHub developers and their public repositories with vanilla JavaScript.

Live Demo · GitHub Repository

✨ Features

🔎 Search GitHub developers by username

👤 View developer profiles and public repositories

🔤 Search repositories by name

🏷️ Filter repositories by language

↕️ Sort by stars, name, or recently updated

📄 Browse repositories with local pagination

⭐ Save favorite developers with localStorage

🌙 Switch between dark and light themes

⚠️ Loading, error, and empty states

🛠️ Tech Stack

HTML5 · CSS3 · Vanilla JavaScript · GitHub REST API · Local Storage

🔄 How It Works

GitHub REST API
       │
       ▼
Developer + Repositories
       │
       ▼
Local Repository Data
       │
       ├── Search
       ├── Language Filter
       └── Sort
       │
       ▼
Local Pagination
       │
       ▼
Repository Cards

Filtering, sorting, and pagination are handled locally after the repository data is fetched.

📁 Project Structure

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

🚀 Getting Started

1. Clone the repository

git clone https://github.com/naman-gudhka/GitExplorer.git

2. Run locally

Open the project with a local development server, such as VS Code Live Server.

3. Explore

Search for any GitHub username and explore their profile and repositories.

📚 What I Practiced

JavaScript ES modules

Promises and async / await

fetch() and REST APIs

DOM manipulation

Array methods and client-side data processing

Local storage

Git and GitHub workflow

🔮 Future Improvements

Repository topics and additional metadata

More filtering options

API rate-limit handling

Automated testing

<div align="center">

Built with HTML, CSS, JavaScript, and the GitHub REST API.

</div>
