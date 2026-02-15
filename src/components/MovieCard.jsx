import { memo } from "react";
import { Link } from "react-router-dom";

import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";

const FALLBACK_IMAGE = "/src/assets/no-image.jpg";

const MovieCard = memo(({ id, title, backdrop_path, ...props }) => {
  const imageSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w342${backdrop_path}`
    : FALLBACK_IMAGE;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.2s",

        "&:focus-within": {
          boxShadow: "0 0 0 3px #ff9800",
        },
      }}
    >
      <CardActionArea
        {...props}
        component={Link}
        to={`/movie/${id}`}
        sx={{
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          loading="lazy"
          decoding="async"
          sx={{ aspectRatio: "16 / 9" }}
          src={imageSrc}
          alt={title}
        />

        <CardHeader
          title={title}
          slotProps={{
            title: {
              sx: {
                fontSize: "clamp(1rem, 2vw, 2rem)",
                fontWeight: 500,
              },
            },
          }}
        />
      </CardActionArea>
    </Card>
  );
});

export default MovieCard;
