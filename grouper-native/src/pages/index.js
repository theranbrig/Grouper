import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './Splash';
import Logout from './Logout';
import SignUp from './SignUp';
import Login from './Login';
import Lists from './Lists';
import List from './List';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/lists" component={Lists} />
      <Route path="/list/:id" component={List} />;
    </Switch>
  </NativeRouter>
);

export default AppRouter;
