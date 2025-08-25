import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet, useSearchParams } from "react-router";

type Props = {};

export function PublicRouteRedirector({}: Props) {
  const {
    state: { isLoggedIn, userType },
  } = useAuth();
  const [params] = useSearchParams();

  if (isLoggedIn && userType !== "Student") {
    return (
      <Navigate to={userType === "Teacher" ? "/teacher/home" : "/admin"} />
    );
  }

  if (isLoggedIn && userType === "Student" && !params.get("add_more")) {
    return <Navigate to='/student/home' />;
  }

  return <Outlet />;
}
