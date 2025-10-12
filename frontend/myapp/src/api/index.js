import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const signupUser = (userData) => api.post('/api/auth/signup', userData);
export const updateUserPassword = (passwordData) => api.patch('/api/auth/update-password', passwordData);


export const getAdminDashboard = () => api.get('/api/admin/dashboard');
export const adminAddUser = (userData) => api.post('/api/admin/users', userData);
export const adminGetUsers = (params) => api.get('/api/admin/users', { params });
export const adminAddStore = (storeData) => api.post('/api/admin/stores', storeData);


export const getUserStores = (params) => api.get('/api/user/stores', { params });
export const submitUserRating = (ratingData) => api.post('/api/user/ratings', ratingData);


export const getOwnerDashboard = () => api.get('/api/owner/dashboard');

export default api;