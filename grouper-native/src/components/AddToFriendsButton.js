import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_FRIENDS = gql`
  mutation ADD_TO_FRIENDS($userId: String!, $friendId: String!) {
    addFriend(userId: $userId, friendId: $friendId) {
      id
      username
    }
  }
`;

const SEND_FRIEND_REQUEST_BY_ID_MUTATION = gql`
  mutation SEND_FRIEND_REQUEST_BY_ID_MUTATION($senderId: String!, $receiverId: String!) {
    sendFriendRequestById(senderId: $senderId, receiverId: $receiverId) {
      id
      senderId {
        id
        username
      }
      receiverId
    }
  }
`;

const AddToFriendsButton = props => {
  const { senderId, receiverId, isFriend, receiverUsername } = props;
  console.log(props);
  return (
    <Mutation
      mutation={SEND_FRIEND_REQUEST_BY_ID_MUTATION}
      variables={{ senderId, receiverId }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(sendFriendRequestById, { loading, error }) => {
        if (error) return <Error error={error} />;
        return (
          <>
            {isFriend ? (
              <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }}>
                <Icon type="Feather" name="users" />
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: '#ef8354', color: '#2d3142' }}
                onPress={async () => {
                  await sendFriendRequestById();
                  await Alert.alert('Friend Request Sent', `${receiverUsername} will confirm your friend request.`);
                }}
              >
                {loading ? <Spinner color="white" /> : <Icon type="Feather" name="user-plus" />}
              </Button>
            )}
          </>
        );
      }}
    </Mutation>
  );
};

export { ADD_TO_FRIENDS };
export default AddToFriendsButton;
