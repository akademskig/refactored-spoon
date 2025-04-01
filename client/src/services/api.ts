import axios from 'axios';
import { ToastEvent } from '../components/Toast/Toast';

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
    } else {
      window.dispatchEvent(
        new CustomEvent<ToastEvent>('toast', {
          detail: {
            message: 'An unexpected error occurred. Try reloading the page or come back later.',
            type: 'error',
          },
        }),
      );
    }
    return Promise.reject(err);
  },
);

export default api;
