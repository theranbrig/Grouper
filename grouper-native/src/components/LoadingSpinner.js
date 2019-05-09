import React from 'react';
import { Spinner, View } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

const LoadingSpinner = () => (
  <View style={styles.container}>
    <Spinner color="#ef8345" />
  </View>
);

export default LoadingSpinner;
