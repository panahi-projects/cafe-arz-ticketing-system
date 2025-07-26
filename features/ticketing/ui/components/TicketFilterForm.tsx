"use client";
import GenericForm, { GenericFormProps } from "@/components/GenericForm";
import { Typography } from "@mui/material";

const filterSchema: GenericFormProps = {
  schema: {
    filters: [
      {
        type: "text",
        name: "ticket_id",
        label: "شماره تیکت",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "fk_user_id",
        label: "شناسه کاربر",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "name",
        label: "نام و نام خانوادگی",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "mobile",
        label: "موبایل",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "email",
        label: "ایمیل",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "national_code",
        label: "کد ملی",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "content",
        label: "متن",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "text",
        name: "ip_address",
        label: "ip",
        value: "",
        options: [],
        attr: [],
      },
      {
        type: "select",
        name: "fk_department_id",
        label: "دپارتمان",
        value: "",
        options: [
          {
            _id: "",
            value: "انتخاب کنید",
          },
          {
            _id: 1,
            value: "مدیریت",
          },
          {
            _id: 2,
            value: "پشتیبانی",
          },
          {
            _id: 3,
            value: "فروش",
          },
          {
            _id: 4,
            value: "مالی",
          },
        ],
        attr: {
          select_type: "single",
        },
      },
      {
        type: "select",
        name: "status",
        label: "وضعیت ",
        value: "",
        options: [
          {
            _id: "*",
            value: "همه",
          },
          {
            _id: "NOANSWER",
            value: "بدون پاسخ",
          },
          {
            _id: "PENDING",
            value: "در حال بررسی ",
          },
          {
            _id: "ANSWERED",
            value: "پاسخ داده شده",
          },
          {
            _id: "RESOLVED",
            value: "حل شده",
          },
          {
            _id: "CLOSED",
            value: "بسته شده",
          },
          {
            _id: "WAITING_ANSWER",
            value: "در انتظار پاسخ",
          },
          {
            _id: "ASSIGNED_TO_USER",
            value: "ارجاع به من",
          },
        ],
        attr: {
          select_type: "single",
        },
      },
    ],
  },
};

export default function TicketFilterForm() {
  const handleSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Typography component={"h6"} variant="h6" fontWeight={700} mb={4}>
        فیلتر ها
      </Typography>
      <GenericForm schema={filterSchema.schema} onSubmit={handleSubmit} />
    </div>
  );
}
