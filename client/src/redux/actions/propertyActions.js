import { propertyApi } from '../../api';
import { setProperties, addProperty, updateProperty, deleteProperty, setLoading, setError } from '../reducers/propertyReducer';


export const fetchProperties = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.fetchProperties();
    const validProperties = Array.isArray(response.data) ? response.data : [];
    dispatch(setProperties(validProperties));
    return { success: true, data: validProperties };
  } catch (error) {
    console.error('Error fetching properties:', error);
    dispatch(setError(error.message || 'An error occurred while fetching properties'));
    dispatch(setProperties([])); // Ensure properties is always an array
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewProperty = (propertyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.addProperty(propertyData);
    dispatch(addProperty(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding property:', error);
    throw new Error(error.message || 'Failed to add property');
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateExistingProperty = (id, propertyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await propertyApi.updateProperty(id, propertyData);
    dispatch(updateProperty(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating property:', error);
    throw new Error(error.message || 'Failed to update property');
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteExistingProperty  = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await propertyApi.deleteProperty(id);
    dispatch(deleteProperty(id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    throw new Error(error.message || 'Failed to delete property');
  } finally {
    dispatch(setLoading(false));
  }
};


// export const fetchProperties = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await propertyApi.fetchProperties();
//     dispatch(setProperties(response.data));
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     dispatch(setError(error.message || 'An error occurred while fetching properties'));
//     return { success: false, error: error.message };
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const addNewProperty = (propertyData) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await propertyApi.addProperty(propertyData);
//     dispatch(addProperty(response.data));
//     return { success: true };
//   } catch (error) {
//     console.error('Error adding property:', error);
//     dispatch(setError(error.message || 'An error occurred'));
//     return { success: false, message: error.message || 'Failed to add property' };
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const updateExistingProperty = (id, propertyData) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await propertyApi.put(`/properties/${id}`, propertyData);
//     dispatch(updateProperty(response.data.data));
//     return { success: true };
//   } catch (error) {
//     dispatch(setError(error.response?.data?.message || 'An error occurred'));
//     return { success: false, message: error.response?.data?.message || 'Failed to update property' };
//   }
// };

// export const deleteExistingProperty = (id) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     await propertyApi.delete(`/properties/${id}`);
//     dispatch(deleteProperty(id));
//     return { success: true };
//   } catch (error) {
//     dispatch(setError(error.response?.data?.message || 'An error occurred'));
//     return { success: false, message: error.response?.data?.message || 'Failed to delete property' };
//   }
// };
