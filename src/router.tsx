import { Route, Routes } from 'react-router';
import { PublicRouteRedirector } from './components/public-route-redirector';
import { Landing, Login } from './pages';
import { StudentRouter } from './pages/private/student/router';

export function Router() {
  return (
    <>
      <Routes>
        <Route element={<PublicRouteRedirector />}>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
      <StudentRouter />
    </>
  );
}
