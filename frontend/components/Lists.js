import React, { Component } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { Grid, List, Segment, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import AddList from './AddList';
import User from './User';
import Meta from './Meta';
import Link from 'next/link';

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
		}
	}
`;

const ListsStyles = styled.div`
	color: ${props => props.theme.offWhite};
	margin-top: 10px;
	font-family: 'Roboto', sans-serif;
	h1,
	h2 {
		font-family: 'Lobster', cursive;
		color: ${props => props.theme.orange};
		letter-spacing: 0.15rem;
	}
	h1 {
		font-size: 4rem;
	}
	h2 {
		font-size: 3rem;
	}
	.header {
		font-size: 1.5rem !important;
	}
	.description {
		font-size: 1.2rem !important;
		padding-top: 10px;
	}
	.ui.inverted.segment {
		background: ${props => props.theme.darkBlue};
	}
	.ui.list {
		padding-bottom: 50px;
	}
	i {
		width: 20px;
		padding-right: 10px;
	}
`;

class Lists extends Component {
	render() {
		return (
			<User>
				{({ data: { me } }) => {
					return (
						<ListsStyles>
							<Query query={LISTS_QUERY}>
								{({ data, loading, error }) => {
									console.log(data);
									if (error) return <p>Error...</p>;
									return (
										<Grid container centered>
											<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
												<h1>{me.username} Lists</h1>
												<List inverted relaxed>
													{data.lists.map(list => (
														<Link href={{ pathname: 'list', query: { id: list.id } }} key={list.id}>
															<List.Item>
																<Segment inverted textAlign="left">
																	<List.Content floated="right">
																		<Icon name="user outline" />
																		{list.users.length}
																	</List.Content>
																	<List.Header>{list.name}</List.Header>
																	<List.Description>{list.type}</List.Description>
																</Segment>
															</List.Item>
														</Link>
													))}
												</List>
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