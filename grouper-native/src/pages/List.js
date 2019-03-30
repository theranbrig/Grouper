import React from 'react';
import gql from 'graphql-tag';
import { View, Text, Container, Spinner, Button, Icon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import BackHeader from '../components/BackHeader';
import ListItem from '../components/ListItem';
import AddItem from '../components/AddItem';

const INDIVIDUAL_LIST_QUERY = gql`
  query INDIVIDUAL_LIST_QUERY($id: ID!) {
    list(where: { id: $id }) {
      id
      name
      type
      users {
        id
        username
        email
      }
      items {
        id
        name
        price
        inCart
        user {
          id
          username
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f5d75',
  },
  heading: {
    fontFamily: 'Lobster',
    fontSize: 25,
    color: '#ef8354',
  },
  subHeading: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'white',
  },
  topArea: {
    padding: 12,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'white',
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    marginTop: 14,
    marginRight: 12,
  },
});

class List extends React.PureComponent {
  state = {
    showAdd: false,
  };

  showAdd = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <Query query={INDIVIDUAL_LIST_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <Container style={styles.container}>
                <BackHeader backLink={() => this.props.history.push('/lists')} />
                <Spinner color="#ef8354" />
              </Container>
            );
          const { name, items, type, id } = data.list;
          return (
            <Container style={styles.container}>
              <BackHeader backLink={() => this.props.history.push('/lists')} />
              <ScrollView>
                <View style={styles.topInfo}>
                  <View style={styles.topArea}>
                    <Text style={styles.heading}>{name}</Text>
                    <Text style={styles.subHeading}>{type}</Text>
                  </View>
                  <Button rounded style={styles.orangeButton} onPress={() => this.showAdd()}>
                    {this.state.showAdd ? <Icon name="md-remove" /> : <Icon name="md-add" />}
                  </Button>
                </View>
                {this.state.showAdd && <AddItem id={id} />}
                {items.map(item => (
                  <ListItem key={item.id} item={item} listId={id} />
                ))}
              </ScrollView>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default List;
export { INDIVIDUAL_LIST_QUERY };
