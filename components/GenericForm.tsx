"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";

interface FormFieldOption {
  _id: string | number;
  value: string;
}

interface FormFieldAttributes {
  select_type?: "single" | "multiple";
  [key: string]: unknown;
}

export interface FormField {
  type: string;
  name: string;
  label: string;
  value: string | number | (string | number)[];
  options: FormFieldOption[];
  attr: FormFieldAttributes | unknown[];
}

export interface GenericFormProps {
  schema: {
    filters: FormField[];
  };
  onSubmit?: (data: Record<string, unknown>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ schema, onSubmit }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const generateValidationSchema = () => {
    const schemaObj: Record<string, z.ZodTypeAny> = {};

    schema.filters.forEach((field) => {
      if (field.type === "text") {
        let validator = z.string().optional();

        // Add specific validations based on field name
        if (field.name === "email") {
          validator = validator.refine(
            (val) => !val || z.string().email().safeParse(val).success,
            "فرمت ایمیل نامعتبر است"
          );
        } else if (field.name === "mobile") {
          validator = validator.refine(
            (val) => !val || /^09\d{9}$/.test(val),
            "فرمت موبایل نامعتبر است (مثال: 09123456789)"
          );
        } else if (field.name === "national_code") {
          validator = validator.refine(
            (val) => !val || /^\d{10}$/.test(val),
            "کد ملی باید 10 رقم باشد"
          );
        } else if (field.name === "ip_address") {
          validator = validator.refine(
            (val) =>
              !val ||
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                val
              ),
            "فرمت آدرس IP نامعتبر است"
          );
        }

        schemaObj[field.name] = validator;
      }
    });

    return z.object(schemaObj);
  };

  const validationSchema = generateValidationSchema();
  type FormData = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: schema.filters.reduce((acc, field) => {
      acc[field.name as keyof FormData] = field.value;
      return acc;
    }, {} as FormData),
  });

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
      <Grid container spacing={2} columns={16}>
        {schema.filters.map((field) => (
          <Grid key={field.name} size={!isMobile ? 8 : 16}>
            {field.type === "text" ? (
              <FormControl fullWidth sx={{ my: 0.5 }}>
                <TextField
                  {...register(field.name as keyof FormData)}
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  error={!!errors[field.name as keyof FormData]}
                  helperText={
                    errors[field.name as keyof FormData]?.message as string
                  }
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      position: "relative",
                      transformOrigin: "top right",
                      left: "unset",
                      right: 0,
                      top: -10,
                      transform: "none",
                      textAlign: "right",
                      width: "100%",
                      fontSize: 12,
                    },
                  }}
                  sx={{
                    position: "relative",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      p: 0,
                      "& fieldset": {
                        bgcolor: "background.paper",
                        "& legend": {
                          display: "none",
                        },
                      },
                    },
                    "& .MuiInputBase-input": {
                      px: 2,
                      py: 0.5,
                      zIndex: 9,
                    },
                  }}
                />
              </FormControl>
            ) : field.type === "select" ? (
              <FormControl
                fullWidth
                error={!!errors[field.name as keyof FormData]}
              >
                <InputLabel
                  shrink
                  sx={{
                    position: "relative",
                    transformOrigin: "top right",
                    left: "unset",
                    right: 0,
                    top: -10,
                    transform: "none",
                    textAlign: "right",
                    width: "100%",
                    fontSize: 12,
                  }}
                >
                  {field.label}
                </InputLabel>
                <Select
                  {...register(field.name as keyof FormData)}
                  defaultValue={field.value}
                  multiple={
                    (field.attr as FormFieldAttributes)?.select_type ===
                    "multiple"
                      ? true
                      : false
                  }
                  sx={{
                    position: "relative",
                    borderRadius: "8px",
                    bgcolor: "background.paper",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        "& legend": {
                          display: "none",
                        },
                      },
                    },
                    "& .MuiInputBase-input": {
                      px: 2,
                      py: 1,
                      zIndex: 9,
                    },
                  }}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.name as keyof FormData] && (
                  <FormHelperText>
                    {errors[field.name as keyof FormData]?.message as string}
                  </FormHelperText>
                )}
              </FormControl>
            ) : null}
          </Grid>
        ))}
        <Grid
          container
          spacing={2}
          columns={16}
          size={16}
          sx={{ borderTop: "2px solid", borderColor: "gray.300", pt: 2, mt: 2 }}
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
              جستجو
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
      </Grid>
    </form>
  );
};

export default GenericForm;
