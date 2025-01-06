import { Controller, Control, FieldError } from "react-hook-form";
import { IconButton, Typography, Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FormData } from "../../utils/formSchema";

interface FileUploadProps {
  name: "image";
  control: Control<FormData>;
  error?: FieldError;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ name, control }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange } }) => (
      <Box sx={{ border: "2px dashed", p: 3, textAlign: "center" }}>
        <input
          accept="image/*"
          type="file"
          onChange={(e) => onChange(e.target.files?.[0])}
          style={{ display: "none" }}
          id={`${name}-upload`}
        />
        <label htmlFor={`${name}-upload`}>
          <IconButton component="span">
            <PhotoCamera />
          </IconButton>
          <Typography>Wybierz zdjęcie</Typography>
        </label>
      </Box>
    )}
  />
);

export default FileUploadComponent;
