import {
  ADMIN_USER_DATA,
  AdminMenus,
  CURRENT_USER_DATA,
  TeacherMenus,
  USERS_DATA,
  USER_TOKEN,
  USER_TYPE,
  getStudentMenus,
  menus,
} from '@/constants';
import { AuthStoreInterface, StudentDataInterface } from '@/interfaces';

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const getInitialState = () => {
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
    userData: userType === 'Student' ? userData : null,
    teacherData: userType === 'Teacher' ? userData : null,
    userType,
    usersData,
    isAdminLoggedIn: !!adminUserData,
    adminUserData: adminUserData,
    menuItems: userType
      ? typeof menus[userType] === 'function'
        ? menus[userType](userData)
        : menus[userType]
          ? menus[userType]
          : []
      : [],
    forgotPasswordStep: 1,
    forgotPasswordData: null,
    isOTPValid: null,
  };
  return initialState;
};

const AuthContext = createContext<{
  state: AuthStoreInterface;
  setState: React.Dispatch<React.SetStateAction<AuthStoreInterface>>;
  studentLoginSuccess: (
    response: StudentDataInterface & { adm_number: string },
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
  removeUser: (data: StudentDataInterface | null) => void;
  logout: () => void;
  setCurrentUser: (data: StudentDataInterface) => void;
}>({
  state: getInitialState(),
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
  removeUser: () => {},
  logout: () => {},
  setCurrentUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthStoreInterface>(getInitialState());

  const navigate = useNavigate();

  const studentLoginSuccess = (
    response: StudentDataInterface & { adm_number: string },
  ) => {
    let newData: any = {
      ...response,
      admissionNumber: response.adm_number,
    };

    let usersData = JSON.parse(localStorage.getItem(USERS_DATA)!) || [];

    if (usersData && usersData.length) {
      if (
        !usersData.find(
          (item: StudentDataInterface) =>
            item.admissionNumber === response.adm_number,
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
    localStorage.setItem(USER_TYPE, 'Student');

    const redirectUrl = localStorage.getItem('redirectUrl') || '/student/home';

    navigate(redirectUrl);
    setState({
      ...state,
      userType: 'Student',
      userData: newData,
      usersData: usersData,
      isLoggedIn: true,
      isAdminLoggedIn: false,
      menuItems: getStudentMenus(newData),
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
    let userData = {
      ...(state.userData as StudentDataInterface),
      is_id_card_filled: true,
    };
    localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(userData));
    setState({
      ...state,
      userData: userData,
    });
  };

  const setDocumentAdded = () => {
    let userData = {
      ...(state.userData as StudentDataInterface),
      is_document_added: true,
    };
    localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(userData));
    setState({
      ...state,
      userData: userData,
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

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    setState(getInitialState());
  };

  const removeUser = (data: StudentDataInterface | null) => {
    let currentUser = data ? data : state.userData;
    let usersData = state.usersData ? state.usersData : [];
    usersData = usersData.filter(
      (profile) => profile.admissionNumber !== currentUser!.admissionNumber,
    );
    localStorage.setItem(USERS_DATA, JSON.stringify(usersData));

    if (!usersData.length) {
      return logout();
    }

    setState({
      ...state,
      userData: usersData[0],
      usersData: usersData,
    });
  };

  const setCurrentUser = (data: StudentDataInterface) => {
    localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(data));
    localStorage.setItem(USER_TOKEN, data.token);
    setState({
      ...state,
      userData: data,
    });
    navigate('/student/home');
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
        removeUser,
        logout,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
