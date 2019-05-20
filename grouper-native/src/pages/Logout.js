/* eslint-disable global-require */
import React from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
import { Container, Button } from 'native-base';
import LogoutButton from '../components/LogoutButton';
import BackHeader from '../components/BackHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5d75',
    padding: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    marginTop: 8,
    color: '#2d3142',
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 60,
  },
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  transparentButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  paragraph: {
    color: '#fefefe',
    width: '90%',
    textAlign: 'center',
    margin: 15,
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
    color: '#fefefe',
  },
});

const Login = ({ history }) => (
  <Container>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <Text style={styles.heading}>Grouper</Text>
      <View style={styles.mainImage}>
        <Image source={require('../../assets/images/colorfish.png')} resizeMode="contain" />
      </View>
      <Text style={styles.paragraph}>We are sorry to see you go. We hope to see you again.</Text>
      <LogoutButton pushToSplash={() => history.push('/')} />
      <Button block style={styles.orangeButton} onPress={() => history.push('/')}>
        <Text style={styles.orangeButtonText}>Back to the App</Text>
      </Button>
    </View>
  </Container>
);

export default Login;
