import { FormField } from "@/types";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export interface DateInfo {
  time: string;
  jalali: string;
  milady: string;
}

export interface UserVerification {
  title: string;
  key: string;
  is_confirmed: boolean;
  status: {
    title: string;
    key: string;
  };
}

export interface Shahkar {
  color: string;
  label: string;
  key: string;
}

export interface UserInfo {
  id: number;
  mobile: string;
  name: string;
  ip: string;
  create: string;
  first_name: string;
  last_name: string;
  national_code: string;
  phone: string | null;
  email: string | null;
  avatar: string;
  we_trust: number;
  no_trust: number;
  verifications: UserVerification[];
  status: number;
  legal: boolean;
  tfa_type: string;
  shahkar: Shahkar;
  balance: number;
  verify: {
    mobile?: boolean;
    email?: boolean;
    credit?: boolean;
    phone?: boolean;
    national?: boolean;
    image?: boolean;
  };
  level: string;
}

export interface ReplyUserInfo {
  is_admin: boolean;
  name: string;
  avatar: string;
}

export interface TicketReply {
  user_info: ReplyUserInfo;
  content: string;
  date: {
    created_at: DateInfo;
  };
}

export type StatusType =
  | "NOANSWER"
  | "PENDING"
  | "ANSWERED"
  | "RESOLVED"
  | "CLOSED";

export interface TicketStatus {
  key: StatusType;
  label: string;
}

export interface TicketPriority {
  key: string;
  value: string;
}

export interface Department {
  key: number;
  value: string;
}

export interface Ticket {
  id: string;
  date: {
    created_at: DateInfo;
    updated_at: DateInfo;
  };
  priority: TicketPriority;
  department?: string;
  fk_department: Department;
  fk_order_id?: string | null;
  fk_sender_id: number;
  fk_agent_id?: number | null;
  lock: boolean;
  seen: number;
  ticket_id: string;
  fk_department_id: number;
  title: string;
  status: TicketStatus;
  user: UserInfo | null;
  user_info: ReplyUserInfo;
  content: string;
  replies: TicketReply[];
}

export interface TicketResponse {
  ticket?: Ticket;
  error?: string;
}

export interface TicketListResponse {
  tickets: {
    data: Ticket[];
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
  filters: FormField[];
}

export type TicketTitle =
  | "خدمات سایت"
  | "مشکل فنی"
  | "سوال مالی"
  | "درخواست فروش";

export interface TicketFilterFormProps {
  onSuccess?: () => void;
}

export interface TicketListElementProps {
  tickets: Ticket[];
  page: number;
  pageSize: number;
  total: number;
  handlePageChange: (newPage: number) => void;
  onFilterChange: (filterName: string, value: string) => void;
  loading?: boolean;
  currentFilters?: {};
}

export interface TicketStatusChipProps {
  item: TicketStatus;
  size?: "xs" | "sm" | "md" | "lg";
  sx?: SxProps<Theme> | undefined;
}

export interface Mapper {
  key: string;
  values: Record<string | number, string | number | boolean>;
}
