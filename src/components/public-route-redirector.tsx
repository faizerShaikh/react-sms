import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";

type Props = {};

export function PublicRouteRedirector({}: Props) {
  const {
    state: { isLoggedIn, userType },
  } = useAuth();

  if (isLoggedIn) {
    return (
      <Navigate
        to={
          userType === "Student"
            ? "/student/home"
            : userType === "Teacher"
            ? "/teacher/home"
            : "/admin"
        }
      />
    );
  }
  return <Outlet />;
}
