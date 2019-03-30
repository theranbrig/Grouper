import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Icon, Item, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ImagePicker, Permissions } from 'expo';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import Error from './ErrorMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    margin: 10,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  transparentButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  picker: {
    color: 'white',
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION($name: String!, $price: Int, $list: String!) {
    addItem(name: $name, price: $price, list: $list) {
      id
      name
      price
    }
  }
`;

class AddItem extends React.Component {
  state = {
    name: '',
    price: 0,
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  };

  handleTextChange = (key, value) => {
    this.setState(state => ({
      ...state,
      [key]: value,
    }));
  };

  render() {
    const { image, name, price } = this.state;
    return (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        variables={{ list: this.props.id, ...this.state }}
        refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}
      >
        {(createItem, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add New Item</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Item Name"
                onChangeText={name => this.setState({ name })}
                value={name}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Item Price"
                onChangeText={price => this.setState({ price })}
                value={price}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View style={styles.topInfo}>
              <Button style={styles.orangeButton} rounded onPress={this.pickImage}>
                <Icon style={styles.orangeButtonText} name="ios-images" />
              </Button>
              <Button
                block
                style={styles.orangeButton}
                onPress={() => {
                  createItem();
                }}
              >
                <Text style={styles.orangeButtonText}>Add{loading && 'ing'}</Text>
              </Button>
            </View>
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddItem;
