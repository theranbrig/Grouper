import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon, SwipeRow } from 'native-base';
import DeleteItemButton from './DeleteItemButton';
import EditListItem from './EditItem';
import ToggleInCartButton from './ToggleInCart';

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
    borderBottomWidth: 0.25,
  },
  listItemInCart: {
    backgroundColor: '#ef8354',
    overflow: 'hidden',
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 0.25,
  },
  listIcon: {
    color: '#fefefe',
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
    const { item, listId } = this.props;
    return (
      <TouchableOpacity style={mainStyles.listItem}>
        <SwipeRow
          style={item.inCart ? mainStyles.listItemInCart : mainStyles.listItem}
          rightOpenValue={-75}
          leftOpenValue={75}
          left={<ToggleInCartButton itemId={item.id} listId={listId} />}
          body={
            <View style={mainStyles.individualList}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={mainStyles.individualListText}>
                  {item.name} - ${item.price}{' '}
                  {item.inCart && <Icon style={mainStyles.listIcon} type="Feather" name="check" />}
                </Text>
                <Icon style={mainStyles.listIcon} type="Feather" name="info" onPress={() => this.showEdit()} />
              </View>
            </View>
          }
          right={<DeleteItemButton id={item.id} listId={listId} />}
        />
        {this.state.showEdit && <EditListItem id={item.id} />}
      </TouchableOpacity>
    );
  }
}

export default ListItem;
