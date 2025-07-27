"use client";
import { Typography } from "@mui/material";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import { isObjectValueNullOrEmpty } from "@/lib/utils";
import { generateFilterObject } from "../../lib";
import { DepartmentMap } from "../../constants";
import { GenericFormProps } from "@/types";
import GenericForm from "@/components/form/GenericForm";

interface TicketFilterFormProps {
  onSuccess?: () => void;
}

export default function TicketFilterForm({ onSuccess }: TicketFilterFormProps) {
  const { appliedFilters, setAppliedFilters, filters } = useTicketFilterStore();

  const filterSchema: GenericFormProps = {
    schema: {
      fields: filters,
    },
  };

  const handleSubmit = (data: Record<string, unknown>) => {
    if (data && !isObjectValueNullOrEmpty(data)) {
      const mappers = [
        {
          key: "fk_department_id",
          values: DepartmentMap,
        },
      ];
      const mappedFilters = generateFilterObject(data, mappers);

      setAppliedFilters({
        rawFilters: data,
        mappedFilters,
      });
    }
    if (onSuccess) onSuccess();
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
        values={appliedFilters.rawFilters}
        strictValidation={false}
      />
    </div>
  );
}
