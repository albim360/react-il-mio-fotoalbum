import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import ContactForm from './ContactForm';

function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/contact" component={ContactForm} />
    </>
  );
}

export default PublicRoutes;
