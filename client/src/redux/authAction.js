import axios from "axios";
import { 
  login as loginAction, 
  logout as logoutAction,
  withdrawal as withdrawalAction,
} from "./slice/authSlice";


const apiDeleteAccount = async(token) => {
  console.log("token in apiDeleteAccount: ", token);

  const config = {
    headers: { Authorization: `Bearer ${token}`}
  };

  try {
    const response = await axios.delete('/api/withdrawal', config);
    console.log("response in apiDeleteAccount: ", response);

    return response.data;
  } catch (error) {
    console.error("Error message: ", error.message);
    console.error("Error stack: ", error.stack);
    throw error;
  }
};

const apiLogout = async(token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  };
  try {
    const response = await axios.post('/api/logout',{},config);
    return response.data;
  }catch(error){
    console.error(error,"여기서왜에러가가가가가가가");
    throw error;
  }
};



export const login = (userRole,userId,token) => {
  return {
    type: loginAction.type,
    payload: { userRole,userId,token },
  };
};

export const logout = () =>async(dispatch, getState) => {
  const { token } = getState().auth;  //Redux state에서 token 가져오기

  try {
    // 서버에 로그아웃 요청
    console.log("Calling apiDeleteAccount:::::::");
    await apiLogout(token);
    dispatch({type: logoutAction.type});
    console.log("token in apiDeleteAccount:::::: ", token);
  
  } catch (error) {
    console.error(error);
  }
};

export const withdrawal = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  console.log("token in withdrawal action: ", token);

  try {
    // 서버함수로 회원탈퇴
    await apiDeleteAccount(token);
    console.log("token in apiDeleteAccount: ", token);

    dispatch({type: withdrawalAction.type});
  } catch(error){
    console.error(error);
  }
}


export const setUserRole = (newUserRole) => {
  return {
    type: "SET_USER_ROLE",
    payload: newUserRole,
  };
};