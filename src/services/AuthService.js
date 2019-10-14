import ApiService from './ApiService';

const ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
      this.api.setRefreshTokenCallback(this.refreshSession.bind(this));
    }
  };

  setAuthorizationHeader = () => {
    const token = this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  };

  createSession = user => {
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthorizationHeader();
  };

  destroySession = () => {
    localStorage.clear();
    this.api.removeHeaders(['Authorization']);
  };

  refreshSession = async () => {
    try {
      const { data } = await this.apiClient.post('api/auth/refresh');
      this.createSession(data);
    } catch (error) {
      console.log('Token is already refreshed');
    }
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    this.createSession(data);
    return data;
  };

  signup = async signupData => {
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, signupData);
    this.createSession(data);
    return data;
  };

  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    this.destroySession();
    return { ok: true, data };
  };

  getToken = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).access_token : undefined;
  };

  isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.access_token ? true : false;
  };

  getUser = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  };

  updateUserInStorage = property => {
    const user = localStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage.setItem('user', JSON.stringify(jsonUser));
  };
}

const authService = new AuthService();
export default authService;
