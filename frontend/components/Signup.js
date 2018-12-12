import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import Error from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_USER_MUTATION = gql`
	mutation SIGNUP_USER_MUTATION($username: String!, $password: String!, $email: String!) {
		signup(username: $username, password: $password, email: $email) {
			id
			username
			email
		}
	}
`;

class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		completed: false
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	formComplete = () => {
		this.setState({ completed: true });
	};

	render() {
		return (
			<FormStyles>
				<Head>
					<title>Grouper | Sign Up</title>
				</Head>
				<Grid container textAlign="center">
					<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
						<div>
							<h1>Sign Up for Grouper</h1>
						</div>
						<Mutation
							mutation={SIGNUP_USER_MUTATION}
							variables={this.state}
							refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
							{(signup, { error, loading }) => {
								return (
									<Form
										success={this.state.completed}
										error={error}
										inverted
										loading={loading}
										method="post"
										onSubmit={async e => {
											e.preventDefault();
											await signup();
											this.setState({ username: '', email: '', password: '', completed: true });
											Router.push({
												pathname: '/'
											});
										}}>
										<Message
											onDismiss={this.handleDismiss}
											success
											header="Success!"
											content={'User account created.'}
										/>
										<Message
											error
											header="Oops!"
											content={error && error.message.replace('GraphQL error: ', '')}
										/>
										<Form.Group>
											<Form.Input
												minLength={5}
												maxLength={20}
												required
												width={16}
												type="text"
												name="username"
												label="User Name"
												value={this.state.username}
												onChange={this.saveToState}
												placeholder="Choose User Name: 5 - 20 Characters"
											/>
										</Form.Group>
										<Form.Group>
											<Form.Input
												required
												type="email"
												name="email"
												width={16}
												label="Email"
												value={this.state.email}
												onChange={this.saveToState}
												placeholder="Enter Email Address"
											/>
										</Form.Group>
										<Form.Group>
											<Form.Input
												minLength={8}
												maxLength={32}
												required
												name="password"
												width={16}
												placeholder="8 - 32 Characters"
												label="Password"
												type="password"
												value={this.state.password}
												onChange={this.saveToState}
											/>
										</Form.Group>
										<Button inverted type="submit">
											Join{loading ? 'ing' : ''}
										</Button>
									</Form>
								);
							}}
						</Mutation>
						<Link href="/login">
							<a>Already a member? Sign In Here.</a>
						</Link>
					</Grid.Column>
				</Grid>
			</FormStyles>
		);
	}
}

export default SignUp;
