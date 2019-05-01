import React from 'react';
import gql from 'graphql-tag';
import { View, Text, Container, Spinner, Button, Icon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import BackHeader from '../components/BackHeader';
import ListItem from '../components/ListItem';
import AddItem from '../components/AddItem';
import ListUser from '../components/ListUser';
import AddUser from '../components/AddUser';
import User from '../components/User';

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
        image
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
    paddingBottom: 40,
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
    borderBottomWidth: 0.25,
    borderBottomColor: 'white',
  },
  bottomArea: {
    padding: 12,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.25,
    borderBottomColor: 'white',
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 10,
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    marginTop: 14,
    marginRight: 12,
  },
  orangeSortButton: {
    backgroundColor: '#ef8354',
    margin: 5,
  },
});

class List extends React.PureComponent {
  state = {
    showAdd: false,
    showAddUser: false,
  };

  showAdd = () => {
    this.setState(prevState => ({ showAdd: !prevState.showAdd }));
  };

  showAddUser = () => {
    this.setState(prevState => ({ showAddUser: !prevState.showAddUser }));
  };

  render() {
    const backPath = this.props.history.entries[this.props.history.entries.length - 2].pathname;
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: this.props.match.params.id }}>
            {({ data, loading, error }) => {
              if (loading)
                return (
                  <Container style={styles.container}>
                    <BackHeader
                      backLink={() => this.props.history.push(backPath)}
                      profileLink={() => this.props.history.push('/profile')}
                    />
                    <Spinner color="#ef8354" />
                  </Container>
                );
              const { name, items, type, id, users } = data.list;
              const orderedUsers = [];
              users.forEach(user => {
                if (user.id === me.id) {
                  orderedUsers.unshift(user);
                } else {
                  orderedUsers.push(user);
                }
              });
              const priceSortItems = items.sort((a, b) => a.price - b.price);
              const alphaSortItems = items.sort((a, b) => {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
              console.log('alphaSort', alphaSortItems);
              return (
                <Container style={styles.container}>
                  <BackHeader
                    backLink={() => this.props.history.push('/lists')}
                    profileLink={() => this.props.history.push('/profile')}
                  />
                  <ScrollView>
                    <View style={styles.topInfo}>
                      <View style={styles.topArea}>
                        <Text style={styles.heading}>{name}</Text>
                        <Text style={styles.subHeading}>{type}</Text>
                      </View>
                      <Button block style={styles.orangeButton} onPress={() => this.showAdd()}>
                        {this.state.showAdd ? (
                          <Icon type="Feather" name="minus" />
                        ) : (
                          <Icon type="Feather" name="plus" />
                        )}
                      </Button>
                    </View>
                    {this.state.showAdd && <AddItem id={id} />}
                    {items.map(item => (
                      <ListItem key={item.id} item={item} listId={id} />
                    ))}
                    <View style={styles.sortButtons}>
                      <Button style={styles.orangeSortButton}>
                        <Icon type="FontAwesome" name="sort-numeric-asc" />
                      </Button>
                      <Button style={styles.orangeSortButton}>
                        <Icon type="FontAwesome" name="sort-alpha-asc" />
                      </Button>
                    </View>
                    <View style={styles.bottomInfo}>
                      <View style={styles.bottomArea}>
                        <Text style={styles.heading}>List Mates</Text>
                      </View>
                      <Button block style={styles.orangeButton} onPress={() => this.showAddUser()}>
                        {this.state.showAddUser ? (
                          <Icon type="Feather" name="minus" />
                        ) : (
                          <Icon type="Feather" name="plus" />
                        )}
                      </Button>
                    </View>
                    {this.state.showAddUser && <AddUser listId={id} />}
                    {orderedUsers.map(user => (
                      <ListUser key={user.id} user={user} listId={id} />
                    ))}
                  </ScrollView>
                </Container>
              );
            }}
          </Query>
        )}
      </User>
    );
  }
}

export default List;
export { INDIVIDUAL_LIST_QUERY };
