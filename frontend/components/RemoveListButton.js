import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const REMOVE_LIST = gql`
  mutation REMOVE_LIST($id: String!) {
    removeList(id: $id) {
      id
    }
  }
`;

const RemoveListButton = props => (
  <Mutation mutation={REMOVE_LIST} variables={{ id: props.id }}>
    {(removeList, { loading, error }) => {
      if (error) return <p>Error...</p>;
      return (
        <Button
          className="delete-button"
          icon="close"
          inverted
          disabled={loading}
          onClick={async e => {
            e.preventDefault();
            await removeList();
          }}
        />
      );
    }}
  </Mutation>
);

RemoveListButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveListButton;
