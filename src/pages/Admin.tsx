// src/pages/Admin.tsx
import React from "react";
import { useAuth } from "../context/AuthContextDef";


const Admin: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>
      {/* Tutaj możesz dodać formularze do dodawania produktów i postów */}
    </div>
  );
};

export default Admin;
