const getBaseUrl = () => {
  return process.env.REACT_APP_API_URL || '';
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    // Clone the response before reading it
    const clonedResponse = response.clone();
    
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    } catch (e) {
      // If JSON parsing fails, try reading as text from the cloned response
      const errorText = await clonedResponse.text();
      throw new Error(errorText || response.statusText || 'An unknown error occurred');
    }
  }
  
  // Handle empty responses
  if (!contentType || response.headers.get('content-length') === '0') {
    return {};
  }
  
  try {
    // Handle different response types
    if (contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType.includes('multipart/form-data')) {
      return await response.formData();
    } else if (contentType.includes('text/')) {
      return await response.text();
    } else {
      // For blob responses (images, videos, etc)
      return await response.blob();
    }
  } catch (error) {
    console.error('Error parsing response:', error);
    throw new Error('Failed to parse server response');
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
      // Don't set Content-Type for FormData
      options.body = body;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Accept'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  } else if (method !== 'GET' && method !== 'HEAD') {
    options.headers['Content-Type'] = 'application/json';
    options.headers['Accept'] = 'application/json';
  }

  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(error.message || 'Network request failed');
  }
};


// const getBaseUrl = () => {
//   return process.env.REACT_APP_API_URL || '';
// };

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     // Try to parse error as JSON, fallback to text if that fails
//     try {
//       const errorData = await response.json();
//       throw new Error(errorData.message || response.statusText);
//     } catch (e) {
//       const errorText = await response.text();
//       throw new Error(errorText || response.statusText || 'An unknown error occurred');
//     }
//   }
  
//   const contentType = response.headers.get('content-type');
  
//   // Handle empty responses
//   if (!contentType || response.headers.get('content-length') === '0') {
//     return {};
//   }
  
//   // Handle different response types
//   if (contentType.includes('application/json')) {
//     return response.json();
//   } else if (contentType.includes('multipart/form-data')) {
//     return response.formData();
//   } else if (contentType.includes('text/')) {
//     return response.text();
//   } else {
//     // For blob responses (images, videos, etc)
//     return response.blob();
//   }
// };

// export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
//   const baseUrl = getBaseUrl();
//   const cleanBaseUrl = baseUrl.replace(/\/$/, '');
//   const cleanEndpoint = endpoint.replace(/^\//, '');
//   const url = `${cleanBaseUrl}/${cleanEndpoint}`;
  
//   const options = {
//     method,
//     headers: {
//       ...headers,
//     },
//     credentials: 'include', // To handle cookies
//   };

//   const token = localStorage.getItem('token');
//   if (token) {
//     options.headers['Authorization'] = `Bearer ${token}`;
//   }

//   // Handle different body types
//   if (body) {
//     if (body instanceof FormData) {
//       // Don't set any Content-Type for FormData, let the browser handle it
//       options.body = body;
//     } else {
//       // For JSON data
//       options.headers['Content-Type'] = 'application/json';
//       options.headers['Accept'] = 'application/json';
//       options.body = JSON.stringify(body);
//     }
//   } else if (method !== 'GET' && method !== 'HEAD') {
//     // For requests without body but not GET/HEAD
//     options.headers['Content-Type'] = 'application/json';
//     options.headers['Accept'] = 'application/json';
//   }

//   console.log(`Making ${method} request to ${url}`, {
//     headers: options.headers,
//     bodyType: body instanceof FormData ? 'FormData' : typeof body
//   });

//   try {
//     const response = await fetch(url, options);
//     return handleResponse(response);
//   } catch (error) {
//     console.error('API request failed:', error);
//     throw new Error(error.message || 'Network request failed');
//   }
// };