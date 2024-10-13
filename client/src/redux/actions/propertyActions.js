import { propertyApi } from '../../api';
import { setProperties, addProperty, updateProperty, deleteProperty, setLoading, setError } from '../reducers/propertyReducer';


export const fetchProperties = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.fetchProperties();
    dispatch(setProperties(response.data));
  } catch (error) {
    console.error('Error fetching properties:', error);
    dispatch(setError(error.message || 'An error occurred while fetching properties'));
  } finally {
    dispatch(setLoading(false));
  }
};


// export const fetchProperties = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await propertyApi.get('/properties');
//     dispatch(setProperties(response.data.data));
//   } catch (error) {
//     dispatch(setError(error.response?.data?.message || 'An error occurred'));
//   }
// };

export const addNewProperty = (propertyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.post('/properties', propertyData);
    dispatch(addProperty(response.data.property));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'An error occurred'));
    return { success: false, message: error.response?.data?.message || 'Failed to add property' };
  }
};

export const updateExistingProperty = (id, propertyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.put(`/properties/${id}`, propertyData);
    dispatch(updateProperty(response.data.data));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'An error occurred'));
    return { success: false, message: error.response?.data?.message || 'Failed to update property' };
  }
};

export const deleteExistingProperty = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await propertyApi.delete(`/properties/${id}`);
    dispatch(deleteProperty(id));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'An error occurred'));
    return { success: false, message: error.response?.data?.message || 'Failed to delete property' };
  }
};