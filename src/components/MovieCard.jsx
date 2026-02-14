import { forwardRef } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";

const FALLBACK_IMAGE = "/no-image.jpg";

const MovieCard = forwardRef(
  ({ id, title, backdrop_path, isActive, ...props }, ref) => {    
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea
          // ref={ref}
          // tabIndex={-1}
          {...props}
          component={Link}
          to={"/movie/" + id}
          // data-active={isActive ? "" : null}
          sx={{
            height: "100%",
            "&[data-active]": {
              outline: "3px solid #1976d2",
            },
          }}
        >
          <CardMedia
            sx={{ aspectRatio: "16 / 9" }}
            component="img"
            src={
              backdrop_path
                ? "https://image.tmdb.org/t/p/w500" + backdrop_path
                : FALLBACK_IMAGE
            }
            alt={title}
          />
          <CardHeader title={title} />
        </CardActionArea>
      </Card>
    );
  },
);

export default MovieCard;
