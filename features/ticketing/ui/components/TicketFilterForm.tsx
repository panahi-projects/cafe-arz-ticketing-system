"use client";
import GenericForm from "@/components/form/GenericForm";
import { isObjectValueNullOrEmpty } from "@/lib/utils";
import { GenericFormProps } from "@/types";
import { Typography } from "@mui/material";
import { DepartmentMap } from "../../constants";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import { generateFilterObject } from "../../lib";
import { TicketFilterFormProps } from "../../types";

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
