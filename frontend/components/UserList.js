import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, List, Segment } from 'semantic-ui-react';
import { INDIVIDUAL_LIST_QUERY } from './List';

const REMOVE_USER_MUTATION = gql`
	mutation REMOVE_USER_MUTATION($id: ID!, $email: String!) {
		removeUser(id: $id, email: $email) {
			id
		}
	}
`;

export default class UserList extends Component {
	render() {
		return (
			<List inverted relaxed>
				{this.props.list.users.map(user => (
					<List.Item key={user.id}>
						<Segment inverted textAlign="left">
							<Mutation
								mutation={REMOVE_USER_MUTATION}
								variables={{ id: this.props.id, email: user.email }}
								refetchQueries={[
									{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }
								]}>
								{(removeUser, { error, loading }) => {
									if (error) <p>Error...</p>;
									return (
										<List.Content floated="right" verticalAlign="middle">
											<Button
												basic
												color="orange"
												icon="close"
												onClick={async e => {
													e.preventDefault();
													removeUser();
												}}
											/>
										</List.Content>
									);
								}}
							</Mutation>
							<List.Header>{user.username}</List.Header>
							<List.Description>{user.email}</List.Description>
						</Segment>
					</List.Item>
				))}
			</List>
		);
	}
}
