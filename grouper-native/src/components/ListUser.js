import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';
import DeleteItemButton from './DeleteItemButton';
import EditListItem from './EditItem';

export const mainStyles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
    padding: 12,
    textAlign: 'center',
  },
  individualListText: {
    color: '#fefefe',
    fontFamily: 'Roboto',
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 20,
    width: '95%',
  },
  listItem: {
    backgroundColor: '#4f5d75',
    overflow: 'hidden',
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 0.2,
  },
  listIcon: {
    color: '#ef8354',
    fontSize: 25,
  },
});

class ListUser extends React.Component {
  state = {
    showEdit: false,
  };

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  render() {
    const { username, email, id } = this.props.user;
    return (
      <TouchableOpacity style={mainStyles.listItem}>
        <SwipeRow
          style={mainStyles.listItem}
          rightOpenValue={-75}
          body={
            <View style={mainStyles.individualList}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={mainStyles.individualListText}>{username}</Text>
                <Icon style={mainStyles.listIcon} active name="ios-contact" onPress={() => this.showEdit()} />
              </View>
            </View>
          }
          right={<DeleteItemButton id={id} listId={id} />}
        />
        {this.state.showEdit && (
          <Text>
            <Icon style={mainStyles.listIcon} active name="ios-contact" /> {username}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

export default ListUser;
