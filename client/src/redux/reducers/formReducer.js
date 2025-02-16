// src/redux/reducers/formReducer.js
import {
    DOWNLOAD_FORM_REQUEST,
    DOWNLOAD_FORM_SUCCESS,
    DOWNLOAD_FORM_FAILURE
  } from '../actions/formActions';
  
  const initialState = {
    downloading: false,
    error: null,
    lastDownloaded: null
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case DOWNLOAD_FORM_REQUEST:
        return {
          ...state,
          downloading: true,
          error: null
        };
      case DOWNLOAD_FORM_SUCCESS:
        return {
          ...state,
          downloading: false,
          error: null,
          lastDownloaded: action.payload
        };
      case DOWNLOAD_FORM_FAILURE:
        return {
          ...state,
          downloading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default formReducer;