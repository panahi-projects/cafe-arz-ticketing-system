"use client";

import { Typography } from "@mui/material";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import GenericForm, { GenericFormProps } from "@/components/GenericForm";

interface TicketFilterFormProps {
  onSuccess?: () => void;
}

export default function TicketFilterForm({ onSuccess }: TicketFilterFormProps) {
  const { setAppliedFilters, filters } = useTicketFilterStore();
  const filterSchema: GenericFormProps = {
    schema: {
      fields: filters,
    },
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    setAppliedFilters(data);
    return true; // Return true to indicate successful validation
  };

  return (
    <div>
      <Typography component={"h6"} variant="h6" fontWeight={700} mb={4}>
        فیلتر ها
      </Typography>
      <GenericForm
        schema={filterSchema.schema}
        onSubmit={handleSubmit}
        onSuccess={onSuccess}
      />
    </div>
  );
}
