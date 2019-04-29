import React from 'react';
import { Button, Icon, Spinner } from 'native-base';
import { Alert } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import { CURRENT_USER_QUERY } from './User';

const TOGGLE_IN_CART = gql`
  mutation TOGGLE_IN_CART($id: String!) {
    toggleInCart(id: $id) {
      id
      name
    }
  }
`;

const ToggleInCartButton = props => {
  console.log(props);
  return (
    <Mutation
      mutation={TOGGLE_IN_CART}
      variables={{ id: props.itemId }}
      refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: props.listId } }]}
    >
      {(toggleInCart, { loading, error }) => {
        if (error) return <Error error={error} />;
        return (
          <Button
            style={{ backgroundColor: '#ef8354', color: '#2d3142' }}
            onPress={() => {
              toggleInCart();
            }}
          >
            {loading ? <Spinner color="white" /> : <Icon type="Feather" name="check-square" />}
          </Button>
        );
      }}
    </Mutation>
  );
};

export default ToggleInCartButton;
