import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCheckAuth } from "../auth/hooks/useCheckAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
export const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login", { replace: true });
  }, []);

  const status = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
