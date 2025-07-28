import { FormFieldProps } from "@/types";
import { FormControl, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const FormTextField = ({ field, error }: FormFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth sx={{ my: 0.5 }}>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value || ""}
            label={field.label}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error}
            multiline={!!field.multiline}
            rows={field.rows || 1}
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
        )}
      />
    </FormControl>
  );
};
