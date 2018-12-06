import React, { Component } from 'react';
import { List, Button, icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { INDIVIDUAL_LIST_QUERY } from './List';

const TOGGLE_LIST_ITEM_MUTATION = gql`
	mutation TOGGLE_LIST_ITEM_MUTATION($id: String!) {
		toggleInCart(id: $id) {
			id
			inCart
		}
	}
`;

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: String!) {
		removeListItem(id: $id) {
			id
		}
	}
`;

class ListButtons extends Component {
	render() {
		return (
			<div>
				<Mutation
					mutation={TOGGLE_LIST_ITEM_MUTATION}
					variables={{ id: this.props.id }}
					refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}>
					{(toggleInCart, { loading, error }) => {
						if (error) return <p>Error...</p>;
						return (
							<List.Content floated="left">
								<Button
									inverted
									icon={this.props.inCart ? `check` : `cart arrow down`}
									disabled={loading}
									onClick={async e => {
										e.preventDefault();
										toggleInCart();
									}}
								/>
							</List.Content>
						);
					}}
				</Mutation>
				<Mutation
					mutation={DELETE_ITEM_MUTATION}
					variables={{ id: this.props.id }}
					refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}>
					{(removeListItem, { loading, error }) => {
						if (error) return <p>Error...</p>;
						return (
							<List.Content floated="right">
								<Button
									inverted
									icon="close"
									diabled={loading}
									onClick={async e => {
										e.preventDefault();
										removeListItem();
									}}
								/>
							</List.Content>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default ListButtons;
