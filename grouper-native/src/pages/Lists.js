import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, View, Text, List, ListItem, Spinner, Button, Icon } from 'native-base';
import User from '../components/User';
import BackHeader from '../components/BackHeader';
import IndividualList from '../components/IndividualList';
import AddList from '../components/AddList';
import EditList from '../components/EditList';

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
    marginTop: 10,
    marginRight: 14,
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
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Container style={{ backgroundColor: '#4f5d75' }}>
              <BackHeader backLink={() => history.push('/')} />

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
                      <View style={styles.container}>
                        {userLists ? (
                          <>
                            <View style={styles.topInfo}>
                              <Text style={styles.paragraph}>
                                {me.username}
                                {me.username.charAt(me.username.length - 1) === 's' ? "'" : "'s"} Lists
                              </Text>
                              <Button rounded style={styles.orangeButton} onPress={() => this.showAdd()}>
                                {showAdd ? <Icon name="md-remove" /> : <Icon name="md-add" />}
                              </Button>
                            </View>
                            {showAdd && (
                              <View style={styles.bottom}>
                                <AddList />
                              </View>
                            )}
                            <List style={{ borderTopWidth: 0.2, borderColor: 'white', paddingBottom: 40 }}>
                              {userLists.map(list => (
                                <IndividualList
                                  key={list.id}
                                  list={list}
                                  viewListClick={() => history.push(`/list/${list.id}`)}
                                  showEdit={this.showEdit}
                                />
                              ))}
                            </List>
                          </>
                        ) : (
                          <Text>Sorry. No Lists Found. Add More Below.</Text>
                        )}
                      </View>
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

// <Query query={LISTS_QUERY} pollInterval={10000}>
//   {({ data, loading, error }) => {
//     const userLists = data.lists.filter(list => list.users.some(user => user.id === me.id));
//     return (
//       <Container>
//         <View>
//           <Text>{me.username} Lists</Text>
//           {!userLists.length ? (
//             <Text>No Lists Yet. Add one today.</Text>
//           ) : (
//             <List inverted relaxed>
//               {userLists.map(list => (
//                 <ListItem>
//                   <Text>{list.name}</Text>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </View>
//       </Container>
//     );
//   }}
// </Query>
