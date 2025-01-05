// src/pages/Admin.tsx
import React from "react";
import { useAuth } from "../context/AuthContextDef";
import AddProductForm from "../components/AddProductForm";

const Admin: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>
      <AddProductForm />
    </div>
  );
};

export default Admin;
