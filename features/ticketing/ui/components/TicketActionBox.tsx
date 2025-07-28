import GenericForm from "@/components/form/GenericForm";
import { GenericFormProps } from "@/types";
import { Box, Card, Typography } from "@mui/material";

interface TicketActionBoxProps {
  status?: string;
  referTo?: number | string;
  fk_department_id?: number | string;
}

export const TicketActionBox = ({
  status,
  referTo,
  fk_department_id,
}: TicketActionBoxProps) => {
  const formSchema: GenericFormProps = {
    schema: {
      fields: [
        {
          type: "select",
          name: "status",
          label: "وضعیت",
          value: status || "",
          options: [
            {
              _id: "",
              value: "همه",
            },
            {
              _id: "NOANSWER",
              value: "بدون پاسخ",
            },
            {
              _id: "PENDING",
              value: "در حال بررسی",
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
        {
          type: "select",
          name: "referTo",
          label: "ارجاع به",
          value: referTo || "",
          options: [
            {
              _id: "1",
              value: "من",
            },
            {
              _id: "2",
              value: "سعید پناهی",
            },
            {
              _id: "3",
              value: "رضا رضایی",
            },
            {
              _id: "4",
              value: "محمد محمدی",
            },
          ],
          attr: {
            select_type: "single",
          },
        },
        {
          type: "select",
          name: "fk_department_id",
          label: "دپارتمان",
          value: fk_department_id || "",
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
      ],
    },
  };
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "12px",
        height: "100%",
      }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            fontSize={14}
            fontWeight={700}
            sx={{ color: "text.secondary" }}
          >
            تیکت شماره {12345}
          </Typography>
          <Typography fontSize={12}>1404/01/31 15:11:21</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <Typography fontSize={16} fontWeight={700}>
            عنوان:{" "}
          </Typography>
          <Typography fontSize={16} fontWeight={700}>
            تست تیکت
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "gray.300",
            pt: 2,
            mt: 2,
          }}
        >
          <GenericForm
            schema={formSchema.schema}
            showButtons={false}
            column={{ sm: 12, md: 4 }}
          />
        </Box>
      </Box>
    </Card>
  );
};
