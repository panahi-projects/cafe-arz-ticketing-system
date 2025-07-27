import { Column } from "@/types";
import { Ticket, UserInfo } from "../../types";
import TicketUserInfo from "../components/TicketUserInfo";

export const ticketIdColumn: Column<Ticket> = {
  id: "ticket_id",
  label: "شناسه",
};

export const userColumn: Column<Ticket> = {
  id: "user",
  label: "مشخصات کاربر",
  render: (row) => <TicketUserInfo user={row.user as Partial<UserInfo>} />,
};
