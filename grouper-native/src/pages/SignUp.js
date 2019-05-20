// SignUp.js
import React from 'react';
import { StyleSheet, TextInput, View, StatusBar } from 'react-native';
import { Button, Text, Icon, Container, Spinner } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../components/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5d75',
    padding: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    marginTop: 8,
    color: '#2d3142',
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 60,
  },
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  transparentButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  paragraph: {
    color: '#fefefe',
    width: '90%',
    textAlign: 'center',
    margin: 15,
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
  },
  transparentButtonText: {
    fontFamily: 'Roboto',
  },
});

const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION($username: String!, $password: String!, $email: String!) {
    signup(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
  };

  render() {
    const { email, password, username } = this.state;
    const { history } = this.props;
    return (
      <Container>
        <Mutation
          mutation={SIGNUP_USER_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(signUp, { data, loading, error }) => {
            console.log('data', data);
            return (
              <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.heading}>Grouper</Text>
                <Text style={styles.paragraph}>Sign up today and start group shopping today.</Text>
                {loading && <Spinner color="#ef8354" />}
                <TextInput
                  placeholder="Email"
                  autoCapitalize="none"
                  style={styles.textInput}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                />
                <TextInput
                  placeholder="User Name"
                  autoCapitalize="none"
                  style={styles.textInput}
                  onChangeText={username => this.setState({ username })}
                  value={username}
                />
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  autoCapitalize="none"
                  style={styles.textInput}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                />
                <Button
                  block
                  style={styles.orangeButton}
                  onPress={async () => {
                    await signUp();
                    history.push('/');
                  }}
                >
                  <Text style={styles.orangeButtonText}>Sign{loading && 'ing'} Up</Text>
                  <Icon name="md-arrow-round-forward" />
                </Button>
                <Button transparent light block style={styles.transparentButton} onPress={() => history.push('/login')}>
                  <Text style={styles.transparentButtonStyle}>Already have an Account? Login Now.</Text>
                </Button>
              </View>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default SignUp;
