import { apiRequest } from './apiUtils';

export const propertyApi = {
  fetchProperties: () => apiRequest('/properties'),
  addProperty: (property) => apiRequest('/properties', 'POST', property),
  updateProperty: (id, property) => apiRequest(`/properties/${id}`, 'PUT', property),
  deleteProperty: (id) => apiRequest(`/properties/${id}`, 'DELETE'),
};