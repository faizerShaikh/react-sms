import { useAuth } from '@/context/auth-context';
import { Navigate, Outlet } from 'react-router';
import { Container } from '../container';

export const StudentWrapper = () => {
  const {
    state: { userType, isLoggedIn },
  } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  if (userType === 'Teacher') {
    window.location.href = '/teacher';
    return;
  }

  if (userType === 'Admin') {
    window.location.href = '/admin';
    return;
  }

  return (
    <Container>
      <Outlet />
    </Container>
  );
};
