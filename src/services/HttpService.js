import axios from 'axios';
import config from '../config';

class HttpService {
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
    this.refreshTokenCallback = async () => {};
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse = async (error) => {
    const { status } = error.response;
    const message = error.response.data.status;

    switch (status) {
      case 401: {
        if (message === 'Token is Expired'){
          await this.refreshTokenCallback();
        } else {
          this.unauthorizedCallback();
        }
        break;
      }
      default:
        break;
    }

    return Promise.reject(error);
  }
  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
  setRefreshTokenCallback(callback) {
    this.refreshTokenCallback = callback;
  }
}

const options = {
  baseURL: config.API_BASE_URL
};
const httpService = new HttpService(options);

export default httpService;
