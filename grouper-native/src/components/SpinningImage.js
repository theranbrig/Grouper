import React, { Component } from 'react';
import { View, Text, Image, Animated, StyleSheet, Easing } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class SpinningImageLoader extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 100000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 150,
            height: 100,
            transform: [{ rotate: spin }],
          }}
          source={require('../../assets/images/colorfish.png')}
        />
      </View>
    );
  }
}

export default SpinningImageLoader;
