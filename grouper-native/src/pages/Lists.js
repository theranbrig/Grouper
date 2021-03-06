import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { Container, View, Text, List, Spinner, Button, Icon, Content } from 'native-base';
import User from '../components/User';
import BackHeader from '../components/BackHeader';
import IndividualList from '../components/IndividualList';
import AddList from '../components/AddList';

const LISTS_QUERY = gql`
  query LISTS_QUERY {
    lists {
      id
      name
      type
      users {
        id
        username
      }
      items {
        id
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
    backgroundColor: '#4f5d75',
    flex: 1,
  },
  paragraph: {
    color: '#fefefe',
    textAlign: 'center',
    margin: 15,
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  bottom: {
    color: 'blue',
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    marginTop: 14,
    marginRight: 14,
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    color: '#fefefe',
    fontSize: 14,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.25,
    borderBottomColor: '#fefefe',
  },
});

class Lists extends React.PureComponent {
  state = { isCompleted: false, showEdit: false, showAdd: false };

  componentDidMount() {
    this.setState({ isCompleted: true });
  }

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  showAdd = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  render() {
    const { isCompleted, showEdit, showAdd } = this.state;
    const { history } = this.props;
    const backPath = this.props.history.entries[this.props.history.entries.length - 2].pathname;
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Container style={{ backgroundColor: '#4f5d75' }}>
              <BackHeader
                backLink={() => history.push(backPath)}
                profileLink={() => this.props.history.push('/profile')}
                receiverId={me.id}
              />
              <StatusBar barStyle="light-content" />
              <Query
                asyncMode
                query={LISTS_QUERY}
                pollInterval={10000}
                onCompleted={() => this.setState({ isCompleted: false })}
              >
                {(data, loading, error) => {
                  let userLists;
                  if (data.data.lists) {
                    userLists = data.data.lists.filter(list => list.users.some(user => user.id === me.id));
                  }
                  if (isCompleted || loading) return <Spinner color="#ef8354" />;
                  return (
                    <ScrollView>
                      {me ? (
                        <View style={styles.container}>
                          {userLists ? (
                            <View>
                              <View style={styles.topInfo}>
                                <Text style={styles.paragraph}>
                                  {me.username}
                                  {me.username.charAt(me.username.length - 1) === 's' ? "'" : "'s"} Lists
                                </Text>
                                <Button block small style={styles.orangeButton} onPress={() => this.showAdd()}>
                                  {showAdd ? (
                                    <Icon style={styles.orangeButtonText} type="Feather" name="minus" />
                                  ) : (
                                    <Icon style={styles.orangeButtonText} type="Feather" name="plus" />
                                  )}
                                </Button>
                              </View>
                              {showAdd && (
                                <View style={styles.bottom}>
                                  <AddList showAdd={this.showAdd} />
                                </View>
                              )}
                              <View
                                refreshControl={
                                  <RefreshControl refreshing={data.networkStatus === 4} onRefresh={data.refetch} />
                                }
                              >
                                <List
                                  style={{ borderTopWidth: 0.2, borderColor: 'white', paddingBottom: 40 }}
                                  dataArray={userLists}
                                  renderRow={list => (
                                    <IndividualList
                                      key={list.id}
                                      list={list}
                                      viewListClick={() => history.push(`/list/${list.id}`)}
                                      showEdit={this.showEdit}
                                    />
                                  )}
                                />
                              </View>
                              {userLists.length === 0 && (
                                <Text style={styles.paragraph}>You have no Lists. Start adding.</Text>
                              )}
                            </View>
                          ) : (
                            <Text>No lists found.</Text>
                          )}
                        </View>
                      ) : (
                        <Spinner color="#ef8354" />
                      )}
                    </ScrollView>
                  );
                }}
              </Query>
            </Container>
          </>
        )}
      </User>
    );
  }
}

export default Lists;
export { LISTS_QUERY };
