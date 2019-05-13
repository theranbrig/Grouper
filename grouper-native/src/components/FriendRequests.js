import React from 'react';
import { Text, Button } from 'native-base';
import { Alert } from 'react-native';
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

const FriendRequests = () => (
  <User>
    {({ data: { me } }) => {
      console.log(me.friendRequests);
      if (me.friendRequests.length) {
        const request = me.friendRequests[0];
        return (
          <Mutation
            mutation={ADD_TO_FRIENDS}
            variables={{ username: me.username, friendName: request.senderId.username }}
          >
            {addFriend => (
              <Mutation
                mutation={REMOVE_FRIEND_REQUEST}
                variables={{ id: request.id }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {removeFriendRequest => (
                  <Button
                    onPress={async () => {
                      await Alert.alert('Friend Request', `You have a friend request from ${request.senderId}`, [
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
                    <Text>New Friend Request</Text>
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
