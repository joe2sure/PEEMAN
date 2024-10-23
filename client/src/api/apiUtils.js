const getBaseUrl = () => {
  return process.env.REACT_APP_API_URL || '';
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText || 'An unknown error occurred');
  }
  return response.json();
};

export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const options = {
    method,
    headers: {
      // Don't set Content-Type for FormData
      ...headers,
    },
  };

  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle FormData differently than JSON
  if (body) {
    if (body instanceof FormData) {
      options.body = body;
      // Don't set Content-Type - browser will set it with boundary
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  }

  console.log(`Making ${method} request to ${url}`);

  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};



// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || response.statusText || 'An unknown error occurred');
//   }
//   return response.json();
// };


// export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
//   const options = {
//     method,
//     headers: {
//       // Don't set Content-Type for FormData
//       ...headers,
//     },
//   };

//   const token = localStorage.getItem('token');
//   if (token) {
//     options.headers['Authorization'] = `Bearer ${token}`;
//   }

//   // Handle FormData differently than JSON
//   if (body) {
//     if (body instanceof FormData) {
//       options.body = body;
//       // Don't set Content-Type - browser will set it with boundary
//     } else {
//       options.headers['Content-Type'] = 'application/json';
//       options.body = JSON.stringify(body);
//     }
//   }

//   console.log(`Making ${method} request to ${endpoint}`);

//   try {
//     const response = await fetch(endpoint, options);
//     return handleResponse(response);
//   } catch (error) {
//     console.error('API request failed:', error);
//     throw error;
//   }
// };