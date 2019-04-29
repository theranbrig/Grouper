import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_FRIENDS = gql`
  mutation ADD_TO_FRIENDS($username: String!, $friendName: String!) {
    addFriend(username: $username, friendName: $friendName) {
      id
      username
    }
  }
`;

const AddToFriendsButton = props => {
  const { friendName, username, isFriend } = props;
  console.log(props);
  return (
    <Mutation
      mutation={ADD_TO_FRIENDS}
      variables={{ username, friendName }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addFriend, { loading, error }) => {
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
                onPress={() => {
                  addFriend();
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

export default AddToFriendsButton;
