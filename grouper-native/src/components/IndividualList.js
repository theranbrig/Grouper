import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';

import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  individualListText: {
    color: '#fefefe',
    fontFamily: 'Roboto',
    paddingLeft: 20,
    fontSize: 20,
  },
  listItem: {
    borderBottomWidth: 0,
    backgroundColor: '#4f5d75',
    overflow: 'hidden',
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 0.2,
  },
  listIcon: {
    color: '#ef8354',
    fontSize: 25,
  },
});

const IndividualList = props => {
  const { items, name, type, users } = props.list;
  console.log(props);
  return (
    <TouchableOpacity style={mainStyles.listItem}>
      <SwipeRow
        style={mainStyles.listItem}
        rightOpenValue={-75}
        leftOpenValue={75}
        left={
          <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => alert('Trash')}>
            <Icon active name="ios-create" />
          </Button>
        }
        body={
          <TouchableOpacity style={mainStyles.individualList} key={props.list.listId} onPress={props.viewListClick}>
            <Text style={mainStyles.individualListText}>
              {name} - {type}
            </Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={mainStyles.individualListText}>
                {items.length} <Icon style={mainStyles.listIcon} active name="ios-cart" />
              </Text>
              <Text style={mainStyles.individualListText}>
                {users.length} <Icon style={mainStyles.listIcon} active name="ios-person" />
              </Text>
            </View>
          </TouchableOpacity>
        }
        right={
          <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => alert('Trash')}>
            <Icon active name="ios-trash" />
          </Button>
        }
      />
    </TouchableOpacity>
  );
};

export default IndividualList;
