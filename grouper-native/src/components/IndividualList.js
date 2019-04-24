import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';
import DeleteListButton from './DeleteListButton';
import EditList from './EditList';

export const mainStyles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  individualListText: {
    color: '#fefefe',
    fontFamily: 'Roboto',
    paddingLeft: 20,
    fontSize: 20,
  },
  listItem: {
    backgroundColor: '#4f5d75',
    overflow: 'hidden',
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 0.25,
  },
  listIcon: {
    color: '#ef8354',
    fontSize: 25,
  },
});

class IndividualList extends React.Component {
  state = {
    showEdit: false,
  };

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  render() {
    const { items, name, type, users, id } = this.props.list;
    return (
      <TouchableOpacity style={mainStyles.listItem}>
        <SwipeRow
          style={mainStyles.listItem}
          rightOpenValue={-75}
          leftOpenValue={75}
          left={
            <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => this.showEdit()}>
              {this.state.showEdit ? <Icon active name="arrow-dropup-circle" /> : <Icon active name="ios-create" />}
            </Button>
          }
          body={
            <TouchableOpacity
              style={mainStyles.individualList}
              key={this.props.list.listId}
              onPress={this.props.viewListClick}
            >
              <Text style={mainStyles.individualListText}>
                {name} - {type}
              </Text>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={mainStyles.individualListText}>
                  {items.length} <Icon style={mainStyles.listIcon} active name="ios-cart" />
                </Text>
                <Text style={mainStyles.individualListText}>
                  {users.length} <Icon style={mainStyles.listIcon} active name="ios-person" />
                </Text>
              </View>
            </TouchableOpacity>
          }
          right={<DeleteListButton id={id} />}
        />
        {this.state.showEdit && <EditList id={id} />}
      </TouchableOpacity>
    );
  }
}

export default IndividualList;
