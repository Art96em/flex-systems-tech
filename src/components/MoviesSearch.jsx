import { TextField } from "@mui/material";
import { memo } from "react";

const MoviesSearch = memo(({ value, onChange, searchRef }) => {
  return (
    <TextField
      inputRef={searchRef}
      label="Search movies"
      size="small"
      value={value}
      onChange={onChange}
      fullWidth
      autoComplete="off"
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ff9800",
              borderWidth: "2px",
            },
          },
        },
        "& .MuiInputLabel-outlined": {
          "&.Mui-focused": {
            color: "#ff9800",
            fontWeight: "bold",
          },
        },
      }}
    />
  );
});

export default MoviesSearch;
