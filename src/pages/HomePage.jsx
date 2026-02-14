import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Pagination,
  Container,
  Box,
  TextField,
  Tabs,
  Tab,
  PaginationItem,
} from "@mui/material";

import MovieCard from "../components/MovieCard";
import { TABS } from "../helpers/constants";
import { useMoviesData } from "../hooks/useMoviesData";
import { setSearchQuery } from "../features/movies/moviesSlice";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

const HomePage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const { gridRef, movies, paginationRef, tabsRef, searchRef, activeTabIndex } =
    useKeyboardNavigation();
  const { changePage, changeCategory, currentCategory, page, totalPages } =
    useMoviesData();

  const onPageChange = (e, newPage) => {
    changePage(newPage);
  };

  const onTabChange = (e, newIndex) => {
    const newCategory = TABS[newIndex].value;
    changeCategory(newCategory);
  };

  const onSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tabs ref={tabsRef} value={activeTabIndex} onChange={onTabChange}>
          {TABS.map((tab, index) => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Box
        sx={{
          mb: 4,
        }}
      >
        <TextField
          inputRef={searchRef}
          label="Search movies"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={onSearchChange}
          fullWidth
          autoComplete="off"
        />
      </Box>

      <Box
        ref={gridRef}
        sx={{
          minWidth: "100%",
          flex: 1,
          overflowY: "hidden",
        }}
      >
        <Grid container spacing={1}>
          {movies.map((movie, index) => (
            <Grid key={movie.id} size={{ xs: 3 }}>
              <MovieCard
                data-index={index}
                // tabIndex={-1}
                id={movie.id}
                title={movie.title}
                backdrop_path={movie.backdrop_path}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {currentCategory !== "favorites" && (
        <Box
          ref={paginationRef}
          sx={{ display: "flex", justifyContent: "center", mt: 5 }}
        >
          <Pagination
            page={page}
            count={totalPages}
            onChange={onPageChange}
            color="primary"
            size="large"
            renderItem={(item) => (
              <PaginationItem {...item} selected={item.page === page} />
            )}
          />
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
