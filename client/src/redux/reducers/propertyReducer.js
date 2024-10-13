import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProperty: (state, action) => {
      state.properties.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateProperty: (state, action) => {
      const index = state.properties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(p => p.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setProperties, 
  addProperty, 
  updateProperty, 
  deleteProperty, 
  setLoading, 
  setError 
} = propertySlice.actions;

export default propertySlice.reducer;




// // src/redux/reducers/propertyReducer.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   properties: [],
//   loading: false,
//   error: null,
// };

// const propertySlice = createSlice({
//   name: 'property',
//   initialState,
//   reducers: {
//     setProperties: (state, action) => {
//       state.properties = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     addProperty: (state, action) => {
//       state.properties.push(action.payload);
//     },
//     updateProperty: (state, action) => {
//       const index = state.properties.findIndex(p => p.id === action.payload.id);
//       if (index !== -1) {
//         state.properties[index] = action.payload;
//       }
//     },
//     deleteProperty: (state, action) => {
//       state.properties = state.properties.filter(p => p.id !== action.payload);
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { setProperties, addProperty, updateProperty, deleteProperty, setLoading, setError } = propertySlice.actions;
// export default propertySlice.reducer;