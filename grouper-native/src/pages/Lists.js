import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, View, Text, List, ListItem, Spinner } from 'native-base';
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
    paddingTop: 40,
    paddingBottom: 40,
  },
});

class Lists extends React.PureComponent {
  state = { isCompleted: false };

  componentDidMount() {
    this.setState({ isCompleted: true });
  }

  render() {
    const { isCompleted } = this.state;
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
                            <Text style={styles.paragraph}>
                              {me.username}
                              {me.username.charAt(me.username.length - 1) === 's' ? "'" : "'s"} Lists
                            </Text>
                            <List style={{ borderTopWidth: 0.2, borderColor: 'white' }}>
                              {userLists.map(list => (
                                <IndividualList key={list.id} list={list} viewListClick={() => history.push('/')} />
                              ))}
                            </List>
                          </>
                        ) : (
                          <Text>Sorry. No Lists Found. Add More Below.</Text>
                        )}
                      </View>
                      <View style={styles.bottom}>
                        <AddList />
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
