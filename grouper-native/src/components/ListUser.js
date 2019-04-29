import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';
import DeleteUserButton from './DeleteUserButton';
import EditListItem from './EditItem';
import User from './User';
import AddToFriendsButton from './AddToFriends';

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
  individualListOwnerText: {
    color: '#ef8354',
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
      {({ data: { me } }) => {
        const isFriend = me.friends.some(friend => `${friend.username}` === `${username}`);
        return (
          <TouchableOpacity style={mainStyles.listItem}>
            <SwipeRow
              style={mainStyles.listItem}
              rightOpenValue={id === me.id ? 0 : -75}
              leftOpenValue={id === me.id ? 0 : 75}
              left={
                <AddToFriendsButton
                  friendName={username}
                  username={me.username}
                  listId={props.listId}
                  isFriend={isFriend}
                />
              }
              body={
                <View style={mainStyles.individualList}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={id === me.id ? mainStyles.individualListOwnerText : mainStyles.individualListText}>
                      {username}
                    </Text>
                    {id === me.id ? (
                      <Icon style={mainStyles.listIconOrange} type="Feather" name="user" />
                    ) : isFriend ? (
                      <Icon style={mainStyles.listIconWhite} type="Feather" name="user-check" />
                    ) : (
                      <Icon style={mainStyles.listIconWhite} type="Feather" name="user" />
                    )}
                  </View>
                </View>
              }
              right={<DeleteUserButton listId={props.listId} email={email} />}
            />
          </TouchableOpacity>
        );
      }}
    </User>
  );
};

export default ListUser;
