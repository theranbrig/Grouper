import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import Error from './ErrorMessage';
import User from './User';

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
    marginLeft: '20%',
    margin: 10,
    width: '60%',
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
    friend: '',
  };

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  render() {
    const { username } = this.state;
    return (
      <User>
        {({ data: { me } }) => {
          console.log(me);
          return (
            <Mutation
              mutation={ADD_USER_MUTATION}
              variables={{ username, id: this.props.listId }}
              refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.listId } }]}
            >
              {(createList, { loading, error }) => (
                <View style={styles.container}>
                  <Text style={styles.heading}>Add New List Mates</Text>
                  {error && <Error error={error} />}
                  <Item>
                    <Input
                      autoCapitalize="none"
                      placeholder="Find By Username"
                      onChangeText={username => this.setState({ username })}
                      value={this.state.username}
                      style={styles.input}
                      placeholderTextColor="gray"
                    />
                  </Item>

                  {me.friends.length ? (
                    <>
                      <Text>or</Text>
                      <Text>Add From Friend List</Text>
                      <Item picker>
                        <Picker
                          renderHeader={backAction => (
                            <Header style={{ backgroundColor: '#ef8354' }}>
                              <Left>
                                <Button transparent onPress={backAction}>
                                  <Icon name="arrow-back" style={{ color: '#fff' }} />
                                </Button>
                              </Left>
                              <Body style={{ flex: 3 }}>
                                <Title style={{ color: '#fff', fontFamily: 'Roboto' }}>Select Friend</Title>
                              </Body>
                              <Right />
                            </Header>
                          )}
                          note
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: '#ef8354' }} />}
                          style={{ width: undefined }}
                          textStyle={{ color: 'white', fontSize: 18 }}
                          placeholderIconColor="#ef8354"
                          selectedValue={this.state.friend}
                          itemStyle={{
                            marginLeft: 0,
                            paddingLeft: 20,
                            borderBottomWidth: 0,
                          }}
                          itemTextStyle={{
                            color: '#4f5d75',
                            fontFamily: 'Roboto',
                          }}
                          onValueChange={this.onValueChange.bind(this)}
                        >
                          {me.friends.map(friend => (
                            <Picker.Item label={`${friend.username}`} value={`${friend.username}`} />
                          ))}
                        </Picker>
                      </Item>
                    </>
                  ) : (
                    <Text style={{ color: '#fff', fontFamily: 'Roboto', margin: 10 }}>No Friends Found</Text>
                  )}
                  <Button
                    block
                    style={styles.orangeButton}
                    onPress={() => {
                      createList();
                      this.setState({ username: '' });
                    }}
                  >
                    <Text style={styles.orangeButtonText}>Add{loading && 'ing'} List Mate</Text>
                  </Button>
                </View>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default AddUser;
