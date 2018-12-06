import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';

const LOGOUT_USER_MUTATION = gql`
	mutation LOGOUT_USER_MUTATION {
		signout {
			message
		}
	}
`;

const DeleteButton = props => (
	<Mutation mutation={LOGOUT_USER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{(signout, { loading, error }) => (
			<Button
				onClick={async e => {
					e.preventDefault();
					await signout();
					Router.push({
						pathname: '/'
					});
				}}
				basic
				color="orange">
				Logout
			</Button>
		)}
	</Mutation>
);

export default DeleteButton;
