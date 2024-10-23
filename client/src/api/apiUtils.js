const getBaseUrl = () => {
  return process.env.REACT_APP_API_URL || '';
};

const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to parse error as JSON, fallback to text if that fails
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    } catch (e) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText || 'An unknown error occurred');
    }
  }
  
  const contentType = response.headers.get('content-type');
  
  // Handle empty responses
  if (!contentType || response.headers.get('content-length') === '0') {
    return {};
  }
  
  // Handle different response types
  if (contentType.includes('application/json')) {
    return response.json();
  } else if (contentType.includes('multipart/form-data')) {
    return response.formData();
  } else if (contentType.includes('text/')) {
    return response.text();
  } else {
    // For blob responses (images, videos, etc)
    return response.blob();
  }
};

export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const baseUrl = getBaseUrl();
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  const url = `${cleanBaseUrl}/${cleanEndpoint}`;
  
  const options = {
    method,
    headers: {
      ...headers,
    },
    credentials: 'include', // To handle cookies
  };

  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle different body types
  if (body) {
    if (body instanceof FormData) {
      // Don't set any Content-Type for FormData, let the browser handle it
      options.body = body;
    } else {
      // For JSON data
      options.headers['Content-Type'] = 'application/json';
      options.headers['Accept'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  } else if (method !== 'GET' && method !== 'HEAD') {
    // For requests without body but not GET/HEAD
    options.headers['Content-Type'] = 'application/json';
    options.headers['Accept'] = 'application/json';
  }

  console.log(`Making ${method} request to ${url}`, {
    headers: options.headers,
    bodyType: body instanceof FormData ? 'FormData' : typeof body
  });

  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(error.message || 'Network request failed');
  }
};






// ====== second ====== 

// const getBaseUrl = () => {
//   return process.env.REACT_APP_API_URL || '';
// };

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || response.statusText || 'An unknown error occurred');
//   }
  
//   // Check if there's actually content to parse
//   const contentType = response.headers.get('content-type');
//   if (contentType && contentType.includes('application/json')) {
//     return response.json();
//   } else {
//     // If no content or not JSON, return an empty object or appropriate default response
//     return response.text().then(text => {
//       if (!text) {
//         return {};
//       }
//       // Try to parse as JSON if possible, otherwise return the text
//       try {
//         return JSON.parse(text);
//       } catch (e) {
//         console.warn('Response is not JSON:', text);
//         throw new Error('Invalid response format from server');
//       }
//     });
//   }
// };


// export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
//   const baseUrl = getBaseUrl();
//   // const url = `${baseUrl}${endpoint}`;
//   // Remove any trailing slashes from baseUrl and leading slashes from endpoint
//   const cleanBaseUrl = baseUrl.replace(/\/$/, '');
//   const cleanEndpoint = endpoint.replace(/^\//, '');
//   const url = `${cleanBaseUrl}/${cleanEndpoint}`;

//   console.log('Making request to:', url);
  
//   const options = {
//     method,
//     headers: {
//       // Don't set Content-Type for FormData
//       ...headers,
//     },
//     credentials: 'include', // Add this to handle cookies
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

//   console.log(`Making ${method} request to ${url}`);

//   try {
//     const response = await fetch(url, options);
//     return handleResponse(response);
//   } catch (error) {
//     console.error('API request failed:', error);
//     throw error;
//   }
// };


// ===== initial =======
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