export const getResponseErrorMessage = (error) => {
  if (error.response?.data) {
    return error.response.data.message;
  }

  if (error.response?.statusText) {
    return error.response.statusText;
  }
  return error.message === 'Network Error'
    ? 'Oops! Network Error. Try again later'
    : error.message;
};
