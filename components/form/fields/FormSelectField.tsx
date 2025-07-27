import { FormField, FormFieldAttributes } from "@/types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface FormSelectFieldProps {
  field: FormField;
  error?: string;
}

export const FormSelectField = ({ field, error }: FormSelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth error={!!error}>
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
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={value ?? ""}
            multiple={
              (field.attr as FormFieldAttributes)?.select_type === "multiple"
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
            {field.options?.map((option) => (
              <MenuItem key={option._id.toString()} value={option._id}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
