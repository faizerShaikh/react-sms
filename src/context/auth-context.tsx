import {
  ADMIN_USER_DATA,
  CURRENT_USER_DATA,
  USERS_DATA,
  USER_TYPE,
  getStudentMenus,
  menus,
  TeacherMenus,
  AdminMenus,
  USER_TOKEN,
} from "@/constants";
import { AuthStoreInterface, StudentDataInterface } from "@/interfaces";

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

let userData = localStorage.getItem(CURRENT_USER_DATA)
  ? JSON.parse(localStorage.getItem(CURRENT_USER_DATA)!)
  : null;
let usersData = localStorage.getItem(USERS_DATA)
  ? JSON.parse(localStorage.getItem(USERS_DATA)!)
  : null;
let adminUserData = localStorage.getItem(ADMIN_USER_DATA)
  ? JSON.parse(localStorage.getItem(ADMIN_USER_DATA)!)
  : null;
let userType = localStorage.getItem(USER_TYPE)
  ? localStorage.getItem(USER_TYPE)
  : null;

const initialState: AuthStoreInterface = {
  isLoggedIn: !!userData,
  userData: userType === "Student" ? userData : null,
  teacherData: userType === "Teacher" ? userData : null,
  userType,
  usersData,
  isAdminLoggedIn: !!adminUserData,
  adminUserData: adminUserData,
  menuItems: userType
    ? typeof menus[userType] === "function"
      ? menus[userType](userData)
      : menus[userType]
      ? menus[userType]
      : []
    : [],
  forgotPasswordStep: 1,
  forgotPasswordData: null,
  isOTPValid: null,
};

const AuthContext = createContext<{
  state: AuthStoreInterface;
  setState: React.Dispatch<React.SetStateAction<AuthStoreInterface>>;
  studentLoginSuccess: (
    response: StudentDataInterface & { adm_number: string }
  ) => void;
  teacherLoginSuccess: (data: any) => void;
  setIdCardFilled: () => void;
  setDocumentAdded: () => void;
  studentLogout: () => void;
  setUsersData: (data: StudentDataInterface[]) => void;
  setUserType: (data: string) => void;
  adminLoginSuccess: (data: any) => void;
  adminLogout: () => void;
  teacherLogout: () => void;
  setForgotPasswordStep: (data: number) => void;
  setForgotPasswordData: (data: any) => void;
  setIsOTPValid: (data: boolean) => void;
}>({
  state: initialState,
  setState: () => {},
  studentLoginSuccess: () => {},
  teacherLoginSuccess: () => {},
  setIdCardFilled: () => {},
  setDocumentAdded: () => {},
  studentLogout: () => {},
  setUsersData: () => {},
  setUserType: () => {},
  adminLoginSuccess: () => {},
  adminLogout: () => {},
  teacherLogout: () => {},
  setForgotPasswordStep: () => {},
  setForgotPasswordData: () => {},
  setIsOTPValid: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthStoreInterface>(initialState);

  const navigate = useNavigate();

  const studentLoginSuccess = (
    response: StudentDataInterface & { adm_number: string }
  ) => {
    let newData: any = {
      ...response,
      admissionNumber: response.adm_number,
    };

    let usersData = localStorage.getItem(USERS_DATA) as any;

    if (usersData && usersData.length) {
      if (
        !usersData.find(
          (item: StudentDataInterface) =>
            item.admissionNumber === response.adm_number
        )
      ) {
        usersData.push(newData);
      }
    } else {
      usersData = [newData];
    }

    localStorage.setItem(USERS_DATA, JSON.stringify(usersData));
    localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(newData));
    localStorage.setItem(USER_TOKEN, newData.token);
    localStorage.setItem(USER_TYPE, "Student");

    const redirectUrl = localStorage.getItem("redirectUrl") || "/student/home";

    navigate(redirectUrl);
    setState({
      ...state,
      userType: "Student",
      userData: newData,
      usersData: usersData,
      isLoggedIn: true,
      isAdminLoggedIn: false,
      menuItems: getStudentMenus(),
    });
  };

  const teacherLoginSuccess = (data: any) => {
    setState({
      ...state,
      userData: data,
      isLoggedIn: true,
      isAdminLoggedIn: false,
      menuItems: TeacherMenus,
    });
  };

  const setIdCardFilled = () => {
    setState({
      ...state,
      userData: {
        ...(state.userData as StudentDataInterface),
        is_id_card_filled: true,
      },
    });
  };

  const setDocumentAdded = () => {
    setState({
      ...state,
      userData: {
        ...(state.userData as StudentDataInterface),
        is_document_added: true,
      },
    });
  };

  const studentLogout = () => {
    setState({
      ...state,
      userData: null,
      isLoggedIn: false,
      menuItems: [],
    });
  };

  const setUsersData = (data: StudentDataInterface[]) => {
    setState({
      ...state,
      usersData: data,
    });
  };

  const setUserType = (data: string) => {
    setState({
      ...state,
      userType: data,
    });
  };

  const adminLoginSuccess = (data: any) => {
    setState({
      ...state,
      adminUserData: data,
      isAdminLoggedIn: true,
      menuItems: AdminMenus,
    });
  };

  const adminLogout = () => {
    setState({
      ...state,
      adminUserData: null,
      isAdminLoggedIn: false,
      menuItems: [],
    });
  };

  const teacherLogout = () => {
    setState({
      ...state,
      userData: null,
      isLoggedIn: false,
      menuItems: [],
    });
  };

  const setForgotPasswordStep = (data: number) => {
    setState({
      ...state,
      forgotPasswordStep: data,
    });
  };

  const setForgotPasswordData = (data: any) => {
    setState({
      ...state,
      forgotPasswordData: data,
    });
  };

  const setIsOTPValid = (data: boolean) => {
    setState({
      ...state,
      isOTPValid: data,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        setState,
        studentLoginSuccess,
        teacherLoginSuccess,
        setIdCardFilled,
        setDocumentAdded,
        studentLogout,
        setUsersData,
        setUserType,
        adminLoginSuccess,
        adminLogout,
        teacherLogout,
        setForgotPasswordStep,
        setForgotPasswordData,
        setIsOTPValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
