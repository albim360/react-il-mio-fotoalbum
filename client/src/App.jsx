import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './components/Admin/AdminRoutes';
import PublicRoutes from './components/Public/PublicRoutes';
import ErrorBoundary from './middlewares/ErrorBonduary';
import Home from './components/Public/Home';
import AddPhoto from './components/Admin/AddPhoto';
import Navbar from './components/Public/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/photos" component={Photos} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
