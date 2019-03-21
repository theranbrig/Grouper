import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './Splash';
import Logout from './Logout';
import SignUp from './SignUp';
import Login from './Login';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </NativeRouter>
);

export default AppRouter;
