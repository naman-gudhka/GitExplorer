# GitExplorer

> Explore GitHub developers and their public repositories using vanilla JavaScript.

[![Live Demo](https://img.shields.io/badge/Live_Demo-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://naman-gudhka.github.io/GitExplorer/)
[![GitHub Repository](https://img.shields.io/badge/GitHub_Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/naman-gudhka/GitExplorer)

---

## 📌 Overview

**GitExplorer** is a frontend web application that lets users explore GitHub developers and their public repositories.

The application uses the **GitHub REST API** to fetch developer and repository data, then provides client-side tools for searching, filtering, sorting, and browsing repositories.

It is built entirely with **HTML, CSS, and vanilla JavaScript**, without using a frontend framework.

---

## ✨ Features

### 👤 Developer Search

- Search for a GitHub developer by username.
- View profile information such as:
  - Name
  - Username
  - Avatar
  - Bio
  - Location
  - Company
  - Website
  - Public repository count
  - Followers and following

### 📦 Repository Explorer

- View the developer's public repositories.
- Display repository:
  - Name
  - Description
  - Primary language
  - Stars
  - Forks
  - Last updated date
  - GitHub repository link

### 🔎 Repository Controls

- Search repositories by name.
- Dynamically filter repositories by programming language.
- Sort repositories by:
  - ⭐ Stars
  - 🔤 Name
  - 🕐 Recently updated
- Browse repositories using local pagination.

### ⭐ Favorites

- Save GitHub developers to a favorites list.
- Quickly load a favorited developer.
- Remove developers from favorites.
- Persist favorites using `localStorage`.

### 🌙 Theme

- Dark and light theme support.
- Persist the selected theme using `localStorage`.

### ⚠️ UI States

The application handles:

- Loading states
- User not found
- Access restrictions
- GitHub server errors
- Repository fetch errors
- Developers with no public repositories
- No repositories matching the selected filters

---

## 🛠️ Tech Stack

- **HTML5** — Semantic page structure
- **CSS3** — Styling, responsive layout, and themes
- **JavaScript** — Application logic and DOM manipulation
- **GitHub REST API** — Developer and repository data
- **Local Storage** — Favorites and theme persistence
- **Git & GitHub** — Version control and deployment

---

## 🔄 Application Flow

The application separates **API data fetching** from **repository processing**.

```text
                    GitHub REST API
                           │
                           ▼
              ┌───────────────────────┐
              │ Developer Profile     │
              │ + Public Repositories │
              └───────────┬───────────┘
                          │
                          ▼
                allRepositories[]
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       Repository Controls       Favorites
              │                       │
       ┌──────┼──────┐                │
       ▼      ▼      ▼                ▼
     Search Filter  Sort        localStorage
       │      │      │
       └──────┼──────┘
              ▼
       Local Pagination
              │
              ▼
       Repository Cards
```

### Why local processing?

Once the repositories have been fetched, search, filtering, sorting, and pagination can happen locally.

This keeps UI interactions independent from additional API requests.

---

## 📁 Project Structure

```text
GitExplorer/
│
├── assets/
│   ├── scripts/
│   │   ├── app.js
│   │   ├── controls.js
│   │   ├── developer.js
│   │   ├── github-api.js
│   │   ├── main.js
│   │   ├── render.js
│   │   └── utils.js
│   │
│   └── styles/
│
├── data/
│   ├── allRepositories.js
│   └── favorites.js
│
├── index.html
└── README.md
```

### JavaScript Modules

- **`app.js`** — Handles search, favorites, loading, and errors.
- **`controls.js`** — Handles repository search, filtering, and sorting.
- **`developer.js`** — Loads developer data and manages the repository view.
- **`github-api.js`** — Handles requests to the GitHub REST API.
- **`main.js`** — Handles theme initialization and switching.
- **`render.js`** — Handles rendering of profiles, repositories, favorites, and UI states.
- **`utils.js`** — Contains localStorage and formatting utilities.

---

## 🌐 GitHub API

GitExplorer uses the **GitHub REST API**.

The application retrieves:

- Developer profile information
- Public repositories
- Repository metadata
- API pagination information

GitHub API documentation:

**https://docs.github.com/en/rest**

---

## 🚀 Getting Started

### Prerequisites

You only need:

- A modern web browser
- Git
- A local development server

### 1. Clone the repository

```bash
git clone https://github.com/naman-gudhka/GitExplorer.git
```

### 2. Navigate into the project

```bash
cd GitExplorer
```

### 3. Run the project

Because the project uses JavaScript modules, run it through a local development server.

For example, using **VS Code Live Server**:

1. Open the project in VS Code.
2. Install the Live Server extension if needed.
3. Open `index.html`.
4. Start Live Server.

---

## 🔗 Live Demo

**[Open GitExplorer →](https://naman-gudhka.github.io/GitExplorer/)**

---

## 📚 What I Practiced

This project gave me practical experience with:

- JavaScript ES Modules
- Promises
- `async` / `await`
- `fetch()`
- REST APIs
- HTTP response handling
- DOM manipulation
- Event listeners
- Array methods such as `filter()`, `sort()`, `slice()`, and `find()`
- Client-side data processing
- Local pagination
- Dynamic UI rendering
- Local storage
- Error and empty states
- Git and GitHub workflow

---

## 🔮 Future Improvements

Possible future improvements include:

- Repository topics and additional metadata
- More repository filtering options
- Better GitHub API rate-limit handling
- Automated testing
- Improved repository loading feedback

---

## 📄 License

This project was created as a learning and portfolio project.

---

<div align="center">

**Built with HTML, CSS, JavaScript, and the GitHub REST API.**

</div>
