import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Grid } from 'semantic-ui-react';
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
								if (error) return <Error error={error} />;
								return (
									<Form
										inverted
										loading={loading}
										success={this.state.completed}
										method="post"
										onSubmit={async e => {
											e.preventDefault();
											await signup();
											this.setState({ username: '', email: '', password: '' });
											Router.push({
												pathname: '/'
											});
										}}>
										<Form.Group>
											<Form.Input
												width={16}
												type="text"
												name="username"
												label="User Name"
												value={this.state.username}
												onChange={this.saveToState}
												placeholer="Choose User Name"
											/>
										</Form.Group>
										<Form.Group>
											<Form.Input
												type="email"
												name="email"
												width={16}
												label="Email"
												value={this.state.email}
												onChange={this.saveToState}
												placeholer="Enter Email Address"
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
											Join{loading ? 'ing' : ''}
										</Button>
									</Form>
								);
							}}
						</Mutation>
						<Link href="/login">
							<a>Already a member?</a>
						</Link>
					</Grid.Column>
				</Grid>
			</FormStyles>
		);
	}
}

export default SignUp;
