import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContextDef";
import AddProductForm from "../components/AddProductForm";

const Admin: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1024px",
          }}
        >
          <AddProductForm />
        </Box>
      </Container>
    </div>
  );
};

export default Admin;
