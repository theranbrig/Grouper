import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';

import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3142',
    padding: 10,
  },
  paragraph: {
    color: 'white',
  },
  heading1: {
    color: '#ef8354',
    fontFamily: 'Lobster Two',
    fontSize: 25,
    marginLeft: 8,
  },
  heading2: {
    color: '#ef8354',
    fontFamily: 'Lobster Two',
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 15,
  },
  orangeButton: {
    borderWidth: 2,
    borderColor: '#ef8354',
    height: 40,
    marginLeft: '5%',
    margin: 10,
    backgroundColor: 'transparent',
    width: '30%',
  },
  orangeText: {
    color: '#fefefe',
    fontSize: 23,
  },
  card: {
    height: 90,
    marginLeft: '5%',
    width: '90%',
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: '#4f5d75',
  },
  subHeader: { top: -35 },
  listList: {
    marginBottom: 60,
  },
  listItem: {
    width: '95%',
    marginLeft: '2.5%',
    backgroundColor: '#4f5d75',
    marginTop: 10,
  },
  individualListText: {
    color: '#fefefe',
    fontFamily: 'Roboto',
    paddingLeft: 10,
  },
  listItem1: {
    borderBottomWidth: 0,
    backgroundColor: '#4f5d75',
    overflow: 'hidden',
    width: '100%',
  },
  noListText: {
    color: '#fefefe',
    width: '100%',
    textAlign: 'center',
    padding: 20,
  },
});

const IndividualList = props => (
  <View style={mainStyles.listItem}>
    <SwipeRow
      style={mainStyles.listItem1}
      rightOpenValue={-75}
      leftOpenValue={75}
      left={
        <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => alert('Trash')}>
          <Icon active name="edit" />
        </Button>
      }
      body={
        <TouchableOpacity style={mainStyles.individualList} key={props.list.listId} onPress={props.viewListClick}>
          <Text style={mainStyles.individualListText}>{props.list.name}</Text>
          <Text style={mainStyles.individualListText}>{props.list.creator}</Text>
          <Text style={mainStyles.individualListText}>{props.list.listId}</Text>
        </TouchableOpacity>
      }
      right={
        <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => alert('Trash')}>
          <Icon active name="trash" />
        </Button>
      }
    />
  </View>
);

export default IndividualList;
