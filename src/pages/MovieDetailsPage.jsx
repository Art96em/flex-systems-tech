import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PublicIcon from "@mui/icons-material/Public";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { fetchMovieRequest } from "../features/movies/moviesSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";

// "https://image.tmdb.org/t/p/w500"

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movie = useSelector((state) => state.movies.selectedMovie);
  const favorites = useSelector((state) => state.favorites.items);
  console.log(movie); // TODO

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  useEffect(() => {
    dispatch(fetchMovieRequest({ id }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!movie) return null;

  const isFavorite = favorites.some((item) => item.id === movie.id);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6)),
          url(${IMAGE_BASE}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Poster */}
          <Grid size={{ xs: 12, md: 4 }}>
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

          <Grid size={{ xs: 12, md: 8 }}>
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

            {/* Overview */}
            <Typography variant="body1" paragraph>
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

            <Stack direction="row" spacing={2} mt={4}>
              {movie.homepage && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LanguageIcon />}
                  href={movie.homepage}
                  target="_blank"
                >
                  Official Site
                </Button>
              )}

              <Button
                variant={isFavorite ? "contained" : "outlined"}
                color="secondary"
                onClick={handleFavorite}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Typography variant="h5" gutterBottom>
            Production Companies
          </Typography>

          <Grid container spacing={2}>
            {movie.production_companies.map((company) => (
              <Grid key={company.id}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">{company.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const InfoItem = ({ icon, label }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography variant="body2">{label}</Typography>
  </Stack>
);

export default MovieDetailsPage;
