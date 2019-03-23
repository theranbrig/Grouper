import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: '#ef8354',
    padding: 10,
    width: '90%',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <View style={styles.container} data-test="graphql-error" key={i}>
        <Text style={styles.text}>Oh No!</Text>
        <Text style={styles.text}>{error.message.replace('GraphQL error: ', '')}</Text>
      </View>
    ));
  }
  return (
    <View style={styles.container} data-test="graphql-error">
      <Text style={styles.text}>Oh No!</Text>
      <Text style={styles.text}>{error.message.replace('GraphQL error: ', '')}</Text>
    </View>
  );
};

export default DisplayError;
