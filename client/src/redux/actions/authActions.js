import { setUser, logout, setLoading, setError } from '../reducers/authReducer';
import { authApi } from '../../api';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.login(email, password);
    dispatch(setUser(data.user));
    localStorage.setItem('token', data.token);

    // Clear any previous errors on success
    dispatch(setError(null));

    return { success: true, message: "Login successful" };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, message: error.message || "An error occurred during login" };
  } finally {
    dispatch(setLoading(false));
  }
};

export const signupUser = (username, email, password, confirmPassword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.signup(username, email, password, confirmPassword);
    dispatch(setUser(data.user));
    localStorage.setItem('token', data.token);

    // Clear any previous errors on success
    dispatch(setError(null));

    return { success: true, message: "Signup successful" };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, message: error.message || "An error occurred during signup" };
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());

  // Clear any previous errors
  dispatch(setError(null));

  return { success: true, message: "Logout successful" };
};
