import React from 'react';
import { Text, Button } from 'native-base';
import { Alert, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import { ADD_TO_FRIENDS } from './AddToFriendsButton';

const REMOVE_FRIEND_REQUEST = gql`
  mutation REMOVE_FRIEND_REQUEST($id: ID!) {
    removeFriendRequest(id: $id) {
      id
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  orangeButton: {
    marginLeft: '20%',
    margin: 10,
    width: '60%',
    backgroundColor: '#fefefe',
    borderColor: '#ef8354',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
    color: '#ef8354',
  },
  transparentButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  picker: {
    color: 'white',
  },
});

const FriendRequests = () => (
  <User>
    {({ data: { me } }) => {
      console.log(me.friendRequests);
      if (me.friendRequests.length) {
        const request = me.friendRequests[0];
        console.log(request);
        return (
          <Mutation
            mutation={ADD_TO_FRIENDS}
            variables={{ userId: me.id, friendId: request.senderId }}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {addFriend => (
              <Mutation
                mutation={REMOVE_FRIEND_REQUEST}
                variables={{ id: request.id }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {removeFriendRequest => (
                  <Button
                    style={styles.orangeButton}
                    onPress={async () => {
                      await Alert.alert('Friend Request', `You have a friend request from ${request.requestUsername}`, [
                        { text: 'Decline', onPress: () => removeFriendRequest(), style: 'cancel' },
                        {
                          text: 'Accept',
                          onPress: async () => {
                            await removeFriendRequest();
                            await addFriend();
                          },
                        },
                      ]);
                    }}
                  >
                    <Text style={styles.orangeButtonText}>New Friend Request</Text>
                  </Button>
                )}
              </Mutation>
            )}
          </Mutation>
        );
      }
      return <></>;
    }}
  </User>
);

export default FriendRequests;
