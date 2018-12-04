import React, { Component } from 'react';
import IndividualListStyles from './styles/IndividualListStyles';
import { Grid, List, Segment, Icon, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import AddUser from './AddUser';
import AddListItem from './AddListItem';
import UserList from './UserList';

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
			items {
				id
				name
				price
			}
		}
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
								<Grid.Column mobile={16} tablet={16} computer={12} textAlign="center">
									<h1>{data.list.name}</h1>
									<List inverted relaxed>
										{data.list.items.map(item => (
											<List.Item key={item.id}>
												<Segment inverted>
													<List.Content floated="left">
														<Button inverted icon="cart arrow down" />
													</List.Content>
													<List.Content floated="right">
														<Button inverted icon="close" />
													</List.Content>
													<List.Content>
														<List.Header>{item.name}</List.Header>
														{item.price ? (
															<List.Description>Price Limit: ${item.price}</List.Description>
														) : (
															<List.Description>No Price Limit</List.Description>
														)}
													</List.Content>
												</Segment>
											</List.Item>
										))}
									</List>
									<AddListItem id={this.props.id} />
								</Grid.Column>
								<Grid.Column mobile={16} tablet={16} computer={4} textAlign="center">
									<h1>Users</h1>
									<UserList list={data.list} id={this.props.id} />
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
