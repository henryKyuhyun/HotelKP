// client/src/redux/authAction.js
import {
  login as loginAction,
  logout as logoutAction,
} from "./slice/authSlice";

export const login = (userRole,userId,token) => { //여기도 Chat 때문에 추가 
  return {
    type: loginAction.type,
    payload: { userRole,userId,token },
    
  };
};

export const logout = () => {
  return {
    type: logoutAction.type,
  };
};

export const setUserRole = (newUserRole) => {
  return {
    type: "SET_USER_ROLE",
    payload: newUserRole,
  };
};
