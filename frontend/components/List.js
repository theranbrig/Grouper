import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, List, Segment, Icon, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import AddUser from './AddUser';

const INDIVIDUAL_LIST_QUERY = gql`
	query INDIVIDUAL_LIST_QUERY($id: ID!) {
		list(where: { id: $id }) {
			id
			name
			type
			users {
				id
				username
				email
			}
		}
	}
`;

const REMOVE_USER_MUTATION = gql`
	mutation REMOVE_USER_MUTATION($id: ID!, $email: String!) {
		removeUser(id: $id, email: $email) {
			id
		}
	}
`;

const IndividualListStyles = styled.div`
	margin-top: 10px;
	color: ${props => props.theme.offWhite};
	h1 {
		color: ${props => props.theme.orange} !important;
		font-family: 'Lobster', cursive;import AddUser from './AddUser';
	}
  button {
    margin-top: 5px !important;
  }
  .header {
    padding: 5px 0 !important;
    font-size: 1.2rem;
  }
  .ui.inverted.segment {
		background: ${props => props.theme.darkBlue};
	}
`;

class IndividualList extends Component {
	render() {
		return (
			<Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading, error }) => {
					if (loading) return <p>Loading...</p>;
					console.log(data);
					return (
						<IndividualListStyles>
							<Grid container centered>
								<Grid.Column mobile={16} tablet={12} computer={12} textAlign="center">
									<h1>{data.list.name}</h1>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4} textAlign="center">
									<h1>Users</h1>
									<List inverted relaxed>
										{data.list.users.map(user => (
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
									<AddUser id={this.props.id} />
								</Grid.Column>
							</Grid>
						</IndividualListStyles>
					);
				}}
			</Query>
		);
	}
}

export default IndividualList;
export { INDIVIDUAL_LIST_QUERY };
