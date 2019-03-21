import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import User from '../components/User';
import LogoutButton from '../components/LogoutButton';

const Login = ({ history }) => (
  <View style={styles.container}>
    <Text style={styles.paragraph}>Logout User</Text>
    <Button title="Create Product" onPress={() => history.push('/')} />
    <LogoutButton />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    width: 300,
    fontSize: 20,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  paragraph: {
    textAlign: 'center',
  },
});

export default Login;
