import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import PhotoList from './PhotoList';
import PhotoDetails from './PhotoDetails';
import AddPhoto from './AddPhoto';
import EditPhoto from './EditPhoto';
import Categories from './Categories';

function AdminRoutes() {
  return (
    <Routes>  
      <Route path="/admin/photos" element={<PhotoList />} />
      <Route path="/admin/photos/:id" element={<PhotoDetails />} />
      <Route path="/admin/add-photo" element={<AddPhoto />} />
      <Route path="/admin/edit-photo/:id" element={<EditPhoto />} />
      <Route path="/admin/categories" element={<Categories />} />
    </Routes>
  );
}

export default AdminRoutes;
