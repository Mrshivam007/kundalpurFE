import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function PrivateRoutes({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  console.log("tpken", token);
  if (token) {
    return children;
  }

  navigate("/login");
}
