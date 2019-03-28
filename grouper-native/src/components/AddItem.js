import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import Error from './ErrorMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  orangeButton: {
    marginLeft: '35%',
    margin: 10,
    width: '30%',
    backgroundColor: '#ef8354',
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  transparentButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  picker: {
    color: 'white',
  },
});

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION($name: String!, $price: Int, $list: String!) {
    addItem(name: $name, price: $price, list: $list) {
      id
      name
      price
    }
  }
`;

class AddItem extends React.Component {
  state = {
    name: '',
    price: 0,
  };

  render() {
    return (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        variables={{ list: this.props.id, ...this.state }}
        refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}
      >
        {(createItem, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add New Item</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Item Name"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Item Price"
                onChangeText={price => this.setState({ price })}
                value={this.state.price}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>

            <Button
              block
              style={styles.orangeButton}
              onPress={() => {
                createItem();
              }}
            >
              <Text style={styles.orangeButtonText}>Add{loading && 'ing'}</Text>
            </Button>
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddItem;
