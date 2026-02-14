import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Stack } from "@mui/material";

import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";

const MovieDetailsButtons = memo(({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.items);

  const [activeButton, setActiveButton] = useState(0);
  const buttonsRef = useRef([]);

  const isFavorite = movie
    ? favorites.some((item) => item.id === movie.id)
    : false;

  const handleFavorite = useCallback(() => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  }, [dispatch, isFavorite, movie]);

  const buttons = useMemo(() => {
    const result = [];

    if (movie.homepage) {
      result.push({
        label: "Official Site",
        props: {
          href: movie.homepage,
          target: "_blank",
          variant: "contained",
        },
      });
    }

    result.push({
      label: isFavorite ? "Remove from Favorites" : "Add to Favorites",
      props: {
        variant: isFavorite ? "contained" : "outlined",
        onClick: handleFavorite,
      },
    });

    return result;
  }, [movie.homepage, isFavorite, handleFavorite]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!buttons.length) return;

      if (e.key === "ArrowRight") {
        setActiveButton((prev) => Math.min(prev + 1, buttons.length - 1));
      }

      if (e.key === "ArrowLeft") {
        setActiveButton((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        buttonsRef.current[activeButton]?.click();
      }

      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttons.length, activeButton, navigate]);

  return (
    <Stack direction="row" spacing={2} mt={4}>
      {buttons.map((btn, index) => (
        <Button
          key={btn.label}
          ref={(el) => (buttonsRef.current[index] = el)}
          // tabIndex={-1}
          {...btn.props}
          sx={{
            outline: activeButton === index ? "2px solid #ff9800" : "none",
            transform: activeButton === index ? "scale(1.05)" : "scale(1)",
          }}
        >
          {btn.label}
        </Button>
      ))}
    </Stack>
  );
});

export default MovieDetailsButtons;
