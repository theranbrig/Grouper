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
import SortButtons from '../components/SortButtons';

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
    borderWidth: 1,
    borderColor: '#ef8354',
  },
  clearSortButton: {
    backgroundColor: 'transparent',
    margin: 5,
    borderWidth: 1,
    borderColor: '#fefefe',
  },
});

class List extends React.PureComponent {
  state = {
    showAdd: false,
    showAddUser: false,
    listOrder: 'none',
    numberSort: true,
    orderedList: [],
  };

  showAdd = () => {
    this.setState(prevState => ({ showAdd: !prevState.showAdd }));
  };

  showAddUser = () => {
    this.setState(prevState => ({ showAddUser: !prevState.showAddUser }));
  };

  setOrderedList = items => {
    this.setState({ orderedList: items });
  };

  render() {
    const backPath = this.props.history.entries[this.props.history.entries.length - 2].pathname;
    const { listOrder, numberSort, showAdd, showAddUser, orderedList } = this.state;
    const { match, history } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={INDIVIDUAL_LIST_QUERY} variables={{ id: match.params.id }}>
            {({ data, loading, error }) => {
              if (loading)
                return (
                  <Container style={styles.container}>
                    <BackHeader backLink={() => history.push(backPath)} profileLink={() => history.push('/profile')} />
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
              const sortedListByLowestPrice = items
                .concat()
                .sort((a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
              const sortedListByHighestPrice = sortedListByLowestPrice.concat().reverse();
              const sortedListAlphabetical = items.concat().sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              });
              const sortedListReverseAlphabetical = sortedListAlphabetical.concat().reverse();
              console.log(sortedListAlphabetical);
              console.log(sortedListReverseAlphabetical);
              return (
                <Container style={styles.container}>
                  <BackHeader backLink={() => history.push('/lists')} profileLink={() => history.push('/profile')} />
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
                    {showAdd && <AddItem id={id} />}
                    {!orderedList.length
                      ? items.map(item => <ListItem key={item.id} item={item} listId={id} />)
                      : orderedList.map(item => <ListItem key={item.id} item={item} listId={id} />)}
                    <SortButtons
                      setOrderedList={this.setOrderedList}
                      sortHigh={sortedListByHighestPrice}
                      sortLow={sortedListByLowestPrice}
                      sortA={sortedListAlphabetical}
                      sortZ={sortedListReverseAlphabetical}
                      items={items}
                    />
                    <View style={styles.bottomInfo}>
                      <View style={styles.bottomArea}>
                        <Text style={styles.heading}>List Mates</Text>
                      </View>
                      <Button block style={styles.orangeButton} onPress={() => this.showAddUser()}>
                        {showAddUser ? <Icon type="Feather" name="minus" /> : <Icon type="Feather" name="plus" />}
                      </Button>
                    </View>
                    {showAddUser && <AddUser listId={id} />}
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
