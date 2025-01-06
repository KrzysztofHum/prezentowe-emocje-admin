import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { FieldError, Control, UseFormSetValue } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import type { FormData } from "../../utils/formSchema";

interface QuillEditorProps {
  name: "description";
  control: Control<FormData>;
  error?: FieldError;
  setValue: UseFormSetValue<FormData>;
}

const QuillEditorComponent: React.FC<QuillEditorProps> = ({
  name,
  error,
  setValue,
}) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        setValue(name, content);
      });
    }
  }, [quill, setValue, name]);

  return (
    <Box>
      <div ref={quillRef} style={{ height: 200, backgroundColor: "white" }} />
      {error && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default QuillEditorComponent;
