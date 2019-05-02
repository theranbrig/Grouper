import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { ADD_TO_FRIENDS } from './AddToFriendsButton';
import { CURRENT_USER_QUERY } from './User';

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

class AddFriend extends React.Component {
  state = {
    friendName: '',
  };

  render() {
    const { username } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_FRIENDS}
        variables={{ friendName: this.state.friendName, username }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(createList, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add Friend</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Enter Friend's Username"
                onChangeText={friendName => this.setState({ friendName })}
                value={this.state.friendName}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            <Button
              block
              style={styles.orangeButton}
              onPress={() => {
                createList();
                this.setState({ friendName: '' });
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

export default AddFriend;