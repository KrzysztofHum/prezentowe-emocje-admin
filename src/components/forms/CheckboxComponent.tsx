import { Controller, Control } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormData } from "../../utils/formSchema";

type BooleanFields = Extract<
  keyof FormData,
  keyof {
    [K in keyof FormData]: FormData[K] extends boolean | undefined ? K : never;
  }
>;

interface CheckboxComponentProps {
  name: BooleanFields; // Ensures only boolean fields are used
  control: Control<FormData>;
  label: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  name,
  control,
  label,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange, ...field } }) => (
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            {...field}
          />
        }
        label={label}
      />
    )}
  />
);

export default CheckboxComponent;
