import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Login = ({ history }) => (
  <View style={styles.container}>
    <Text style={styles.paragraph}>This is the Login</Text>
    <Button title="Create Product" onPress={() => history.push('/')} />
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
