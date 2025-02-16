import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import propertyReducer from './reducers/propertyReducer';
import formReducer from './reducers/formReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    form: formReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;