"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Button, useMediaQuery } from "@mui/material";
import {
  FormFieldAttributes,
  generateValidationSchema,
  GenericFormProps,
} from "@/types";
import { FormTextField } from "./fields/FormTextField";
import { FormSelectField } from "./fields/FormSelectField";

const GenericForm: React.FC<GenericFormProps> = ({
  schema,
  values,
  onSubmit,
  onSuccess,
  strictValidation = true,
  showButtons = true,
  column = { sm: 12, md: 6 },
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const validationSchema = generateValidationSchema(
    schema.fields,
    strictValidation
  );
  const methods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...schema.fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {} as Record<string, unknown>),
      ...(values || {}),
    },
  });

  const { handleSubmit, reset } = methods;

  const handleReset = () => {
    const resetValues = schema.fields.reduce((acc, field) => {
      acc[field.name] =
        field.type === "select" &&
        (field.attr as FormFieldAttributes)?.select_type === "multiple"
          ? []
          : "";
      return acc;
    }, {} as Record<string, unknown>);

    reset(resetValues);
  };

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2} columns={12}>
          {schema.fields.map((field) => (
            <Grid key={field.name} size={!isMobile ? column.md : column.sm}>
              {field.type === "text" ? (
                <FormTextField
                  field={field}
                  error={
                    methods.formState.errors[field.name]?.message as string
                  }
                />
              ) : field.type === "select" ? (
                <FormSelectField
                  field={field}
                  error={
                    methods.formState.errors[field.name]?.message as string
                  }
                />
              ) : null}
            </Grid>
          ))}
          {showButtons && (
            <Grid
              container
              spacing={2}
              columns={16}
              size={16}
              sx={{
                borderTop: "2px solid",
                borderColor: "gray.300",
                pt: 2,
                mt: 2,
              }}
            >
              <Grid size={8}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    py: 1.2,
                  }}
                >
                  {(schema.submitButton && schema.submitButton?.text) ||
                    "جستجو"}
                </Button>
              </Grid>
              <Grid size={8}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleReset}
                  color="secondary"
                  sx={{
                    borderRadius: "8px",
                    py: 1,
                  }}
                >
                  ریست
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default GenericForm;
