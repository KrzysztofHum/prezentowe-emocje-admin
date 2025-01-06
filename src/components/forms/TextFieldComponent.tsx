import { Controller, Control, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormData } from "../../utils/formSchema";

interface TextFieldComponentProps {
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
  placeholder?: string;
  type?: string;
  error?: FieldError;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
  error,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        placeholder={placeholder}
        type={type}
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);

export default TextFieldComponent;
