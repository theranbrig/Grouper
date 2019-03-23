import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { CURRENT_USER_QUERY } from './User';

const LOGOUT_USER_MUTATION = gql`
  mutation LOGOUT_USER_MUTATION {
    signout {
      message
    }
  }
`;

const styles = StyleSheet.create({
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
});

const LogoutButton = props => (
  <Mutation mutation={LOGOUT_USER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(signout, { loading, error }) => (
      <Button
        block
        style={styles.orangeButton}
        onPress={async () => {
          await signout();
          props.pushToSplash();
        }}
      >
        <Text style={styles.orangeButtonText}>Log{loading && 'ging'} Out</Text>
      </Button>
    )}
  </Mutation>
);

export default LogoutButton;
