# NecroNet

A darkly satirical SaaS simulation built with **PixiJS**, where you take on the role of a soul-collecting freelancer in a bureaucratic post-death gig economy. Welcome to NecroNet — your go-to cloud platform for tracking mortal expiration and gathering the recently departed.
> A digital solution for supernatural logistics.
> Currently in early development.
> [Play latest development build](https://pabron7.github.io/necronet/)
---

## Concept

NecroNet is a narrative-driven browser game inspired by the absurdity of corporate platforms — reimagined as tools for grim reapers. You receive random "tasks" (souls to collect) fetched from public APIs. Your job? Travel to their location, analyze the situation, and decide their fate.

You're no longer the classic hooded figure with a scythe — you're a contractor for NecroNet™.

- Every task is generated using public APIs (users, avatars, facts, excuses).
- You receive a location and avatar for your target.
- The soul might recognize you and try to escape death with excuses.
- Your job: Accept or reject their excuses. Make decisions. Meet quotas.

---

## Features

- **Random User Integration** – Meet your soul targets from the [randomuser.me](https://randomuser.me) API.
- **Excuse & Fact Generators** – Listen to hilarious excuses or learn a fact before making a judgment.
- **Scene System** – Modular design using finite state machines (inspired by Unity).
- **Responsive Layout** – Header, footer, and scale-aware design.
- **Firebase Analytics Integration** – Track user interactions with custom events:
  - `fetched_people` – When new soul tasks are fetched
  - `soul_killed` – When a soul is harvested
  - `soul_released` – When a soul is released
  - `soul_given_another_chance` – When you let someone speak again
  - `task_initiated` – When you proceed with a selected soul

---

## Analytics Disclaimer

This game uses **Google Analytics** and **third-party public APIs** to track basic, anonymous user interactions. The data collected is used solely to improve gameplay experience and performance tracking.  
**We do not collect personal information or use cookies directly.**  
API responses (like excuses or facts) are fetched in real-time and may vary.  
> By continuing to play, you agree to this setup.

---

## Changelog

You can track all updates and changes in [CHANGELOG](/necronet/CHANGELOG.md).

---

## Tech Stack

- **PixiJS 8.9.1** – WebGL 2D renderer
- **TypeScript** – Strong-typed architecture
- **Vite** – Development server & bundler
- **Firebase Analytics** – Event tracking for gameplay
- **Public APIs** – randomuser.me, dicebear, useless facts, excuse generator
- **CI/CD Pipeline** - GitHub Actions and GitHub Pages

---

## Development

##### Install dependencies
npm install

##### Start local server
npm run dev

##### Build for production
npm run build

---

## .env Setup

To use Firebase Analytics, create a `.env` file in your root with the following:

VITE_FIREBASE_API_KEY=your_api_key  
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain  
VITE_FIREBASE_PROJECT_ID=your_project_id  
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket  
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id  
VITE_FIREBASE_APP_ID=your_app_id  
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

These variables are injected automatically via [Vite's environment system](https://vitejs.dev/guide/env-and-mode.html). Never commit your actual API keys!

---

## Folder Structure
src/
- core/             # SceneManager, IScene, Config
- scenes/           # GameScene, MainMenuScene, etc.
- ui/               # Header, Footer, Buttons, Text elements
- utils/            # API fetchers like fetchUser, fetchExcuse
- firebase.ts       # Firebase Initialization
- main.ts           # Entry point
- ../env            # Create your local .env file with your own firebase config

---

## LICENSE

This project is licensed under the
[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](/LICENSE)

You are free to:

    Share — copy and redistribute the material in any medium or format

    Adapt — remix, transform, and build upon the material

Under the following terms:

    Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

    NonCommercial — You may not use the material for commercial purposes.

---

## Developer

Developed by [Alp Kurt](https://alpkurt.com)
Contact: krtalp@gmail.com