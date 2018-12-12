import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import FormStyles from './styles/FormStyles';
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
		password: '',
		completed: false
	};

	// Save to state form information
	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<FormStyles>
				<Head>
					<title>Grouper | Login</title>
				</Head>
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
								return (
									<Form
										success={this.state.completed}
										error={error}
										loading={loading}
										inverted
										method="post"
										onSubmit={async e => {
											e.preventDefault();
											await signin();
											this.setState({ email: '', password: '', completed: true });
											Router.push({
												pathname: '/'
											});
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
												required
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
												required
												name="password"
												width={16}
												label="Password"
												type="password"
												placeholder="Enter Email"
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
							<a>Not yet a member? Sign Up Here.</a>
						</Link>
					</Grid.Column>
				</Grid>
			</FormStyles>
		);
	}
}

export default Login;
