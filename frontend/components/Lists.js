import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Grid, Icon, List, Segment, Button } from 'semantic-ui-react';
import AddList from './AddList';
import RemoveListButton from './RemoveListButton';
import ListsStyles from './styles/ListsStyles';
import User from './User';

const LISTS_QUERY = gql`
	query LISTS_QUERY {
		lists {
			id
			name
			type
			users {
				id
				username
			}
			items {
				id
			}
		}
	}
`;

class Lists extends Component {
	render() {
		return (
			<User>
				{({ data: { me } }) => {
					return (
						<ListsStyles>
							<Head>
								<title>Grouper | {me.username} Lists</title>
							</Head>
							<Query query={LISTS_QUERY} pollInterval={10000}>
								{({ data, loading, error }) => {
									if (error) return <p>Error...</p>;
									let userLists = data.lists.filter(list => {
										return list.users.some(user => user.id === me.id);
									});
									return (
										<Grid container centered>
											<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
												<h1>{me.username} Lists</h1>
												{!userLists.length ? (
													<h3>No Lists Yet. Add one today.</h3>
												) : (
													<List inverted relaxed>
														{userLists.map(list => (
															<Link
																href={{ pathname: 'list', query: { id: list.id } }}
																key={list.id}>
																<List.Item>
																	<Segment.Group horizontal>
																		<Segment inverted textAlign="left">
																			<List.Header>{list.name}</List.Header>
																			<List.Description>{list.type}</List.Description>
																			<Icon name="check" />
																			{list.items.length}
																			<span> </span>
																			<Icon name="user outline" className="user-icon"/>
																			{list.users.length}
																		</Segment>
																		<Segment inverted>
																			<List.Content floated="right">
																				<Link
																					href={{ pathname: 'editlist', query: { id: list.id } }}>
																					<Button
																						className="edit-button"
																						inverted
																						icon="edit"
																						disabled={loading}
																					/>
																				</Link>
																				<br />
																				<RemoveListButton id={list.id} />
																			</List.Content>
																			<List.Content floated="right">
																				<br />
																			</List.Content>
																		</Segment>
																	</Segment.Group>
																</List.Item>
															</Link>
														))}
													</List>
												)}
												<div>
													<AddList />
												</div>
											</Grid.Column>
										</Grid>
									);
								}}
							</Query>
						</ListsStyles>
					);
				}}
			</User>
		);
	}
}

export default Lists;
export { LISTS_QUERY };
