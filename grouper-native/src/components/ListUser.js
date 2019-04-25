import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';
import DeleteUserButton from './DeleteUserButton';
import EditListItem from './EditItem';
import User from './User';

export const mainStyles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
    padding: 12,
    textAlign: 'center',
  },
  individualListText: {
    color: '#fefefe',
    fontFamily: 'Lobster',
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 20,
    width: '95%',
  },
  listItem: {
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
  listIconOrange: {
    color: '#ef8354',
    fontSize: 25,
  },
  listIconWhite: {
    color: '#fefefe',
    fontSize: 25,
  },
});

const ListUser = props => {
  const { username, email, id } = props.user;
  return (
    <User>
      {({ data: { me } }) => (
        <TouchableOpacity style={mainStyles.listItem}>
          <SwipeRow
            style={mainStyles.listItem}
            rightOpenValue={-75}
            body={
              <View style={mainStyles.individualList}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={mainStyles.individualListText}>{username}</Text>
                  <Icon
                    style={id === me.id ? mainStyles.listIconOrange : mainStyles.listIconWhite}
                    active
                    name="ios-contact"
                  />
                </View>
              </View>
            }
            right={<DeleteUserButton listId={props.listId} email={email} />}
          />
        </TouchableOpacity>
      )}
    </User>
  );
};

export default ListUser;
