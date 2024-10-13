const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

  export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(endpoint, options);
    return handleResponse(response);
  };