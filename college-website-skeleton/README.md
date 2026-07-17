# College Website Project

A college website built collaboratively by club membres.

## 🚀 Overview
This repo hosts the source code for our college website — homepage, about, academics, and contact pages — built with HTML/CSS/JS (and backend where needed).

## 🌳 Branch Strategy
- `main` — always stable, deployable. No direct pushes.
- `develop` — integration branch. All feature branches merge here first.
- `feature/<name>` — one branch per task, e.g. `feature/homepage-hero`.

## 🧑‍🤝‍🧑 Team Roles
| Role | Count | Responsibility |
|---|---|---|
| Frontend Dev | 3 | HTML/CSS/JS pages |
| UI/UX Design | 1 | Layout, styling, mockups |
| Backend Dev | 2 | Forms, database/Firebase |
| Content Team | 2 | Text & images |
| Tester | 1 | Bug validation |
| GitHub Manager | 1 | PR review & merging |

## 🔁 Workflow
1. Pick an issue from the Project board.
2. Create a branch: `feature/<short-task-name>`.
3. Commit using prefixes: `feat:`, `fix:`, `docs:`, `style:`.
4. Open a PR into `develop`.
5. Get at least 1 review approval before merging.
6. `develop` → `main` only when stable and tested.

## 📁 Folder Structure
```
/assets        → images, icons, fonts
/css           → stylesheets
/js            → scripts
/pages         → HTML pages
/backend       → server/Firebase code (if applicable)
```

## 🛠️ Setup
1. Clone the repo: `git clone <repo-url>`
2. Create your branch off `develop`.
3. Open `index.html` in a live server to preview.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution rules.
