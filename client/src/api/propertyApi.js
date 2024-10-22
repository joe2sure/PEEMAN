import { apiRequest } from './apiUtils';

export const propertyApi = {
  fetchProperties: () => apiRequest('/properties'),
  addProperty: (propertyData) => apiRequest('/admin/properties', 'POST', propertyData),
  updateProperty: (id, propertyData) => apiRequest(`/admin/properties/${id}`, 'PUT', propertyData),
  deleteProperty: (id) => apiRequest(`/admin/properties/${id}`, 'DELETE'),
};


// import { apiRequest } from './apiUtils';

// export const propertyApi = {
//   fetchProperties: () => apiRequest('/properties').catch(error => {
//     console.error('Error in fetchProperties:', error);
//     throw error;
//   }),
//   addProperty: (property) => apiRequest('/admin/properties', 'POST', property),
//   updateProperty: (id, property) => apiRequest(`/admin/properties/${id}`, 'PUT', property),
//   deleteProperty: (id) => apiRequest(`/admin/properties/${id}`, 'DELETE'),
// };