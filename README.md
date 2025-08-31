# battleship

**battleship** is a turn-based strategy game built with React 19 + Vite, featuring dynamic ship placement, intuitive turn logic, and a responsive UI. But this is not just a game - I focused heavily on logic design and frontend testing, ensuring every move, render, and game state works reliably. The app is fully tested with Vitest and React Testing Library.

online preview - https://battleship3.netlify.app

<p align="center">
  <img src="./public/battleship.png" alt="battleship screenshot" width="700"/>
</p>

## features

- interactive **ship placement**
  - manual placement logic
  - auto-placement with validation
- full **turn-based game mechanics** with visual hit/miss feedback
- **victory detection** and state reset
- **test coverage**:
  - game logic (Board, Ship, validation)
  - UI components (`GameSetup`, `Board`, `Cell`, `GamePage`)
  - state management and events

## tech stack

- **frontend**: React 19 + Vite
- **styling**: CSS Modules
- **testing**: Vitest, React Testing Library

## what I learned

- how to design game logic cleanly and modularly
- deep dive into test-driven development for frontend apps
- mocking and isolating logic for unit test coverage

## next steps

- add difficulty levels for AI
- enable drag-to-place ships with orientation toggle
- multiplayer support (websocket)
- track scores across games

---

If this project speaks to you, feel free to [connect with me](https://github.com/ssendns). I am always open to collaborating on cool, meaningful projects.
