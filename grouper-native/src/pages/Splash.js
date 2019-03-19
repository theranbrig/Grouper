import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Button, Text } from 'native-base';

const Lists = ({ history }) => (
  <Container>
    <View style={styles.container}>
      <Text style={styles.heading}>Grouper</Text>
      <View style={styles.mainImage}>
        <Image source={require('../../assets/images/colorfish.png')} resizeMode="contain" />
      </View>
      <Text style={styles.paragraph}>Shop Faster. Shop Together. Shop Smarter</Text>
      <Button block style={styles.orangeButton} onPress={() => history.push('/login')}>
        <Text style={styles.orangeButtonText}>Sign Up</Text>
      </Button>
      <Button block style={styles.orangeButton} onPress={() => history.push('/login')}>
        <Text style={styles.orangeButtonText}>Login</Text>
      </Button>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5d75',
    padding: 10,
  },
  paragraph: {
    color: '#fefefe',
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
  },
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',
    fontFamily: 'Lobster',
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  heading: {
    color: '#ef8354',
    fontSize: 60,
    fontFamily: 'Lobster',
  },
  buttonText: {
    fontSize: 25,
  },
  mainImage: {
    marginBottom: 40,
  },
});

export default Lists;
