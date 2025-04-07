# NecroNet

A darkly satirical SaaS simulation built with **PixiJS**, where you take on the role of a soul-collecting freelancer in a bureaucratic post-death gig economy. Welcome to NecroNet — your go-to cloud platform for tracking mortal expiration and gathering the recently departed.
> A digital solution for supernatural logistics.
> Currently in early development.
---

## Concept

NecroNet is a narrative-driven browser game inspired by the absurdity of corporate platforms — reimagined as tools for grim reapers. You receive random "tasks" (souls to collect) fetched from public APIs. Your job? Travel to their location, analyze the situation, and decide their fate.

You're no longer the classic hooded figure with a scythe — you're a contractor for NecroNet™.

- Every task is generated using public APIs (users, avatars, facts, excuses).
- You receive a location and avatar for your target.
- (Planned) You’ll check the weather at their location before initiating contact.
- The soul might recognize you and try to escape death with excuses.
- Your job: Accept or reject their excuses. Make decisions. Meet quotas.

---

## Features

- **Random User Integration** – Meet your soul targets from the [randomuser.me](https://randomuser.me) API.
- **Weather Check** – (Planned) React to real-time weather from the user’s location.
- **Excuse Generator** – Hear out hilarious excuses before you judge.
- **Modular Scenes** – Built with a finite state machine approach like Unity’s scene system.
- **Responsive UI** – Header, footer, and scaling behavior that adapts across devices.
- **Extensible Design** – Easy to add new APIs, mechanics, and systems.

---

## Changelog

You can track all updates and changes in [CHANGELOG](/frontend/CHANGELOG.md).

---

## Tech Stack

- **PixiJS 8.9.1** – Rendering engine
- **TypeScript** – Typed, modular architecture
- **Vite** – Dev tooling & hot reload
- **Public APIs** – randomuser.me, dicebear, open-meteo (planned), useless facts, excuse generator
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

## Folder Structure
src/
- core/             # SceneManager, IScene, Config
- scenes/           # GameScene, MainMenuScene, etc.
- ui/               # Header, Footer, Buttons, Text elements
- utils/            # API fetchers like fetchUser, fetchExcuse
- resizer.ts        # Responsive layout handler
- main.ts           # Entry point

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

Developed by Alp Kurt
Contact: krtalp@gmail.com