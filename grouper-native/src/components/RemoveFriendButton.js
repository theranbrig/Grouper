import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FRIENDS = gql`
  mutation REMOVE_FRIENDS($username: String!, $friendName: String!) {
    removeFriend(username: $username, friendName: $friendName) {
      id
      username
    }
  }
`;

const RemoveFriendButton = props => {
  const { friendName, username, isFriend } = props;
  console.log(props);
  return (
    <Mutation
      mutation={REMOVE_FRIENDS}
      variables={{ username, friendName }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(removeFriend, { loading, error }) => {
        if (error) return <Error error={error} />;
        return (
          <Button
            style={{ backgroundColor: '#ef8354', color: '#2d3142' }}
            onPress={() => {
              removeFriend();
            }}
          >
            {loading ? <Spinner color="white" /> : <Icon type="Feather" name="user-minus" />}
          </Button>
        );
      }}
    </Mutation>
  );
};

export { REMOVE_FRIENDS };
export default RemoveFriendButton;
