import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
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
    borderBottomWidth: 1,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  orangeButton: {
    marginLeft: '30%',
    margin: 10,
    width: '40%',
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
  input: {
    color: '#fff',
    fontFamily: 'Roboto',
    paddingLeft: 15,
    fontSize: 18,
  },
});

const ADD_USER_MUTATION = gql`
  mutation ADD_USER_MUTATION($username: String!, $id: ID!) {
    addUserByName(username: $username, id: $id) {
      id
      username
    }
  }
`;

class AddUser extends React.Component {
  state = {
    username: '',
  };

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  render() {
    const { username } = this.state;
    return (
      <Mutation
        mutation={ADD_USER_MUTATION}
        variables={{ username, id: this.props.listId }}
        refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.listId } }]}
      >
        {(createList, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add Friend</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Friend's Username"
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
                style={styles.input}
                placeholderTextColor="gray"
              />
            </Item>
            <Button
              block
              style={styles.orangeButton}
              onPress={() => {
                createList();
                this.setState({ username: '' });
              }}
            >
              <Text style={styles.orangeButtonText}>Add{loading && 'ing'} Friend</Text>
            </Button>
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddUser;
