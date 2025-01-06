import { Box, Button, Container, Paper, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { schema } from "../utils/formSchema";
import type { FormData } from "../utils/formSchema";
import CheckboxComponent from "./forms/CheckboxComponent";
import TextFieldComponent from "./forms/TextFieldComponent";
import QuillEditorComponent from "./forms/QuillEditorComponent";
import FileUploadComponent from "./forms/FileUploadComponent";

const AddProductForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      size: "",
      price: 0,
      paper: false,
      envelope: false,
      collection: false,
      description: "",
      category: "",
      image: undefined, // Handle as needed for files
    },
  });

  const { quill } = useQuill();

  const onSubmit = async (data: FormData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", data.title);
    formDataToSend.append("size", data.size || "");
    formDataToSend.append("price", data.price.toString());
    formDataToSend.append("paper", data.paper ? "true" : "false");
    formDataToSend.append("envelope", data.envelope ? "true" : "false");
    formDataToSend.append("collection", data.collection ? "true" : "false");
    formDataToSend.append("description", data.description || "");
    formDataToSend.append("category", data.category || "");
    formDataToSend.append("image", data.image);

    try {
      const response = await fetch(
        "http://localhost/prezentowe_emocje_backend/add_product.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Wystąpił błąd podczas dodawania produktu");
    }
  };

  quill?.on("text-change", () => {
    const content = quill.root.innerHTML;
    setValue("description", content);
  });

  return (
    <Box>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextFieldComponent
                  name="title"
                  control={control}
                  label="Tytuł"
                  placeholder="Wprowadź tytuł produktu"
                  error={errors.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldComponent
                  name="size"
                  control={control}
                  label="Rozmiar"
                  placeholder="np. 10x15 cm"
                  error={errors.size}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldComponent
                  name="price"
                  control={control}
                  label="Cena"
                  type="number"
                  placeholder="0.00"
                  error={errors.price}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldComponent
                  name="category"
                  control={control}
                  label="Kategoria"
                  placeholder="Wybierz kategorię"
                  error={errors.category}
                />
              </Grid>
            </Grid>
            <CheckboxComponent name="paper" control={control} label="Papier" />
            <CheckboxComponent
              name="envelope"
              control={control}
              label="Koperta"
            />
            <CheckboxComponent
              name="collection"
              control={control}
              label="Kolekcja"
            />
            <QuillEditorComponent
              name="description"
              control={control}
              error={errors.description}
              setValue={setValue}
            />
            <FileUploadComponent
              name="image"
              control={control}
              error={errors.image}
            />
            <Button type="submit" variant="contained">
              Dodaj Produkt
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddProductForm;
