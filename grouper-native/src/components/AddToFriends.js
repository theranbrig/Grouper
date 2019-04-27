import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';

const REMOVE_USER = gql`
  mutation REMOVE_USER($email: String!, $id: ID!) {
    removeUser(email: $email, id: $id) {
      id
    }
  }
`;

const AddToFriendsButton = props => (
  <Mutation
    mutation={REMOVE_USER}
    variables={{ id: props.listId, email: props.email }}
    refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: props.listId } }]}
  >
    {(removeListItem, { loading, error }) => {
      if (error) return <Error error={error} />;
      return (
        <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => console.log('Friend Added')}>
          {loading ? <Spinner color="white" /> : <Icon active name="add" />}
        </Button>
      );
    }}
  </Mutation>
);

export default AddToFriendsButton;
