import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import FormStyles from './styles/FormStyles';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { INDIVIDUAL_LIST_QUERY } from './List';

const ADD_USER_MUTATION = gql`
	mutation ADD_USER_MUTATION($email: String!, $id: ID!) {
		addUser(email: $email, id: $id) {
			id
		}
	}
`;

class AddUser extends Component {
	state = {
		email: ''
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Mutation
				mutation={ADD_USER_MUTATION}
				variables={{ id: this.props.id, email: this.state.email }}
				refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}>
				{(addUser, { loading, error }) => {
					if (error) <p>Error...</p>;
					return (
						<FormStyles>
							<Form
								inverted
								method="post"
								onSubmit={async e => {
									e.preventDefault();
									await addUser();
									this.setState({ email: '' });
								}}>
								<Form.Group>
									<Form.Input
										width={16}
										type="text"
										name="email"
										label="User Email"
										value={this.state.email}
										onChange={this.saveToState}
										placeholder="Enter New User Email"
									/>
								</Form.Group>
								<Button inverted type="submit">
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
