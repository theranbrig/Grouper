import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Message } from 'semantic-ui-react';
import { INDIVIDUAL_LIST_QUERY } from './List';
import FormStyles from './styles/FormStyles';

const ADD_USER_MUTATION = gql`
	mutation ADD_USER_MUTATION($email: String!, $id: ID!) {
		addUser(email: $email, id: $id) {
			id
			username
		}
	}
`;

class AddUser extends Component {
	state = {
		email: '',
		completed: false
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addNewUser = async (e, addUserMutation) => {
		e.preventDefault();
		const res = await addUserMutation({
			variables: { id: this.props.id, email: this.state.email }
		});
		this.setState({ completed: true, email: '' });
	};

	handleDismiss = () => {
		this.setState({ completed: false });
	};

	render() {
		return (
			<Mutation
				mutation={ADD_USER_MUTATION}
				variables={{ id: this.props.id, email: this.state.email }}
				refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}>
				{(addUser, { loading, error }) => {
					return (
						<FormStyles>
							<Form
								error={error}
								success={this.state.completed}
								loading={loading}
								inverted
								method="post"
								onSubmit={async e => {
									await this.addNewUser(e, addUser);
								}}>
								<Message
									onDismiss={this.handleDismiss}
									success
									header="Success!"
									content={'User added.'}
								/>
								<Message
									error
									header="Oops!"
									content={error && error.message.replace('GraphQL error: ', '')}
								/>
								<Form.Group>
									<Form.Input
										width={16}
										type="text"
										name="email"
										label="Add New User - Enter Email"
										value={this.state.email}
										onChange={this.saveToState}
										placeholder="Enter New User Email"
									/>
								</Form.Group>
								<Button inverted type="submit" disabled={loading}>
									Add{loading ? 'ing' : ''} User
								</Button>
							</Form>
						</FormStyles>
					);
				}}
			</Mutation>
		);
	}
}

export default AddUser;
