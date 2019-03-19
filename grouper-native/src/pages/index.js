import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './Splash';
import Login from './Login';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </NativeRouter>
);

export default AppRouter;
