import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Grid, List, Loader, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddListItem from './AddListItem';
import AddUser from './AddUser';
import ListButtons from './ListButtons';
import IndividualListStyles from './styles/IndividualListStyles';
import User from './User';
import UserList from './UserList';

// Query Mutation
const INDIVIDUAL_LIST_QUERY = gql`
  query INDIVIDUAL_LIST_QUERY($id: ID!) {
    list(where: { id: $id }) {
      id
      name
      type
      users {
        id
        username
        email
      }
      items {
        id
        name
        price
        inCart
      }
    }
  }
`;

const IndividualList = props => (
  <User>
    {({ data: { me } }) => (
      <Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: props.id }} pollInterval={5000}>
        {({ data, loading, error, subscribeToMore }) => {
          if (error) return <p>Error...</p>;
          if (loading) return <p>Loading...</p>;
          const items = data.list.items;
          // Check if user authorized to view list
          const userCheck = data.list.users.some(user => user.id === me.id);
          return (
            <IndividualListStyles>
              <Head>
                <title>Grouper | {data.list.name}</title>
              </Head>
              {!userCheck ? (
                <Grid container centered>
                  <div>
                    <Head>
                      <title>Grouper | Oops</title>
                    </Head>
                    <h1>Halt! You can not go there.</h1>
                    <p>You are not authorized to view this list.</p>
                    <Link href="/lists">
                      <a>Go Back to Your Lists</a>
                    </Link>
                  </div>
                </Grid>
              ) : (
                <Grid container centered>
                  <Grid.Column mobile={16} tablet={16} computer={12} textAlign="center">
                    {!data && <p>There is nothing for you to see here.</p>}
                    <h1>{data.list.name}</h1>
                    <h2>
                      {data.list.type}
                      <Link href={{ pathname: 'editlist', query: { id: data.list.id } }}>
                        <Button className="top-edit-button" inverted icon="edit" disabled={loading} />
                      </Link>
                    </h2>
                    {!items.length && (
                      <div>
                        <h3>No items in {data.list.name}. Start Adding Items.</h3>
                      </div>
                    )}
                    <List inverted relaxed>
                      {items.map(item => (
                        <List.Item key={item.id}>
                          <Segment inverted className={item.inCart ? `in-cart` : `out-cart`}>
                            <ListButtons inCart={item.inCart} id={item.id} />
                            <List.Content>
                              <List.Header>{item.name}</List.Header>
                              {item.price ? (
                                <List.Description>Price Limit: ${item.price}</List.Description>
                              ) : (
                                <List.Description>No Price Limit</List.Description>
                              )}
                            </List.Content>
                          </Segment>
                        </List.Item>
                      ))}
                    </List>
                    <AddListItem id={props.id} />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={4} textAlign="center">
                    <h1>Users</h1>
                    <UserList list={data.list} id={props.id} />
                    <AddUser id={props.id} />
                  </Grid.Column>
                </Grid>
              )}
            </IndividualListStyles>
          );
        }}
      </Query>
    )}
  </User>
);

IndividualList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IndividualList;
export { INDIVIDUAL_LIST_QUERY };
