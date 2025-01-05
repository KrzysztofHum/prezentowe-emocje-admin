import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema yup validation
const schema = yup
  .object({
    title: yup.string().required("Tytuł jest wymagany"),
    size: yup.string().optional(),
    price: yup
      .number()
      .required("Cena jest wymagana")
      .positive("Cena musi być dodatnia"),
    paper: yup.boolean().optional(),
    envelope: yup.boolean().optional(),
    collection: yup.boolean().optional(),
    description: yup.string().optional(),
    image: yup.mixed<File>().required("Zdjęcie jest wymagane"),
    category: yup.string().optional(),
  })
  .required();

interface FormData {
  title: string;
  size?: string;
  price: number;
  paper?: boolean;
  envelope?: boolean;
  collection?: boolean;
  description?: string;
  image: File;
  category?: string;
}

const AddProductForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // TODO: Add function to send data to backend
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', p: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
            color: 'white'
          }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Dodaj Nowy Produkt
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Wypełnij poniższy formularz, aby dodać nowy produkt do katalogu
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tytuł"
                      placeholder="Wprowadź tytuł produktu"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Rozmiar"
                      placeholder="np. 10x15 cm"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      inputProps={{ step: "0.01" }}
                      label="Cena"
                      placeholder="0.00"
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Kategoria"
                      placeholder="Wybierz kategorię"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                Opcje dodatkowe
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="paper"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            {...field}
                          />
                        }
                        label="Papier"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name="envelope"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            {...field}
                          />
                        }
                        label="Koperta"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name="collection"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            {...field}
                          />
                        }
                        label="Kolekcja"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Opis"
                    placeholder="Wprowadź opis produktu..."
                  />
                )}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                Zdjęcie
              </Typography>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <Box
                    sx={{
                      border: '2px dashed',
                      borderColor: 'grey.300',
                      borderRadius: 1,
                      p: 3,
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'grey.50'
                      }
                    }}
                  >
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <IconButton component="span" sx={{ mb: 1 }}>
                        <PhotoCamera sx={{ fontSize: 40, color: 'grey.500' }} />
                      </IconButton>
                      <Typography variant="body2" color="textSecondary">
                        Wybierz zdjęcie
                      </Typography>
                    </label>
                  </Box>
                )}
              />
              {errors.image && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.image.message}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #7b1fa2 90%)'
                }
              }}
            >
              Dodaj Produkt
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddProductForm;
