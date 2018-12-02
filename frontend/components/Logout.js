import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const LOGOUT_USER_MUTATION = gql`
	mutation LOGOUT_USER_MUTATION {
		signout {
			message
		}
	}
`;

const DeleteButton = props => (
	<Mutation mutation={LOGOUT_USER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{signout => <Button onClick={signout}>Logout</Button>}
	</Mutation>
);

export default DeleteButton;
