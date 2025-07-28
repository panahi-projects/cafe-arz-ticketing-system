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
        <Grid container spacing={2}>
          {schema.fields
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // sort by `order`
            .map((field) => (
              <Grid
                key={field.name}
                size={isMobile ? field.grid?.sm ?? 12 : field.grid?.md ?? 6}
              >
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
        </Grid>
        {/* Buttons */}
        {showButtons && (
          <Grid
            container
            spacing={2}
            sx={{ borderTop: "2px solid #ccc", mt: 2, pt: 2 }}
          >
            {/* Submit Button */}
            <Grid
              // item
              // xs={schema.submitButton?.grid?.xs ?? 12}
              // sm={schema.submitButton?.grid?.sm ?? 6}
              // md={schema.submitButton?.grid?.md ?? 6}
              size={
                isMobile
                  ? schema.submitButton?.grid?.sm ?? 12
                  : schema.submitButton?.grid?.md ?? 6
              }
            >
              <Button
                type="submit"
                fullWidth
                variant={schema.submitButton?.variant ?? "contained"}
                color={schema.submitButton?.color ?? "primary"}
                sx={schema.submitButton?.sx}
              >
                {schema.submitButton?.text ?? "ارسال تیکت"}
              </Button>
            </Grid>

            {/* Reset Button */}
            <Grid
              size={
                isMobile
                  ? schema.submitButton?.grid?.sm ?? 12
                  : schema.submitButton?.grid?.md ?? 6
              }
            >
              <Button
                fullWidth
                variant={schema.resetButton?.variant ?? "outlined"}
                color={schema.resetButton?.color ?? "secondary"}
                onClick={handleReset}
                sx={schema.resetButton?.sx}
              >
                {schema.resetButton?.text ?? "ریست"}
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </FormProvider>
  );
};

export default GenericForm;
