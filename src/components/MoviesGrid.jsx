import { memo } from "react";

import { Box, Grid, Skeleton } from "@mui/material";

import MovieCard from "./MovieCard";

const MoviesGrid = memo(({ movies, loading, gridRef }) => {
  return (
    <Box ref={gridRef} sx={{ padding: 1, width: "-webkit-fill-available" }}>
      <Grid container spacing={1} alignItems={"stretch"}>
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Grid key={index} size={{ xs: 3 }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : movies.map((movie, index) => (
              <Grid key={movie.id} size={{ xs: 3 }}>
                <MovieCard
                  data-index={index}
                  id={movie.id}
                  title={movie.title}
                  backdrop_path={movie.backdrop_path}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
});

export default MoviesGrid;
