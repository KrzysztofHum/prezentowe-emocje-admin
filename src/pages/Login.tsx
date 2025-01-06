// src/pages/Login.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContextDef";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Nazwa użytkownika jest wymagana"),
    password: yup
      .string()
      .required("Hasło jest wymagane")
      .min(5, "Hasło musi mieć co najmniej 5 znaków"),
  })
  .required();

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(
        "http://localhost/prezentowe_emocje_backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: data.username, // Zamiast JSON, wysyłasz dane w formie URL-encoded
            password: data.password,
          }).toString(),
        }
      );
      const result = await response.json();
      if (response.ok) {
        login(result.token);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
        Zaloguj się
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Zaloguj się
        </Button>
      </form>
    </Box>
  );
}
