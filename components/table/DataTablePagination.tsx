"use client";
import { Box, Pagination } from "@mui/material";

type Props = {
  page: number;
  total: number;
  rowsPerPage?: number;
  //   onPageChange: (page: number) => void;
};

const DataTablePagination = ({
  page,
  total,
  //   onPageChange,
  rowsPerPage = 10,
}: Props) => {
  const pageCount = Math.ceil(total / rowsPerPage);

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={pageCount}
        page={page}
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default DataTablePagination;
