import React, { PureComponent } from 'react';
import { Text, View, Button, List, SwipeRow, Icon } from 'native-base';
import { StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { Query } from 'react-apollo';
import BackHeader from '../components/BackHeader';
import User from '../components/User';
import { LISTS_QUERY } from './Lists';
import { mainStyles } from '../components/ListUser';
import AddFriend from '../components/AddFriend';
import LoadingSpinner from '../components/LoadingSpinner';
import RemoveFriendButton from '../components/RemoveFriendButton';
import PendingFriendRequests from '../components/PendingFriendRequests';

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
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeAddButton: {
    backgroundColor: '#ef8354',
    fontFamily: 'Roboto',
    width: '60%',
    marginLeft: '20%',
    marginBottom: 10,
    marginTop: 10,
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    color: '#fefefe',
    fontFamily: 'Lobster',
    fontSize: 20,
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
    showAddFriend: false,
  };

  toggleShowAddFriend = () => {
    this.setState(prevState => ({ showAddFriend: !prevState.showAddFriend }));
  };

  render() {
    const backPath = this.props.history.entries[this.props.history.entries.length - 2].pathname;
    return (
      <User>
        {({ data: { me } }) => {
          console.log(me);
          return (
            <Query
              asyncMode
              query={LISTS_QUERY}
              pollInterval={10000}
              onCompleted={() => this.setState({ onCompleted: true })}
            >
              {(data, loading, error) => {
                let userLists;
                if (data.data.lists) {
                  userLists = data.data.lists.filter(list => list.users.some(user => user.id === me.id));
                }
                return (
                  <>
                    {loading || !this.state.isCompleted ? (
                      <LoadingSpinner />
                    ) : (
                      <View style={styles.container}>
                        <BackHeader
                          backLink={() => this.props.history.push(backPath)}
                          profileLink={() => console.log('on the profile page already')}
                          receiverId={me.id}
                        />
                        <ScrollView
                          refreshControl={
                            // This enables the pull-to-refresh functionality
                            <RefreshControl refreshing={data.networkStatus === 4} onRefresh={data.refetch} />
                          }
                        >
                          <StatusBar barStyle="light-content" />
                          <View style={styles.container}>
                            <Text style={styles.heading}>{me.username}'s Profile</Text>
                            <Text style={styles.paragraph}>{me.username}</Text>
                            <Text style={styles.paragraph}>{me.email}</Text>
                            <View>
                              <Text style={styles.heading}>My Grouper Friends</Text>
                              <Button style={styles.orangeAddButton} block onPress={() => this.toggleShowAddFriend()}>
                                <Icon
                                  style={styles.orangeButtonText}
                                  type="Feather"
                                  name={!this.state.showAddFriend ? 'user-plus' : 'minus-square'}
                                />
                              </Button>
                            </View>
                            {this.state.showAddFriend && <AddFriend userId={me.id} />}
                            <List>
                              {me.friends.map(friend => (
                                <SwipeRow
                                  key={friend.id}
                                  style={styles.row}
                                  rightOpenValue={-75}
                                  body={
                                    <View>
                                      <Text style={styles.rowText}>
                                        <Icon style={styles.rowText} type="Feather" name="user" /> {friend.username}
                                      </Text>
                                    </View>
                                  }
                                  right={<RemoveFriendButton username={me.username} friendName={friend.username} />}
                                />
                              ))}
                            </List>
                            {me.friendRequests.length ? (
                              <>
                                <Text style={styles.heading}>Pending Friend Requests</Text>
                                <List>
                                  {me.friendRequests.map(request => (
                                    <PendingFriendRequests
                                      key={request.id}
                                      id={request.id}
                                      username={request.requestUsername}
                                      senderId={request.senderId}
                                      receiverId={request.receiverId}
                                    />
                                  ))}
                                </List>
                              </>
                            ) : (
                              <></>
                            )}
                          </View>
                          <Button style={styles.orangeButton} block onPress={() => this.props.history.push('/logout')}>
                            <Text style={styles.orangeButtonText}>Logout</Text>
                          </Button>
                        </ScrollView>
                      </View>
                    )}
                  </>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}

export default Profile;
