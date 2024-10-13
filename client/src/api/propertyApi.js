import { apiRequest } from './apiUtils';

export const propertyApi = {
  fetchProperties: () => apiRequest('/admin/properties').catch(error => {
    console.error('Error in fetchProperties:', error);
    throw error;
  }),
  addProperty: (property) => apiRequest('/admin/properties', 'POST', property),
  updateProperty: (id, property) => apiRequest(`/admin/properties/${id}`, 'PUT', property),
  deleteProperty: (id) => apiRequest(`/admin/properties/${id}`, 'DELETE'),
};


// import { apiRequest } from './apiUtils';

// export const propertyApi = {
//   fetchProperties: () => apiRequest('/admin/properties'),
//   addProperty: (property) => apiRequest('admin/properties', 'POST', property),
//   updateProperty: (id, property) => apiRequest(`admin/properties/${id}`, 'PUT', property),
//   deleteProperty: (id) => apiRequest(`admin/properties/${id}`, 'DELETE'),
// };