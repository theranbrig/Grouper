import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { LISTS_QUERY } from '../pages/Lists';

const REMOVE_LIST = gql`
  mutation REMOVE_LIST($id: String!) {
    removeList(id: $id) {
      id
    }
  }
`;

const DeleteListButton = props => (
  <Mutation mutation={REMOVE_LIST} variables={{ id: props.id }} refetchQueries={[{ query: LISTS_QUERY }]}>
    {(removeList, { loading, error }) => {
      if (error) return <Error error={error} />;
      return (
        <Button
          style={{ backgroundColor: '#ef8354', color: '#2d3142' }}
          onPress={() =>
            Alert.alert('Are you sure you want to delete this list?', 'Press Ok to Delete.', [
              { text: 'CANCEL', onPress: () => console.warn('Delete Canceled'), style: 'cancel' },
              { text: 'OK', onPress: () => removeList() },
            ])
          }
        >
          {loading ? <Spinner color="white" /> : <Icon active name="ios-trash" />}
        </Button>
      );
    }}
  </Mutation>
);

export default DeleteListButton;
