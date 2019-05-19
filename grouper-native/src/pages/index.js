import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { StatusBar } from 'react-native';
import Splash from './Splash';
import Logout from './Logout';
import SignUp from './SignUp';
import Login from './Login';
import Lists from './Lists';
import List from './List';
import Profile from './Profile';

const AppRouter = () => (
  <>
    <StatusBar barStyle="light-content" />
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/lists" component={Lists} />
        <Route path="/list/:id" component={List} />;
        <Route path="/profile" component={Profile} />;
      </Switch>
    </NativeRouter>
  </>
);

export default AppRouter;
