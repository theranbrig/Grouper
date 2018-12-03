import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AddUser from './AddUser';

const INDIVIDUAL_LIST_QUERY = gql`
	query INDIVIDUAL_LIST_QUERY($id: ID!) {
		list(where: { id: $id }) {
			id
			name
			type
			users {
				id
				username
			}
		}
	}
`;

const IndividualListStyles = styled.div`
	margin-top: 10px;
	color: ${props => props.theme.offWhite};
	h1 {
		color: ${props => props.theme.orange} !important;
		font-family: 'Lobster', cursive;import AddUser from './AddUser';

	}
`;

class List extends Component {
	render() {
		return (
			<Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading, error }) => {
					if (loading) return <p>Loading...</p>;
					console.log(data);
					return (
						<IndividualListStyles>
							<Grid container centered>
								<Grid.Column mobile={16} tablet={12} computer={12} textAlign="center">
									<h1>{data.list.name}</h1>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4} textAlign="center">
									<h1>Users</h1>
									{data.list.users.map(user => (
										<p>{user.username}</p>
									))}
									<AddUser />
								</Grid.Column>
							</Grid>
						</IndividualListStyles>
					);
				}}
			</Query>
		);
	}
}

export default List;
