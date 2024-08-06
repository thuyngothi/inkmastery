
const getAccessToken = () => localStorage.getItem('token');

const setAccessToken = (token) => localStorage.setItem('token', token);

const getRefreshToken = () => localStorage.getItem('refresh');

const setRefreshToken = (token) => localStorage.setItem('refresh', token);

const clearTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  };

  export { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, clearTokens };