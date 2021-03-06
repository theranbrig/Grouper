/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { LISTS_QUERY } from '../pages/Lists';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';

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
    fontFamily: 'Roboto',
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
  },
  picker: {
    color: 'white',
  },
  paragraph: {
    margin: 5,
    color: 'white',
    fontFamily: 'Roboto',
  },
});

const EDIT_ITEM_MUTATION = gql`
  mutation EDIT_ITEM_MUTATION($id: ID!, $name: String, $price: Int) {
    editListItem(id: $id, name: $name, price: $price) {
      id
      name
      price
      image
    }
  }
`;

const INDIVIDUAL_ITEM_QUERY = gql`
  query INDIVIDUAL_ITEM_QUERY($id: ID!) {
    listItem(where: { id: $id }) {
      id
      name
      price
      image
      user {
        id
        username
      }
    }
  }
`;

class EditListItem extends React.PureComponent {
  state = { isCompleted: false, submitting: false };

  componentDidMount() {
    this.setState({ isCompleted: true });
  }

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  updateList = async updateListMutation => {
    this.setState({ submitting: true });
    const res = await updateListMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    this.setState({ submitting: false });
  };

  render() {
    const { isCompleted } = this.state;
    return (
      <Query
        query={INDIVIDUAL_ITEM_QUERY}
        variables={{ id: this.props.id }}
        onCompleted={() => this.setState({ isCompleted: false })}
      >
        {({ data }) => (
          <>
            {isCompleted ? (
              <Spinner color="#ef8354" />
            ) : data.listItem ? (
              <Mutation
                mutation={EDIT_ITEM_MUTATION}
                variables={{ id: this.props.id, ...this.state }}
                refetchQueries={[{ query: INDIVIDUAL_ITEM_QUERY, variables: this.props.id }]}
              >
                {(editList, { loading, error }) => (
                  <View style={styles.container}>
                    {error && <Error error={error} />}
                    <Item>
                      <Input
                        autoCapitalize="none"
                        placeholder="Item Name"
                        onChangeText={name => this.setState({ name })}
                        style={{ color: '#ef8354', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                        placeholderTextColor="gray"
                        defaultValue={data.listItem.name}
                      />
                    </Item>
                    <Item>
                      <Icon
                        style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                        active
                        name="logo-usd"
                      />
                      <Input
                        keyboardType="numeric"
                        autoCapitalize="none"
                        placeholder="Item Price"
                        onChangeText={price => this.setState({ price })}
                        style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                        placeholderTextColor="gray"
                        defaultValue={`${data.listItem.price}`}
                      />
                    </Item>
                    {data.listItem.image && (
                      <Image source={{ uri: data.listItem.image }} style={{ width: 200, height: 200, margin: 10 }} />
                    )}
                    <Text style={{ color: '#fff', fontFamily: 'Roboto', padding: 5, fontSize: 18 }}>
                      Added by: {data.listItem.user.username}
                    </Text>
                    <Button
                      block
                      style={styles.orangeButton}
                      onPress={async () => {
                        await this.updateList(editList);
                      }}
                    >
                      {this.state.submitting ? (
                        <Spinner color="white" />
                      ) : (
                        <Text style={styles.orangeButtonText}>Update</Text>
                      )}
                    </Button>
                  </View>
                )}
              </Mutation>
            ) : (
              <Text>Nothing Found</Text>
            )}
          </>
        )}
      </Query>
    );
  }
}

export default EditListItem;
