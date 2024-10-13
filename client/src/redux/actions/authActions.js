import { setUser, logout, setLoading, setError } from '../reducers/authReducer';
import { authApi } from '../../api';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.login(email, password);
    dispatch(setUser(data.user));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, message: error.message };
  }
};

export const signupUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.signup(email, password);
    dispatch(setUser(data.user));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, message: error.message };
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await authApi.logout();
    dispatch(logout());
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, message: error.message };
  }
};





// import { setUser, logout } from '../reducers/authReducer';
// import { authApi } from '../../api';

// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     const data = await authApi.login(email, password);
//     dispatch(setUser(data.user));
//     return { success: true };
//   } catch (error) {
//     console.error('Login error:', error);
//     return { success: false, message: error.message };
//   }
// };

// export const signupUser = (email, password) => async (dispatch) => {
//   try {
//     const data = await authApi.signup(email, password);
//     dispatch(setUser(data.user));
//     return { success: true };
//   } catch (error) {
//     console.error('Signup error:', error);
//     return { success: false, message: error.message };
//   }
// };

// export const logoutUser = () => async (dispatch) => {
//   try {
//     await authApi.logout();
//     dispatch(logout());
//     return { success: true };
//   } catch (error) {
//     console.error('Logout error:', error);
//     return { success: false, message: error.message };
//   }
// };