import { apiRequest } from './apiUtils';

export const authApi = {
  login: (email, password) => apiRequest('/auth/login', 'POST', { email, password }),
  signup: (email, password) => apiRequest('/auth/signup', 'POST', { email, password }),
  logout: () => apiRequest('/auth/logout', 'POST'),
};