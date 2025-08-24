import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";
import { Container } from "../container";

export const StudentWrapper = () => {
  const {
    state: { userType, isLoggedIn },
  } = useAuth();

  if (userType !== "Student" || !isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <Container>
      <Outlet />
    </Container>
  );
};
