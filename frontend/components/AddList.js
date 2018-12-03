import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Button, Select } from 'semantic-ui-react';
import { typeOptions } from '../lib/formData';
import { LISTS_QUERY } from './Lists';
import FormStyles from './styles/FormStyles';

const CREATE_LIST_MUTATION = gql`
	mutation CREATE_LIST_MUTATION($name: String!, $type: String!) {
		createList(name: $name, type: $type) {
			id
			name
			type
		}
	}
`;

class AddList extends Component {
	state = {
		name: '',
		type: ''
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	selectInput = (e, data) => {
		this.setState({ type: data.value });
	};

	render() {
		return (
			<div>
				<h2>Add New List</h2>
				<Mutation
					mutation={CREATE_LIST_MUTATION}
					refetchQueries={[{ query: LISTS_QUERY }]}
					variables={this.state}>
					{(createList, { error, loading }) => {
						if (error) <p>New error...</p>;
						return (
							<FormStyles>
								<Form
									inverted
									method="post"
									loading={loading}
									onSubmit={async e => {
										e.preventDefault();
										const res = await createList();
										this.setState({
											name: '',
											type: ''
										});
									}}>
									<Form.Group>
										<Form.Input
											width={12}
											type="text"
											name="name"
											label="List Name"
											value={this.state.name}
											onChange={this.saveToState}
											placeholder="Enter List Name"
										/>
										<Form.Field
											width={4}
											control={Select}
											options={typeOptions}
											value={this.state.type}
											onChange={this.selectInput}
											label={{ children: 'Types', htmlFor: 'type' }}
											search
											fluid
											searchInput={{ id: 'type' }}
										/>
									</Form.Group>
									<Button inverted type="submit" size="medium">
										Add{loading ? 'ing' : ''} List
									</Button>
								</Form>
							</FormStyles>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default AddList;
