import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import React from 'react';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      token
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
