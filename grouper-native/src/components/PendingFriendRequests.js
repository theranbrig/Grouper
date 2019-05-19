import React from 'react';
import { Mutation } from 'react-apollo';
import { Text, ListItem, Button, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { ADD_TO_FRIENDS } from './AddToFriendsButton';
import { CURRENT_USER_QUERY } from './User';
import { REMOVE_FRIEND_REQUEST } from './FriendRequests';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 0,
    flex: 1,
    marginLeft: 0,
  },
  itemText: {
    color: '#fefefe',
    marginLeft: 15,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    borderColor: '#fefefe',
    borderWidth: 2,
    margin: 5,
  },
  orangeButtonText: {
    color: '#fefefe',
    fontFamily: 'Lobster',
    fontSize: 14,
  },
});

const PendingFriendRequests = props => (
  <ListItem style={styles.listItem}>
    <Text style={styles.itemText}>{props.username}</Text>
    <View style={styles.buttonArea}>
      <Mutation
        mutation={REMOVE_FRIEND_REQUEST}
        variables={{ id: props.id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {removeFriendRequest => (
          <>
            <Mutation
              mutation={ADD_TO_FRIENDS}
              variables={{ userId: props.receiverId, friendId: props.senderId }}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {addFriend => (
                <Button
                  onPress={async () => {
                    await addFriend();
                    await removeFriendRequest();
                  }}
                  block
                  small
                  style={styles.orangeButton}
                >
                  <Icon style={styles.orangeButtonText} type="Feather" name="user-plus" />
                </Button>
              )}
            </Mutation>
            <Button onPress={async () => await removeFriendRequest()} block small style={styles.orangeButton}>
              <Icon style={styles.orangeButtonText} type="Feather" name="x" />
            </Button>
          </>
        )}
      </Mutation>
    </View>
  </ListItem>
);

export default PendingFriendRequests;
