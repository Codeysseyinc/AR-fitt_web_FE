const baseUrl = process.env.REACT_APP_BASE_URL;

const URLS = {
  verifyEmail: `${baseUrl}/user/userExists`,
  registerUser: `${baseUrl}/user/signUp`,
};

export default URLS;
