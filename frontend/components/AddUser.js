import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import FormStyles from './styles/FormStyles';

class AddUser extends Component {
	state = {
		email: ''
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<FormStyles>
				<Form inverted method="post">
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
					<Button inverted type="submit" size="medium">
						Add User
					</Button>
				</Form>
			</FormStyles>
		);
	}
}

export default AddUser;
