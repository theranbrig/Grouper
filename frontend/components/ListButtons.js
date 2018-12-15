import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, List } from 'semantic-ui-react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { INDIVIDUAL_LIST_QUERY } from './List';

const TOGGLE_LIST_ITEM_MUTATION = gql`
  mutation TOGGLE_LIST_ITEM_MUTATION($id: String!) {
    toggleInCart(id: $id) {
      id
      inCart
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: String!) {
    removeListItem(id: $id) {
      id
    }
  }
`;

const ListButtons = props => (
  <div>
    <Mutation
      mutation={TOGGLE_LIST_ITEM_MUTATION}
      variables={{ id: props.id }}
      refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: props.id } }]}
    >
      {(toggleInCart, { loading, error }) => (
        <List.Content floated="left">
          <Button
            inverted
            icon={props.inCart ? `check` : `cart arrow down`}
            disabled={loading}
            onClick={async e => {
              e.preventDefault();
              toggleInCart();
            }}
          />
        </List.Content>
      )}
    </Mutation>
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: props.id }}
      refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: props.id } }]}
    >
      {(removeListItem, { loading, error }) => {
        if (error) return <p>Error...</p>;
        return (
          <React.Fragment>
            <List.Content floated="right">
              <Button
                inverted
                icon="close"
                disabled={loading}
                onClick={async e => {
                  e.preventDefault();
                  removeListItem();
                }}
              />
            </List.Content>
            <List.Content floated="right">
              <Link href={{ pathname: 'edititem', query: { id: props.id } }}>
                <Button inverted icon="edit" disabled={loading} />
              </Link>
            </List.Content>
          </React.Fragment>
        );
      }}
    </Mutation>
  </div>
);

ListButtons.propTypes = {
  id: PropTypes.string.isRequired,
  inCart: PropTypes.bool.isRequired,
};

export default ListButtons;
