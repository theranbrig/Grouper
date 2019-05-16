import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const HIDE_FRIEND_REQUEST = gql`
  mutation HIDE_FRIEND_REQUEST($id: ID!) {
    hideFriendRequest(id: $id) {
      id
    }
  }
`;

const styles = StyleSheet.create({
  transparentButton: {
    marginLeft: '5%',
    margin: 3,
    width: '90%',
    backgroundColor: 'transparent',
  },
  transparentButtonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

const HideFriendRequest = props => (
  <Mutation
    mutation={HIDE_FRIEND_REQUEST}
    variables={{ id: props.id }}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(hideFriendRequest, { loadng, error }) => (
      <Button block onPress={async () => await hideFriendRequest()} style={styles.transparentButton}>
        <Text style={styles.transparentButtonText}>Not Now</Text>
      </Button>
    )}
  </Mutation>
);

export default HideFriendRequest;
