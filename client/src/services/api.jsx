import axios from 'axios';

const BASE_URL = 'http://localhost:3002';  

export const getPhotos = () => axios.get(`${BASE_URL}/api/photos`);
export const getPhotoById = (id) => axios.get(`${BASE_URL}/api/photos/${id}`);
export const addPhoto = (photoData) => axios.post(`${BASE_URL}/api/photos`, photoData);
export const updatePhoto = (id, photoData) => axios.put(`${BASE_URL}/api/photos/${id}`, photoData);
export const deletePhoto = (id) => axios.delete(`${BASE_URL}/api/photos/${id}`);

