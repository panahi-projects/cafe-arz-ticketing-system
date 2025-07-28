"use client";
import GenericForm from "@/components/form/GenericForm";
import { GenericFormProps } from "@/types";
import { Box, Card } from "@mui/material";
import React from "react";

const TicketNew = () => {
  const formSchema: GenericFormProps = {
    schema: {
      submitButton: {
        text: "ارسال تیکت",
        variant: "contained",
        color: "success",
        grid: { sm: 12, md: 3 },
        sx: {
          borderRadius: "10px",
          py: 1.5,
        },
      },
      resetButton: {
        text: "ریست",
        variant: "outlined",
        color: "secondary",
        grid: { sm: 12, md: 3 },
        sx: {
          borderRadius: "10px",
          py: 1.5,
        },
      },
      fields: [
        {
          type: "text",
          name: "title",
          label: "عنوان تیکت",
          value: "",
          grid: { md: 6 },
          order: 1,
        },
        {
          type: "select",
          name: "fk_user_id",
          label: "انتخاب کاربر",
          value: "",
          options: [
            {
              _id: "1",
              value: "User 1",
            },
            {
              _id: "2",
              value: "User 2",
            },
            {
              _id: "3",
              value: "User 3",
            },
          ],
          grid: { md: 6 },
          order: 2,
        },
        {
          type: "select",
          name: "fk_department_id",
          label: "دپارتمان",
          value: "",
          options: [
            { _id: 1, value: "فنی" },
            { _id: 2, value: "پشتیبانی" },
            { _id: 3, value: "مالی" },
            { _id: 4, value: "فروش" },
          ],
          grid: { md: 4 },
          order: 3,
        },
        {
          type: "select",
          name: "priority",
          label: "درجه اهمیت",
          value: "",
          options: [
            { _id: "UP", value: "بالا" },
            { _id: "MED", value: "متوسط" },
            { _id: "LOW", value: "پایین" },
          ],
          grid: { md: 4 },
          order: 4,
        },
        {
          type: "text",
          name: "tags",
          label: "تگ",
          value: "",
          grid: { md: 4 },
          order: 5,
        },
        {
          type: "text",
          name: "message",
          label: "متن تیکت",
          value: "",
          multiline: true,
          rows: 3,
          grid: { md: 12 },
          order: 6,
        },
      ],
    },
  };

  const handleSubmit = (data: Record<string, unknown>) => {
    if (data) {
      console.log("Form Data: ", data);
    }
  };
  return (
    <Box>
      <Card
        sx={{
          p: 4,
          borderRadius: "12px",
        }}
      >
        <GenericForm
          schema={formSchema.schema}
          column={{ sm: 12, md: 4 }}
          onSubmit={handleSubmit}
        />
      </Card>
    </Box>
  );
};

export default TicketNew;
