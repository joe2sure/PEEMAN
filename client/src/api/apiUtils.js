const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText || 'An unknown error occurred');
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

  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(`Making ${method} request to ${endpoint}`, options);

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};