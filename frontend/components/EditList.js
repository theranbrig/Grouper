import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Button, Form, Grid, Select, Message, Icon } from 'semantic-ui-react';
import Head from 'next/head';
import { typeOptions } from '../lib/formData';
import { INDIVIDUAL_LIST_QUERY } from './List';
import FormStyles from './styles/FormStyles';

const EDIT_LIST_MUTATION = gql`
  mutation EDIT_LIST_MUTATION($id: ID!, $name: String, $type: String) {
    editList(id: $id, name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

class EditList extends Component {
  state = { completed: false };

  handleChange = e => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  selectInput = (e, data) => {
    this.setState({ type: data.value });
  };

  updateList = async (e, updateListMutation) => {
    e.preventDefault();
    const res = await updateListMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    this.setState({ completed: true });
  };

  handleDismiss = () => {
    this.setState({ completed: false });
  };

  render() {
    return (
      <Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: this.props.id }}>
        {({ data, error }) => (
          <FormStyles>
            <Head>
              <title>Grouper | Edit {data.list.name}</title>
            </Head>
            <Grid container textAlign="center">
              <Grid.Column>
                <h1>
                  <Icon name="edit" />
                  Edit {data.list.name}
                </h1>
                <Link href={{ pathname: 'lists' }}>
                  <Button
                    inverted
                    icon="left chevron"
                    labelPosition="left"
                    content="Back to Lists"
                    className="back-link"
                  />
                </Link>
                <Mutation mutation={EDIT_LIST_MUTATION} variables={this.state}>
                  {(editList, { error, loading }) => (
                    <Form
                      success={this.state.completed}
                      error={error}
                      inverted
                      method="post"
                      loading={loading}
                      onSubmit={async e => {
                        await this.updateList(e, editList);
                      }}
                    >
                      <Message
                        onDismiss={this.handleDismiss}
                        success
                        header={`${data.list.name} Updated`}
                        content="Make further edits or go back to your list."
                      />
                      <Message error header="Oops!" content={error && error.message.replace('GraphQL error: ', '')} />
                      <Form.Group>
                        <Form.Input
                          required
                          width={12}
                          type="text"
                          id="name"
                          name="name"
                          label="List Name"
                          minLength={5}
                          defaultValue={data.list.name}
                          onChange={this.handleChange}
                          maxLength="40"
                          placeholder="Enter List Name - 40 Char Max"
                        />
                        <Form.Field
                          width={4}
                          control={Select}
                          options={typeOptions}
                          defaultValue={data.list.type}
                          onChange={this.selectInput}
                          label={{ children: 'Types', htmlFor: 'type' }}
                          search
                          fluid
                          searchInput={{ id: 'type' }}
                        />
                      </Form.Group>
                      <Button inverted type="submit" size="medium" className="edit-list-button">
                        Edit{loading ? 'ing' : ''} List
                      </Button>
                    </Form>
                  )}
                </Mutation>
              </Grid.Column>
            </Grid>
          </FormStyles>
        )}
      </Query>
    );
  }
}

export default EditList;
