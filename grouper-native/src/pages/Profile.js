import React, { PureComponent } from 'react';
import { Text, View, Button, Spinner, List, SwipeRow, Icon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import BackHeader from '../components/BackHeader';
import User from '../components/User';
import { LISTS_QUERY } from './Lists';
import { mainStyles } from '../components/ListUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4f5d75',
    flex: 1,
  },
  row: {
    backgroundColor: '#4f5d75',
    flex: 1,
  },
  rowText: {
    color: '#fefefe',
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  paragraph: {
    color: '#fefefe',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  heading: {
    color: '#ef8354',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    width: '60%',
    marginLeft: '20%',
    marginBottom: 40,
    marginTop: 40,
  },
  orangeButtonText: {
    color: '#fefefe',
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  removeFriendButton: {
    backgroundColor: '#ef8354',
    color: '#fefefe',
    fontFamily: 'Lobster',
  },
});

class Profile extends PureComponent {
  state = {
    isCompleted: true,
  };

  render() {
    const backPath = this.props.history.entries[this.props.history.entries.length - 2].pathname;
    return (
      <User>
        {({ data: { me } }) => (
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
              return (
                <>
                  {loading || !this.state.isCompleted ? (
                    <Spinner color="#ef8345" />
                  ) : (
                    <View style={styles.container}>
                      <ScrollView>
                        <BackHeader
                          backLink={() => this.props.history.push(backPath)}
                          profileLink={() => this.props.history.push('/profile')}
                        />
                        <View style={styles.container}>
                          <Text style={styles.heading}>{me.username}'s Profile</Text>
                          <Text style={styles.paragraph}>{me.username}</Text>
                          <Text style={styles.paragraph}>{me.email}</Text>
                          <Text style={styles.heading}>My Grouper Friends</Text>
                          <List>
                            {me.friends.map(friend => (
                              <SwipeRow
                                style={styles.row}
                                rightOpenValue={-75}
                                body={
                                  <View>
                                    <Text style={styles.rowText}>
                                      <Icon style={styles.rowText} type="Feather" name="user" /> {friend.username}
                                    </Text>
                                  </View>
                                }
                                right={
                                  <Button style={styles.removeFriendButton} danger onPress={() => alert('Trash')}>
                                    <Icon type="Feather" name="user-minus" />
                                  </Button>
                                }
                              />
                            ))}
                          </List>
                        </View>
                        <Button style={styles.orangeButton} block onPress={() => this.history.push('/logout')}>
                          <Text style={styles.orangeButtonText}>Logout</Text>
                        </Button>
                      </ScrollView>
                    </View>
                  )}
                </>
              );
            }}
          </Query>
        )}
      </User>
    );
  }
}

export default Profile;
