import { useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import MovieDetailsButtons from "../components/MovieDetailsButtons";
import ProductionCompanies from "../components/ProductionCompanies";
import { IMAGE_BASE } from "../helpers/constants";
import { fetchMovieRequest } from "../features/movies/moviesSlice";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.selectedMovie);

  const containerRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieRequest({ id }));
    }
  }, [dispatch, id]);

  if (!movie) return null;

  return (
    <Box
      ref={containerRef}
      tabIndex={0}
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6)),
          url(${IMAGE_BASE}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        py: 6,
        outline: "none",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 4 }}>
            <Box
              component="img"
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
              }}
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {movie.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ opacity: 0.8 }} gutterBottom>
              {movie.tagline}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
              <Typography>
                {movie.vote_average} ({movie.vote_count} votes)
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    backgroundColor: "#ff9800",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }} />

            <Typography variant="body1" sx={{ textAlign: "start" }}>
              {movie.overview}
            </Typography>

            <Stack direction="row" spacing={3} flexWrap="wrap" mt={3}>
              <InfoItem
                icon={<AccessTimeIcon />}
                label={`${movie.runtime} min`}
              />
              <InfoItem
                icon={<PublicIcon />}
                label={movie.origin_country.join(", ")}
              />
              <InfoItem
                icon={<AttachMoneyIcon />}
                label={`$${movie.revenue.toLocaleString()}`}
              />
            </Stack>

            <MovieDetailsButtons movie={movie} />
          </Grid>
        </Grid>

        <ProductionCompanies companies={movie.production_companies} />
      </Container>
    </Box>
  );
};

const InfoItem = memo(({ icon, label }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography variant="body2">{label}</Typography>
  </Stack>
));

export default MovieDetailsPage;
