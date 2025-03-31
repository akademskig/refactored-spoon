import axios from 'axios';
import { ToastEvent } from '../components/Toast';

export const AUTH_ERROR = 'auth-error';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      window.dispatchEvent(
        new CustomEvent<ToastEvent>('toast', {
          detail: {
            message: 'Please sign in to continue',
            type: 'info',
          },
        }),
      );
    }
    return Promise.reject(err);
  },
);

export default api;
