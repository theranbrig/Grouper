import React from 'react';
import { Text, Button } from 'native-base';
import { Alert, StyleSheet } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import { ADD_TO_FRIENDS } from './AddToFriendsButton';
import HideFriendRequest from './HideFriendRequest';
import LoadingSpinner from './LoadingSpinner';

const REMOVE_FRIEND_REQUEST = gql`
  mutation REMOVE_FRIEND_REQUEST($id: ID!) {
    removeFriendRequest(id: $id) {
      id
    }
  }
`;

const GET_FRIEND_REQUESTS = gql`
  query GET_FRIEND_REQUESTS($receiverId: String!, $hidden: Boolean) {
    friendRequests(where: { AND: [{ receiverId: $receiverId }, { hidden: $hidden }] }) {
      id
      receiverId
      senderId
      requestUsername
      hidden
    }
  }
`;

const styles = StyleSheet.create({
  orangeButton: {
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#fefefe',
    borderColor: '#ef8354',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
    color: '#2d3142',
    textAlign: 'center',
  },
});

const FriendRequests = props => (
  <Query query={GET_FRIEND_REQUESTS} variables={{ receiverId: props.receiverId, hidden: false }}>
    {({ data }) => {
      if (data.friendRequests) {
        if (data.friendRequests.length) {
          const request = data.friendRequests[0];
          console.log('requests', request);
          return (
            <Mutation
              mutation={ADD_TO_FRIENDS}
              variables={{ userId: props.receiverId, friendId: request.senderId }}
              refetchQueries={[
                { query: CURRENT_USER_QUERY },
                { query: GET_FRIEND_REQUESTS, variables: { receiverId: props.receiverId, hidden: false } },
              ]}
            >
              {addFriend => (
                <Mutation
                  mutation={REMOVE_FRIEND_REQUEST}
                  variables={{ id: request.id }}
                  refetchQueries={[
                    { query: CURRENT_USER_QUERY },
                    { query: GET_FRIEND_REQUESTS, variables: { receiverId: props.receiverId, hidden: false } },
                  ]}
                >
                  {removeFriendRequest => (
                    <>
                      {!request.hidden && (
                        <>
                          <Button
                            block
                            style={styles.orangeButton}
                            onPress={async () => {
                              await Alert.alert(
                                'Friend Request',
                                `You have a friend request from ${request.requestUsername}`,
                                [
                                  { text: 'Decline', onPress: () => removeFriendRequest(), style: 'cancel' },
                                  {
                                    text: 'Accept',
                                    onPress: async () => {
                                      await removeFriendRequest();
                                      await addFriend();
                                    },
                                  },
                                ]
                              );
                            }}
                          >
                            <Text style={styles.orangeButtonText}>
                              New Friend Request from {request.requestUsername}
                            </Text>
                          </Button>
                          <HideFriendRequest id={request.id} receiverId={request.receiverId} />
                        </>
                      )}
                    </>
                  )}
                </Mutation>
              )}
            </Mutation>
          );
        }
      }
      return <></>;
    }}
  </Query>
);

export { GET_FRIEND_REQUESTS };
export default FriendRequests;
