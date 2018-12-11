import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Button, Form, Grid, Icon, Message } from 'semantic-ui-react';
import AddItemStyles from './styles/AddItemStyles';
import Head from 'next/head';

const ITEM_QUERY = gql`
	query ITEM_QUERY($id: ID!) {
		listItem(where: { id: $id }) {
			id
			name
			price
			list
		}
	}
`;

const EDIT_ITEM_MUTATION = gql`
	mutation EDIT_ITEM_MUTATION($id: ID!, $name: String, $price: Int) {
		editListItem(id: $id, name: $name, price: $price) {
			id
			name
			price
			list
		}
	}
`;

class EditItem extends Component {
	state = { completed: false };

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	updateItem = async (e, updateItemMutation) => {
		e.preventDefault();
		const res = await updateItemMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		this.setState({ completed: true });
	};

	handleDismiss = () => {
		this.setState({ completed: false });
	};

	render() {
		return (
			<Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading, error }) => {
					if (error) return <p>Error...</p>;
					return (
						<AddItemStyles>
							<Head>
								<title>Grouper | Edit {data.listItem.name}</title>
							</Head>
							<Grid container textAlign="center">
								<Grid.Column>
									<h1>Edit {data.listItem.name}</h1>
									<Link href={{ pathname: 'list', query: { id: data.listItem.list } }}>
										<Button
											inverted
											icon="left chevron"
											labelPosition="left"
											content="Return to List"
										/>
									</Link>
									<Mutation mutation={EDIT_ITEM_MUTATION} variables={this.state}>
										{(editListItem, { loading, error }) => {
											if (error) return <p>Error...</p>;
											return (
												<Form
													error={error}
													success={this.state.completed}
													inverted
													loading={loading}
													method="post"
													onSubmit={async e => {
														await this.updateItem(e, editListItem);
													}}>
													>
													<Message
														onDismiss={this.handleDismiss}
														success
														header={`${data.listItem.name} Updated`}
														content="Make further edits or go back to your list."
													/>
													<Message
														error
														header="Oops!"
														content={error && error.message.replace('GraphQL error: ', '')}
													/>
													<Form.Group>
														<Form.Input
															required
															width={13}
															type="text"
															name="name"
															id="name"
															label="Item"
															defaultValue={data.listItem.name || ''}
															minLength={5}
															maxLength={50}
															onChange={this.handleChange}
															placeholder="Enter Item Name - 50 Character Max"
														/>
														<Form.Input
															width={3}
															type="number"
															name="price"
															id="price"
															label="Max Price: 0 = No Max."
															defaultValue={data.listItem.price}
															onChange={this.handleChange}
															placeholder="Optional - Enter Whole Dollar Amounts"
															icon="dollar"
															iconPosition="left"
														/>
														<Button inverted icon="edit" className="add-item-button" />
													</Form.Group>
												</Form>
											);
										}}
									</Mutation>
								</Grid.Column>
							</Grid>
						</AddItemStyles>
					);
				}}
			</Query>
		);
	}
}

export default EditItem;
