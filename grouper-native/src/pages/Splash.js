/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Button, Text, Spinner } from 'native-base';
import SpinningImageLoader from 'react-native-spinning-image';
import User from '../components/User';
import Error from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5d75',
    padding: 10,
  },
  paragraph: {
    color: '#fefefe',
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
  },
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',
    fontFamily: 'Lobster',
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  heading: {
    color: '#ef8354',
    fontSize: 60,
    fontFamily: 'Lobster',
  },
  buttonText: {
    fontSize: 25,
  },
  mainImage: {
    marginBottom: 40,
  },
});

const fishImage = require('../../assets/images/colorfish.png');

class Splash extends React.Component {
  state = { isSubmitting: false };

  componentDidMount() {
    this.setState({ isSubmitting: true });
    setTimeout(() => {
      this.setState({ isSubmitting: false });
    }, 1000);
  }

  render() {
    const { isSubmitting } = this.state;
    const { history } = this.props;
    return (
      <User>
        {({ data: { me }, loading, error }) => (
          <Container>
            {me === undefined ? (
              <LoadingSpinner />
            ) : (
              <View style={styles.container}>
                <Text style={styles.heading}>Grouper</Text>
                <View style={styles.mainImage}>
                  <Image source={require('../../assets/images/colorfish.png')} resizeMode="contain" />
                </View>
                <Text style={styles.paragraph}>Shop Faster. Shop Together. Shop Smarter</Text>
                {error && <Error error={error} />}
                {loading || isSubmitting ? (
                  <Spinner color="#ef8354" />
                ) : me ? (
                  <>
                    <Button block style={styles.orangeButton} onPress={() => history.push('/lists')}>
                      <Text style={styles.orangeButtonText}>Go To {me.username}'s Lists</Text>
                    </Button>
                    <Button block style={styles.orangeButton} onPress={() => history.push('/logout')}>
                      <Text style={styles.orangeButtonText}>Logout</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button block style={styles.orangeButton} onPress={() => history.push('/signup')}>
                      <Text style={styles.orangeButtonText}>Sign Up</Text>
                    </Button>
                    <Button block style={styles.orangeButton} onPress={() => history.push('/login')}>
                      <Text style={styles.orangeButtonText}>Login</Text>
                    </Button>
                  </>
                )}
              </View>
            )}
          </Container>
        )}
      </User>
    );
  }
}

export default Splash;
