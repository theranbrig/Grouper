import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';

const REMOVE_ITEM = gql`
  mutation REMOVE_ITEM($id: String!) {
    removeListItem(id: $id) {
      id
    }
  }
`;

const DeleteItemButton = props => (
  <Mutation
    mutation={REMOVE_ITEM}
    variables={{ id: props.id }}
    refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: props.listId } }]}
  >
    {(removeListItem, { loading, error }) => {
      if (error) return <Error error={error} />;
      return (
        <Button
          style={{ backgroundColor: '#ef8354', color: '#2d3142' }}
          onPress={() =>
            Alert.alert('Are you sure you want to delete this item?', 'Press Ok to Delete.', [
              { text: 'CANCEL', onPress: () => console.warn('Delete Canceled'), style: 'cancel' },
              { text: 'OK', onPress: () => removeListItem() },
            ])
          }
        >
          {loading ? <Spinner color="white" /> : <Icon type="Feather" name="trash-2" />}
        </Button>
      );
    }}
  </Mutation>
);

export default DeleteItemButton;
