// src/pages/Register.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // Używamy navigate, aby przekierować po rejestracji

// Walidacja za pomocą yup
const schema = yup
  .object({
    username: yup
      .string()
      .required("Nazwa użytkownika jest wymagana")
      .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki"),
    // email: yup
    //   .string()
    //   .required("Email jest wymagany")
    //   .email("Nieprawidłowy format adresu email"),
    password: yup
      .string()
      .required("Hasło jest wymagane")
      .min(5, "Hasło musi mieć co najmniej 5 znaków"),
    confirmPassword: yup
      .string()
      .required("Potwierdzenie hasła jest wymagane")
      .oneOf([yup.ref("password")], "Hasła muszą być takie same"),
  })
  .required();

interface RegisterFormData {
  username: string;
  // email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate(); // do nawigacji po udanej rejestracji
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      // email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch(
        "http://localhost/prezentowe_emocje_backend/register.php", // Zmieniamy endpoint na rejestrację
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: data.username,
            // email: data.email,
            password: data.password,
            confirm_password: data.confirmPassword,
          }).toString(),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Rejestracja zakończona sukcesem!");
        navigate("/login"); // Przekierowanie na stronę logowania po rejestracji
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Rejestracja nie powiodła się:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 4,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Zarejestruj się
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Pole użytkownika */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nazwa użytkownika"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        {/* Pole email */}
        {/* <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        /> */}

        {/* Pole hasło */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Hasło"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Potwierdzenie hasła */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Potwierdź hasło"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Zarejestruj się
        </Button>
      </form>
    </Box>
  );
}
