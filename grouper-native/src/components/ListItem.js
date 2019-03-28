import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, Icon, SwipeRow } from 'native-base';
import DeleteItemButton from './DeleteItemButton';
import EditList from './EditList';

export const mainStyles = StyleSheet.create({
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
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

class ListItem extends React.Component {
  state = {
    showEdit: false,
  };

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity style={mainStyles.listItem}>
        <SwipeRow
          style={mainStyles.listItem}
          rightOpenValue={-75}
          leftOpenValue={75}
          left={
            <Button style={{ backgroundColor: '#ef8354', color: '#2d3142' }} onPress={() => this.showEdit()}>
              {this.state.showEdit ? (
                <Icon active name="arrow-dropup-circle" />
              ) : (
                <Icon active name="ios-checkbox-outline" />
              )}
            </Button>
          }
          body={
            <View style={mainStyles.individualList}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={mainStyles.individualListText}>
                  {this.props.item.name} - ${this.props.item.price}
                </Text>
                <Icon style={mainStyles.listIcon} active name="ios-information-circle-outline" />
              </View>
            </View>
          }
          right={<DeleteItemButton id={this.props.item.id} listId={this.props.listId} />}
        />
        {this.state.showEdit && <EditList />}
      </TouchableOpacity>
    );
  }
}

export default ListItem;
