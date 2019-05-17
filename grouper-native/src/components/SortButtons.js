import React, { Component } from 'react';
import { View, Button, Icon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';

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
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  clearSortButton: {
    backgroundColor: 'transparent',
    margin: 5,
    borderWidth: 1,
    borderColor: '#fefefe',
  },
});

export default class SortButtons extends Component {
  state = {
    listOrder: 'none',
    numberSort: true,
  };

  setListOrder = (type, number, list) => {
    this.setState({ listOrder: type, numberSort: number });
    this.props.setOrderedList(list);
  };

  render() {
    const { listOrder, numberSort } = this.state;
    const { sortHigh, sortLow, sortA, sortZ, items } = this.props;
    console.log(this.props);
    return (
      <View style={styles.sortButtons}>
        {listOrder === 'asc' && numberSort && (
          <Button style={styles.orangeSortButton} onPress={() => this.setListOrder('none', true, items)}>
            <Icon type="FontAwesome" name="sort-numeric-asc" />
          </Button>
        )}
        {listOrder === 'desc' && numberSort && (
          <Button style={styles.orangeSortButton} onPress={() => this.setListOrder('asc', true, sortLow)}>
            <Icon type="FontAwesome" name="sort-numeric-desc" />
          </Button>
        )}
        {((listOrder === 'none' && numberSort) || !numberSort) && (
          <Button
            style={styles.clearSortButton}
            onPress={() => {
              this.setListOrder('desc', true, sortHigh);
            }}
          >
            <Icon type="FontAwesome" name="sort-numeric-asc" />
          </Button>
        )}
        {listOrder === 'asc' && !numberSort && (
          <Button style={styles.orangeSortButton} onPress={() => this.setListOrder('desc', false, sortZ)}>
            <Icon type="FontAwesome" name="sort-alpha-asc" />
          </Button>
        )}
        {listOrder === 'desc' && !numberSort && (
          <Button style={styles.orangeSortButton} onPress={() => this.setListOrder('none', false, items)}>
            <Icon type="FontAwesome" name="sort-alpha-desc" />
          </Button>
        )}
        {((this.state.listOrder === 'none' && !numberSort) || numberSort) && (
          <Button style={styles.clearSortButton} onPress={() => this.setListOrder('asc', false, sortA)}>
            <Icon type="FontAwesome" name="sort-alpha-asc" />
          </Button>
        )}
      </View>
    );
  }
}
