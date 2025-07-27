"use client";

import { Typography } from "@mui/material";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import GenericForm, { GenericFormProps } from "@/components/GenericForm";
import { isObjectValueNullOrEmpty } from "@/lib/utils";
import { generateFilterObject } from "../../lib";
import { AppliedFilter } from "@/components/table/DataTable";
import { DepartmentMap } from "../../constants";

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

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted with data:", data);
    if (data && !isObjectValueNullOrEmpty(data)) {
      const mappers = [
        {
          key: "fk_department_id",
          values: DepartmentMap,
        },
      ];
      const filters = generateFilterObject(data, mappers);
      setAppliedFilters(filters);
    } else {
      setAppliedFilters([]);
    }
    return true;
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
