import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Landing, Login } from "@/pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthProvider } from "./context/auth-context";
import { StudentWrapper } from "./components/protected-route-wrapper/student-wrapper";
import StudentHome from "./pages/private/student/student-home";
import { PublicRouteRedirector } from "./components/public-route-redirector";
import { FeesDetail } from "./pages/private/student/admission/fees-detail";
import { MyProfile } from "./pages/private/student/my-profile";
import { PWAInstallButton } from "./components/pwa-install-button";
import { PWAUpdateNotification } from "./components/pwa-update-notification";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err: any) => {
        let errorMsg = "Server Error";
        console.log(err);

        if (err instanceof AxiosError) {
          const data = err.response?.data;
          if ("logout" in data && data["logout"]) {
            if ("teacher" in data && data["teacher"]) {
              // TODO: logout teacher
              // return of(authActions.teacherLogout());
            } else if ("student" in data && data["student"]) {
              // TODO: logout student
              // return of(
              //     authActions.removeUser({
              //         data: null,
              //     }),
              // );
            }
          } else if (typeof data === "object") {
            if ("msg" in data) {
              errorMsg += ` :- ${data["msg"]}`;
            } else if ("error" in data) {
              errorMsg += ` :- ${data["error"]}`;
            } else {
              let errors: Record<string, any> = {};
              for (const [key, value] of Object.entries(data)) {
                if (value) {
                  errors[key] = value;
                }
              }

              if (Object.keys(errors).length) {
                let key = Object.keys(errors)[0];
                if (
                  !Array.isArray(errors[key]) &&
                  Object.keys(errors[key]).length
                ) {
                  let subKey = Object.keys(errors[key])[0];

                  errorMsg += ` :- ${
                    (errors[key] as any)[subKey][0]
                  }(${key}.${subKey})`;
                } else if (errors[key][0]) {
                  errorMsg += ` :- ${errors[key][0]}(${key})`;
                }
              }
            }
          } else {
            errorMsg += ":- Something went worng";
          }
        } else {
          errorMsg = `Client Error :- ${err?.message}`;
        }

        toast.error(errorMsg);
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PublicRouteRedirector />}>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/student' element={<StudentWrapper />}>
              <Route path='home' element={<StudentHome />} />
              <Route path='my-profile' element={<MyProfile />} />
              <Route path='admission'>
                <Route path='fees' element={<FeesDetail />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position='top-center' richColors closeButton />
      <PWAInstallButton />
      <PWAUpdateNotification />
    </QueryClientProvider>
  );
}

export default App;
