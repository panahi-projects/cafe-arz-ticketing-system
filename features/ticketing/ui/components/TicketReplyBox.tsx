import { Card } from "@mui/material";
import ChatBox from "./ChatBox";

const TicketReplyBox = () => {
  return (
    <Card
      sx={{
        height: "100%",
        overflowY: "auto",
        p: 2,
        borderRadius: "12px",
      }}
    >
      <ChatBox />
    </Card>
  );
};

export default TicketReplyBox;
