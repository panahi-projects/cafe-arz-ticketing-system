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
}

export interface GenericFormProps {
  schema: {
    submitButton?: {
      text: string;
    };
    fields: FormField[];
  };
  values?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void;
  onSuccess?: () => void;
  strictValidation?: boolean;
}

export type FormData = z.infer<ReturnType<typeof generateValidationSchema>>;

export interface FormFieldProps {
  field: FormField;
  error?: string;
}
export const generateValidationSchema = (
  fields: FormField[],
  strictValidation = true
) => {
  const schemaObj: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "text") {
      let validator = z.string().optional();

      if (strictValidation) {
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
      } else {
        // Basic type validation only
        if (field.name === "mobile" || field.name === "national_code") {
          validator = validator.refine(
            (val) => !val || /^\d*$/.test(val),
            "فقط عدد مجاز است"
          );
        }
      }

      schemaObj[field.name] = validator;
    } else if (field.type === "select") {
      schemaObj[field.name] = z
        .union([
          z.string(),
          z.number(),
          z.array(z.union([z.string(), z.number()])),
        ])
        .optional();
    }
  });

  return z.object(schemaObj);
};
