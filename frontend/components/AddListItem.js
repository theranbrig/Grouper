import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { INDIVIDUAL_LIST_QUERY } from './List';
import AddItemStyles from './styles/AddItemStyles';

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION($name: String!, $price: Int, $list: String!) {
    addItem(name: $name, price: $price, list: $list) {
      id
      name
      price
    }
  }
`;

class AddListItem extends Component {
  state = {
    name: '',
    price: 0,
    completed: false,
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDismiss = () => {
    this.setState({ completed: false });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        variables={{ list: this.props.id, name: this.state.name, price: this.state.price }}
        refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}
      >
        {(addItem, { loading, error }) => (
          <AddItemStyles>
            <Form
              error={error}
              success={this.state.completed}
              loading={loading}
              inverted
              method="post"
              onSubmit={async e => {
                await addItem();
                this.setState({ name: '', price: 0, completed: true });
              }}
            >
              <Message onDismiss={this.handleDismiss} success header="Success!" content="Item Added to List" />
              <Message error header="Oops!" content={error && error.message.replace('GraphQL error: ', '')} />
              <Form.Group>
                <Form.Input
                  required
                  width={12}
                  type="text"
                  name="name"
                  id="name"
                  label="Item"
                  value={this.state.name}
                  minLength={5}
                  maxLength={50}
                  onChange={this.saveToState}
                  placeholder="Enter Item Name - 5 Char Min / 50 Char Max"
                />
                <Form.Input
                  className="number-input"
                  width={4}
                  id="price"
                  type="number"
                  name="price"
                  label="Max Price: 0 = No Max."
                  value={this.state.price}
                  onChange={this.saveToState}
                  placeholder="Optional - Enter Whole Dollar Amounts"
                  icon="dollar"
                  iconPosition="left"
                />
                <Button inverted icon="add" className="add-item-button" />
              </Form.Group>
            </Form>
          </AddItemStyles>
        )}
      </Mutation>
    );
  }
}

AddListItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddListItem;
