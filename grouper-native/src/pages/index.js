import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';
import CheckToken from './CheckToken';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/splash" component={Splash} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </NativeRouter>
);

export default AppRouter;
