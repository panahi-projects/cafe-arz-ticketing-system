import TicketFilterForm from "@/features/ticketing/ui/components/TicketFilterForm";
import { CloseCircle, Filter } from "@/lib/icons";
import { Box, Modal, keyframes, useMediaQuery } from "@mui/material";
import { useState } from "react";

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(4px); }
`;

const fadeOut = keyframes`
  from { opacity: 1; backdrop-filter: blur(4px); }
  to { opacity: 0; backdrop-filter: blur(0px); }
`;

const scaleIn = keyframes`
  from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`;

const scaleOut = keyframes`
  from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  to { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
`;

const style = (isClosing: boolean) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 360,
  width: "50%",
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 4,
  p: 4,
  borderRadius: "16px",
  outline: "none",
  animation: `${isClosing ? scaleOut : scaleIn} 0.3s ease-out forwards`,
});

const backdropStyle = (isClosing: boolean) => ({
  animation: `${isClosing ? fadeOut : fadeIn} 0.3s ease-out forwards`,
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
});

const DataTableFilter = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = () => {
    setIsClosing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <Box>
      <Box
        sx={{
          color: "text.primary",
          px: 1,
          py: 0.5,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
          transition: "opacity 0.2s ease",
        }}
      >
        <Filter opacity={1} onClick={handleOpen} />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: 0,
          outline: "none",
          ...backdropStyle(isClosing),
        }}
        closeAfterTransition
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Box sx={style(isClosing)}>
          <Box
            sx={{
              position: "absolute",
              left: isMobile ? 18 : 28,
              top: isMobile ? 18 : 34,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
              transition: "opacity 0.2s ease",
            }}
            onClick={handleClose}
          >
            <CloseCircle size={28} />
          </Box>
          <Box
            sx={{
              mt: isMobile ? 2 : 0,
              overflowY: "auto",
              maxHeight: "calc(90vh - 120px)",
              pl: 1,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <TicketFilterForm />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DataTableFilter;
