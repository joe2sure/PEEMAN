import { apiRequest } from './apiUtils';

export const propertyApi = {
  fetchProperties: () => apiRequest('/properties'),
  addProperty: (propertyData) => apiRequest('/admin/properties', 'POST', propertyData),
  updateProperty: (id, propertyData) => apiRequest(`/admin/properties/${id}`, 'PUT', propertyData),
  deleteProperty: (id) => apiRequest(`/admin/properties/${id}`, 'DELETE'),
};