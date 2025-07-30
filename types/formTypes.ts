import { SxProps, Theme } from "@mui/material";
import { z } from "zod";

export interface FormFieldOption {
  _id: string | number;
  value: string;
}

export interface FormFieldAttributes {
  select_type?: "single" | "multiple";
  [key: string]: unknown;
}

export interface FormField {
  type: string;
  name: string;
  label: string;
  value: string | number | (string | number)[];
  options?: FormFieldOption[];
  attr?: FormFieldAttributes | unknown[];
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  multiline?: boolean;
  rows?: number;
  order?: number;
  isRequired?: boolean;
}

export type ButtonConfig = {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  grid?: {
    sm?: number;
    md?: number;
  };
  sx?: SxProps<Theme>;
};

export interface GenericFormProps {
  schema: {
    submitButton?: ButtonConfig;
    resetButton?: ButtonConfig;
    fields: FormField[];
  };
  values?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void;
  onSuccess?: () => void;
  strictValidation?: boolean;
  showButtons?: boolean;
  column?: {
    sm: number;
    md: number;
  };
}

export type FormData = z.infer<ReturnType<typeof generateValidationSchema>>;

export interface FormFieldProps {
  field: FormField;
  error?: string;
  errorSx?: SxProps<Theme>;
}
export const generateValidationSchema = (
  fields: FormField[],
  strictValidation = true
) => {
  const schemaObj: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "text") {
      let validator = field.isRequired
        ? z.string().min(1, `${field.label} اجباری است`)
        : z.string().optional();

      if (strictValidation) {
        if (field.name === "email") {
          validator = field.isRequired
            ? z
                .string()
                .email("فرمت ایمیل نامعتبر است")
                .min(1, `${field.label} اجباری است`)
            : z.string().email("فرمت ایمیل نامعتبر است").optional();
        } else if (field.name === "mobile") {
          validator = field.isRequired
            ? z
                .string()
                .min(1, `${field.label} اجباری است`)
                .refine(
                  (val) => /^09\d{9}$/.test(val),
                  "فرمت موبایل نامعتبر است (مثال: 09123456789)"
                )
            : z
                .string()
                .refine(
                  (val) => !val || /^09\d{9}$/.test(val),
                  "فرمت موبایل نامعتبر است (مثال: 09123456789)"
                )
                .optional();
        } else if (field.name === "national_code") {
          validator = field.isRequired
            ? z
                .string()
                .min(1, `${field.label} اجباری است`)
                .refine(
                  (val) => /^\d{10}$/.test(val),
                  "کد ملی باید 10 رقم باشد"
                )
            : z
                .string()
                .refine(
                  (val) => !val || /^\d{10}$/.test(val),
                  "کد ملی باید 10 رقم باشد"
                )
                .optional();
        } else if (field.name === "ip_address") {
          validator = field.isRequired
            ? z
                .string()
                .min(1, `${field.label} اجباری است`)
                .refine(
                  (val) =>
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                      val
                    ),
                  "فرمت آدرس IP نامعتبر است"
                )
            : z
                .string()
                .refine(
                  (val) =>
                    !val ||
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                      val
                    ),
                  "فرمت آدرس IP نامعتبر است"
                )
                .optional();
        }
      } else {
        // Basic type validation only
        if (field.name === "mobile" || field.name === "national_code") {
          validator = field.isRequired
            ? z
                .string()
                .min(1, `${field.label} اجباری است`)
                .refine((val) => /^\d*$/.test(val), "فقط عدد مجاز است")
            : z
                .string()
                .refine((val) => !val || /^\d*$/.test(val), "فقط عدد مجاز است")
                .optional();
        }
      }

      schemaObj[field.name] = validator;
    } else if (field.type === "select") {
      if (field.isRequired) {
        if ((field.attr as FormFieldAttributes)?.select_type === "multiple") {
          schemaObj[field.name] = z
            .array(z.union([z.string(), z.number()]))
            .min(1, `${field.label} اجباری است`);
        } else {
          schemaObj[field.name] = z.union([z.string(), z.number()]).refine(
            (val) => {
              if (val === undefined || val === null) return false;
              if (typeof val === "string") return val.trim().length > 0;
              return true;
            },
            {
              message: `${field.label} اجباری است`,
            }
          );
        }
      } else {
        schemaObj[field.name] = z
          .union([
            z.string(),
            z.number(),
            z.array(z.union([z.string(), z.number()])),
          ])
          .optional();
      }
    }
  });

  return z.object(schemaObj);
};
