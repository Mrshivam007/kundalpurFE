import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Adminprivateroute({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  let userrole = sessionStorage.getItem("userrole");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  if (token) {
    return children;
  }

  navigate("/login");
}
