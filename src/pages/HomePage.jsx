import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Box, Alert, Button } from "@mui/material";

import { TABS } from "../helpers/constants";
import { useMoviesData } from "../hooks/useMoviesData";
import { setSearchQuery } from "../features/movies/moviesSlice";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

import MoviesTabs from "../components/MoviesTabs";
import MoviesGrid from "../components/MoviesGrid";
import MoviesSearch from "../components/MoviesSearch";
import MoviesPagination from "../components/MoviesPagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  const {
    movies,
    page,
    loading,
    error,
    totalPages,
    currentCategory,
    changePage,
    changeCategory,
  } = useMoviesData();

  const { gridRef, paginationRef, tabsRef, searchRef, activeTabIndex } =
    useKeyboardNavigation();

  const tabTimeoutRef = useRef(null);

  const handlePageChange = useCallback(
    (_, newPage) => {
      changePage(newPage);
    },
    [changePage],
  );

  const handleTabChange = useCallback(
    (event, newIndex) => {
      event.stopPropagation();
      const newCategory = TABS[newIndex].value;
      changeCategory(newCategory);
    },
    [changeCategory],
  );

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch],
  );

  const clearTabTimeout = useCallback(() => {
    if (tabTimeoutRef.current) {
      clearTimeout(tabTimeoutRef.current);
      tabTimeoutRef.current = null;
    }
  }, []);

  const handleTabFocus = useCallback(
    (index) => {
      clearTabTimeout();

      tabTimeoutRef.current = setTimeout(() => {
        const category = TABS[index].value;
        if (category !== "favorites" && category !== currentCategory)
          changeCategory(category);
      }, 2000);
    },
    [changeCategory, currentCategory],
  );

  return (
    <Container
      sx={{
        py: 4,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        gap: 4,
      }}
    >
      <Box>
        <MoviesTabs
          tabs={TABS}
          activeTabIndex={activeTabIndex}
          tabsRef={tabsRef}
          onTabChange={handleTabChange}
          onTabFocus={handleTabFocus}
          onTabBlur={clearTabTimeout}
        />
      </Box>

      <Box>
        <MoviesSearch
          value={searchQuery}
          onChange={handleSearchChange}
          searchRef={searchRef}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {error ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Alert severity="error" sx={{ maxWidth: 500, width: "100%" }}>
              {error}
            </Alert>
          </Box>
        ) : (
          <MoviesGrid
            movies={movies}
            loading={loading}
            error={error}
            gridRef={gridRef}
          />
        )}
      </Box>

      {currentCategory !== "favorites" && (
        <MoviesPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          paginationRef={paginationRef}
        />
      )}
    </Container>
  );
};

export default HomePage;
