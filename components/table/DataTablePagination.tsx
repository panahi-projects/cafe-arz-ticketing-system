"use client";
import { DataTablePaginationProps } from "@/types";
import { Box, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DataTablePagination = ({
  page,
  total,
  onPageChange,
  rowsPerPage = 10,
}: DataTablePaginationProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const pageCount = Math.ceil(total / rowsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        variant="text"
        shape="circular"
        size={isSmallScreen ? "small" : "medium"}
        siblingCount={isSmallScreen ? 0 : 1}
        boundaryCount={isSmallScreen ? 1 : 2}
        sx={{
          direction: "ltr",
          "& .MuiPaginationItem-root": {
            color: theme.palette.grey[600],
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            minWidth: { xs: "28px", sm: "32px" },
            height: { xs: "28px", sm: "32px" },
            margin: { xs: "0px", sm: "0 4px" },
          },
          "& .MuiPagination-ul": {
            flexWrap: "nowrap",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#111",
            },
          },
        }}
      />
    </Box>
  );
};

export default DataTablePagination;
