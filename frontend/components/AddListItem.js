import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form } from 'semantic-ui-react';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from './List';
import AddItemStyles from './styles/AddItemStyles';

const ADD_ITEM_MUTATION = gql`
	mutation ADD_ITEM_MUTATION($name: String!, $price: Int, $list: String!) {
		addItem(name: $name, price: $price, list: $list) {
			id
			name
			price
		}
	}
`;

class AddListItem extends Component {
	state = {
		name: '',
		price: undefined
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Mutation
				mutation={ADD_ITEM_MUTATION}
				variables={{ list: this.props.id, name: this.state.name, price: this.state.price }}
				refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}>
				{(addItem, { loading, error }) => {
					if (error) return <Error error={error} />;
					return (
						<AddItemStyles>
							<Form
								loading={loading}
								inverted
								method="post"
								onSubmit={async e => {
									e.preventDefault;
									addItem();
									this.setState({
										name: '',
										price: ''
									});
								}}>
								<Form.Group>
									<Form.Input
										width={13}
										type="text"
										name="name"
										label="Item"
                    value={this.state.name}
                    maxLength="50"
										onChange={this.saveToState}
										placeholder="Enter Item Name - 50 Character Max"
									/>
									<Form.Input
										width={3}
										type="number"
										name="price"
										label="Maximum Price"
										value={this.state.price}
										onChange={this.saveToState}
										placeholder="Optional - Enter Whole Dollar Amounts"
										icon="dollar"
										iconPosition="left"
									/>
									<Button inverted icon="add" className="add-item-button" />
								</Form.Group>
							</Form>
						</AddItemStyles>
					);
				}}
			</Mutation>
		);
	}
}

export default AddListItem;
