import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import User from '../components/User';

const Login = ({ history }) => (
  <User>
    {({ data: { me } }) => {
      console.log(me);
      return (
        <>
          {me ? (
            <View style={styles.container}>
              <Text style={styles.paragraph}>There is a Me</Text>
              <Button title="Create Product" onPress={() => history.push('/')} />
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.paragraph}>This is No Me</Text>
              <Button title="Create Product" onPress={() => history.push('/')} />
            </View>
          )}
        </>
      );
    }}
  </User>
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
