import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Grid, Button } from 'semantic-ui-react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
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

const FormStyling = styled.div`
	margin: 10px 0 0;
	color: white;
	font-family: 'Roboto', sans-serif;
	padding: 0 0 150px;
	h1 {
		letter-spacing: 0.1rem;
		color: ${props => props.theme.orange};
		padding: 40px 0;
		font-family: 'Lobster', cursive;
		font-size: 4rem;
	}
	label {
		font-size: 1.4rem !important;
		letter-spacing: 0.1rem;
	}
	button {
		color: ${props => props.theme.orange} !important;
		font-size: 2rem !important;
		margin: 15px 10% 30px !important;
		width: 80%;
		font-family: 'Lobster', sans-serif !important;
		text-align: center;
		padding: 10px 0;
	}
	a {
		color: ${props => props.theme.orange} !important;
		font-size: 1.5rem;
	}
	input {
		margin: 20px 0 !important;
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
			<FormStyling>
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
								if (error) return <p>Error...</p>;
								return (
									<Form
										loading={loading}
										success={this.state.completed}
										method="post"
										onSubmit={async e => {
											e.preventDefault();
											await signup();
											this.setState({ username: '', email: '', password: '' });
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
			</FormStyling>
		);
	}
}

export default SignUp;
