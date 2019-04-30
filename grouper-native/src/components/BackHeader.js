import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4f5d75',
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
});

const BackHeader = props => (
  <Header style={styles.header}>
    <Left>
      <Button transparent onPress={() => props.backLink()}>
        <Icon style={styles.heading} type="Feather" name="chevron-left" />
      </Button>
    </Left>
    <Body>
      <Text style={styles.heading}>Grouper</Text>
    </Body>
    <Right>
      <Button transparent onPress={() => props.profileLink()}>
        <Icon style={styles.heading} type="Feather" name="user" />
      </Button>
    </Right>
  </Header>
);

export default BackHeader;
