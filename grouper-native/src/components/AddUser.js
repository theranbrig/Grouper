import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { LISTS_QUERY } from '../pages/Lists';
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
});

const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION($name: String!, $type: String!) {
    createList(name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

class AddUser extends React.Component {
  state = {
    email: '',
  };

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_LIST_MUTATION} variables={this.state} refetchQueries={[{ query: LISTS_QUERY }]}>
        {(createList, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add Friend</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Friend's Username"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            <Button
              block
              style={styles.orangeButton}
              onPress={() => {
                createList();
                this.setState({ email: '' });
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
