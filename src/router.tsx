import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Dashboard, Landing, Login, Register } from './components/views';
import { getIsAuthenticated } from './store/auth/selectors';
import { hideMainNavbar, unhideMainNavbar } from './services/dom';

const PublicRoute: React.FC = () => {
  useEffect(() => {
    unhideMainNavbar();
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/" render={() => <Redirect to={'/'} />} />
    </Switch>
  );
};

const PrivateRoute: React.FC = () => {
  useEffect(() => {
    hideMainNavbar();
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/" render={() => <Redirect to={'/'} />} />
    </Switch>
  );
};

const RootRouter: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <BrowserRouter>
      {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
    </BrowserRouter>
  );
};

export { RootRouter };
