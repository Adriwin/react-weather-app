# React Weather App

A simple weather app built with **React** and **Vite** that displays key weather information using the **OpenWeather API** and **Google Geocoding API**, built with **TypeScript**, **Tailwind CSS**, **Tanstack Query**, and more. UI is still in progress.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Demo

You can find the demo [HERE](https://adriwin.github.io/react-weather-app/)

---

## Features

- Displays current temperature, humidity, wind speed, and weather description for a searched location.
- Provides essential weather data in a clean interface.
- Built with responsive design principles.
- Used Google Geolocation API to easily search for a given location.
- Plans to incorporate enhanced UI, or extended forecasts.

---

## Technologies Used

- **React** — Front-end library for building UI components
- **Vite** — Blazing-fast development build tool
- **TypeScript** — Typed JavaScript for improved code quality
- **Tailwind CSS** — Utility-first CSS framework
- **TanStack Query** — For efficient data fetching and state management
- **React-Toastify** — For user-friendly toast notifications
- **ESLint & Prettier** — For code linting and formatting
- **recharts** - For graph rendering
- **SCSS preprocessor**

---

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adriwin/react-weather-app.git
   cd react-weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn run dev
   ```

### Running Locally

1. Create a `.env` file at the root of the project. Add your OpenWeather API key and Google Geocoding API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key
   VITE_GEOCODING_API_KEY=your_api_key
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and go to `http://localhost:5173` (default Vite port).

---

## Environment Variables

- `VITE_OPENWEATHER_API_KEY` — Your personal API key from OpenWeather for accessing weather data.
- `VITE_GEOCODING_API_KEY` — Your personal API key from Google Geocoding for retrieving latitude and longitute from specified location.

---

## Project Structure

```
.
├── public/
│   └── index.html
├── src/
│   ├── assets/             # SCSS stuff
│   ├── components/         # Reusable components (e.g., SearchBar, WeatherCard)
│   ├── utils/              # Utility functions and helpers
│   ├── App.tsx
│   ├── index.css           # main CSS file with Tailwind
│   ├── main.tsx
│   ├── types.ts
├── .eslintrc.cjs
├── .prettierrc
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Roadmap

- [ ] Enhance UI/UX – add animations, theming, or layout improvements
- [ ] Implement dark mode toggle
- [ ] Add unit and integration tests
- [ ] Add language select and text translation
- [ ] Add a true logo
- [ ] Add precise wind information
- [ ] Add a small map to show where you are in the world

---

## License

The MIT License (MIT)

## Acknowledgments

Lucy for a quick UI done in an hour xd
