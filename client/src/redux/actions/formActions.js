// src/redux/actions/formActions.js
import { apiRequest } from '../../api/apiUtils';

export const DOWNLOAD_FORM_REQUEST = 'DOWNLOAD_FORM_REQUEST';
export const DOWNLOAD_FORM_SUCCESS = 'DOWNLOAD_FORM_SUCCESS';
export const DOWNLOAD_FORM_FAILURE = 'DOWNLOAD_FORM_FAILURE';

export const downloadForm = (publicId, fileName) => async (dispatch) => {
  dispatch({ type: DOWNLOAD_FORM_REQUEST });
  
  try {
    const response = await apiRequest(
      `forms/download/${encodeURIComponent(publicId)}`,
      'GET',
      null,
      { Accept: 'application/pdf' }
    );

    // Create blob from response
    const blob = new Blob([response], { type: 'application/pdf' });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    dispatch({ 
      type: DOWNLOAD_FORM_SUCCESS,
      payload: { publicId, fileName }
    });
  } catch (error) {
    console.error('Download error:', error);
    dispatch({ 
      type: DOWNLOAD_FORM_FAILURE,
      payload: error.message 
    });
    throw error;
  }
};


// import { apiRequest } from '../../api/apiUtils';

// export const DOWNLOAD_FORM_REQUEST = 'DOWNLOAD_FORM_REQUEST';
// export const DOWNLOAD_FORM_SUCCESS = 'DOWNLOAD_FORM_SUCCESS';
// export const DOWNLOAD_FORM_FAILURE = 'DOWNLOAD_FORM_FAILURE';

// export const downloadForm = (publicId, fileName) => async (dispatch) => {
//   dispatch({ type: DOWNLOAD_FORM_REQUEST });
  
//   try {
//     const response = await apiRequest(
//       `forms/download/${encodeURIComponent(publicId)}`,
//       'GET',
//       null,
//       { Accept: 'application/pdf' }
//     );

//     // Convert the response to a blob
//     const blob = new Blob([response], { type: 'application/pdf' });
//     const downloadUrl = window.URL.createObjectURL(blob);
    
//     // Create and trigger download
//     const link = document.createElement('a');
//     link.href = downloadUrl;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(downloadUrl);

//     dispatch({ 
//       type: DOWNLOAD_FORM_SUCCESS,
//       payload: { publicId, fileName }
//     });
//   } catch (error) {
//     dispatch({ 
//       type: DOWNLOAD_FORM_FAILURE,
//       payload: error.message 
//     });
//     throw error;
//   }
// };