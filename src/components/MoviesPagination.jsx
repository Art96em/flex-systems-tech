import { memo } from "react";

import { Box, Pagination } from "@mui/material";

const MoviesPagination = memo(
  ({ page, totalPages, onPageChange, paginationRef }) => {
    return (
      <Box
        ref={paginationRef}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={onPageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-focusVisible": {
                outline: "2px solid #ff9800",
                outlineOffset: "2px",
              },
            },
          }}
        />
      </Box>
    );
  },
);

export default MoviesPagination;
