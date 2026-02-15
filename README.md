# Movie Explorer

A React-based movie browsing application with keyboard navigation,
search, pagination and rate-limited API requests.

---

## Features

- Movie search with debounce
- Browse by categories (Popular, Airing Now, Favorites)
- Full keyboard navigation (search, grid, pagination)
- Movie details page
- Custom API rate limiting (5 requests per 10 seconds)
- Optimized Redux-Saga flow (takeLatest, debounce)
- Clean architecture with separation of concerns

---

## Tech Stack

- React
- Redux Toolkit
- Redux-Saga
- React Router
- Material UI
- Axios

---

## Architecture Highlights

### Redux-Saga Side Effects

- `takeLatest` for page navigation
- `debounce` for search
- Centralized API handling
- Custom rate limiting implementation

### Keyboard Navigation System

Custom hook `useKeyboardNavigation`:

- Zone-based navigation model
- Declarative state transitions
- Focus management
- Grid navigation with arrow keys

---

## Project Structure

src/
├── app/
│ ├── rootReducer.js
│ ├── rootSaga.js
│ └── store.js
│
├── components/
│ ├── no-image.jpg
│ ├── MovieCard.js
│ ├── MovieDetailsButtons.js
│ ├── MoviesGrid.js
│ ├── MoviesPagination.js
│ ├── MoviesSearch.js
│ ├── MoviesTabs.js
│ └── ProductionCompanies.js
│
├── features/
│ ├── favorites/
│ │ ├── favoritesSaga.js
│ │ └── favoritesSlice.js
│ │
│ └── movies/
│ ├── moviesSlice.js
│ ├── moviesSaga.js
│ └── moviesApi.js
│
├── hooks/
│ ├── useMoviesData.js
│ └── useKeyboardNavigation.js
│
├── pages/
│ ├── HomePage.jsx
│ └── MovieDetailsPage.jsx
│
└── routes/
  └── AppRouter.jsx

---

## Installation

```bash
git clone https://github.com/Art96em/flex-systems-tech.git
cd movie-explorer
npm install
npm run dev
```

---

## Environment Variables

Create `.env` file:

    VITE_API_KEY=your_api_key_here

---

## Author

Artem Volkov
