import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Icon, Item, Input, Spinner, Label } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ImagePicker, Permissions } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';
import Error from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  heading: {
    color: '#ef8354',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  orangeButton: {
    backgroundColor: '#ef8354',
    margin: 10,
    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 20,
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
  input: {
    color: '#fff',
    fontFamily: 'Roboto',
    paddingLeft: 15,
    fontSize: 18,
  },
});

const ADD_ITEM_MUTATION = gql`
  mutation ADD_ITEM_MUTATION($name: String!, $price: Int, $image: String, $list: String!) {
    addItem(name: $name, price: $price, list: $list, image: $image) {
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
    image: null,
    imageLoading: false,
  };

  uploadFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ imageLoading: true });
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        const base64Img = `data:image/jpg;base64,${result.base64}`;
        const apiUrl = 'https://api.cloudinary.com/v1_1/dq7uyauun/image/upload';
        const data = {
          file: base64Img,
          upload_preset: 'grownphotos',
        };
        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
          .then(async r => {
            const data = await r.json();
            console.log(data.secure_url);
            await this.setState({
              image: data.secure_url,
            });
            this.setState({ imageLoading: false });
          })
          .catch(err => console.log(err));
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
    const { image, name, price, imageLoading } = this.state;
    return (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        variables={{ list: this.props.id, image, name, price }}
        refetchQueries={[{ query: INDIVIDUAL_LIST_QUERY, variables: { id: this.props.id } }]}
      >
        {(createItem, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add New Item</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                placeholder="Item Name"
                onChangeText={name => this.setState({ name })}
                value={name}
                style={styles.input}
                placeholderTextColor="gray"
                required
              />
            </Item>
            <Item>
              <Icon style={styles.input} type="Feather" name="dollar-sign" />
              <Input
                autoCapitalize="none"
                placeholder="Item Price"
                onChangeText={price => this.setState({ price })}
                value={price}
                style={styles.input}
                keyboardType="number-pad"
                placeholderTextColor="gray"
                required
              />
            </Item>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 5 }} />}
            {imageLoading && <LoadingSpinner />}
            <View style={styles.topInfo}>
              <Button style={styles.orangeButton} block onPress={this.uploadFile}>
                <Icon style={styles.orangeButtonText} type="Feather" name="image" />
              </Button>
              <Button
                block
                style={styles.orangeButton}
                diabled={imageLoading}
                onPress={async () => {
                  console.log(this.state);
                  createItem();
                  this.setState({ name: '', price: '', image: null });
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
