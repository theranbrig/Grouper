import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text, Item, Input } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SEND_FRIEND_REQUEST_BY_USERNAME_MUTATION = gql`
  mutation SEND_FRIEND_REQUEST_BY_USERNAME_MUTATION($senderId: String!, $receiverUsername: String!) {
    sendFriendRequestByUsername(senderId: $senderId, receiverUsername: $receiverUsername) {
      id
      senderId
      receiverId
      requestUsername
    }
  }
`;

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
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
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
    const { userId } = this.props;
    return (
      <Mutation
        mutation={SEND_FRIEND_REQUEST_BY_USERNAME_MUTATION}
        variables={{ senderId: userId, receiverUsername: this.state.friendName }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(sendFriendRequestByUsername, { loading, error }) => (
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
              onPress={async () => {
                await sendFriendRequestByUsername();
                await Alert.alert(`Friend Request Sent to ${this.state.friendName}`, 'They will confirm shortly.');
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
