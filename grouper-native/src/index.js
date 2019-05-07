import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Spinner } from 'native-base';
import { Font } from 'expo';
import Pages from './pages';

const client = new ApolloClient({
  uri: 'https://grouper-backend-yoga.herokuapp.com/',
});

class AppProvider extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require('../assets/fonts/LobsterTwo-Regular.ttf'),
      Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    return <ApolloProvider client={client}>{fontLoaded ? <Pages /> : <Spinner color="#ef8354" />}</ApolloProvider>;
  }
}

export default AppProvider;
