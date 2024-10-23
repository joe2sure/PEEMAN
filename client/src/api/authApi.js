import { apiRequest } from './apiUtils';

export const authApi = {
  login: (email, password) => apiRequest('auth/login', 'POST', { email, password }),
  signup: (username, email, password, confirmPassword) => apiRequest('auth/register', 'POST', { username, email, password, confirmPassword }),
};