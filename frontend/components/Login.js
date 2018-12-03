import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import FormStyles from './styles/FormStyles';
import { Grid, Form, Button } from 'semantic-ui-react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const LOGIN_USER_MUTATION = gql`
	mutation LOGIN_USER_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			username
			email
		}
	}
`;

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	// Save to state form information
	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<FormStyles>
				<Grid container textAlign="center">
					<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
						<div>
							<h1>Sign In to Grouper</h1>
						</div>
						<Mutation
							mutation={LOGIN_USER_MUTATION}
							variables={this.state}
							refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
							{(signin, { error, loading }) => {
								if (error) return <Error error={error} />;
								return (
									<Form
										loading={loading}
										inverted
										method="post"
										onSubmit={async e => {
											e.preventDefault();
											await signin();
											this.setState({ email: '', password: '' });
										}}>
										<Form.Group>
											<Form.Input
												width={16}
												type="email"
												name="email"
												label="User Name"
												value={this.state.email}
												onChange={this.saveToState}
												placeholder="Enter Email Address"
											/>
										</Form.Group>
										<Form.Group>
											<Form.Input
												name="password"
												width={16}
												label="Password"
												type="password"
												value={this.state.password}
												onChange={this.saveToState}
											/>
										</Form.Group>
										<Button inverted type="submit">
											Log{loading ? 'ging' : ''} In
										</Button>
									</Form>
								);
							}}
						</Mutation>
						<Link href="/join">
							<a>Not yet a member?</a>
						</Link>
					</Grid.Column>
				</Grid>
			</FormStyles>
		);
	}
}

export default Login;
