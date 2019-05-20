import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { LISTS_QUERY } from '../pages/Lists';
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
    marginLeft: '35%',
    margin: 10,
    width: '30%',
    backgroundColor: '#ef8354',
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
});

const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION($name: String!, $type: String!) {
    createList(name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

class AddList extends React.Component {
  state = {
    name: '',
    type: 'General',
  };

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_LIST_MUTATION} variables={this.state} refetchQueries={[{ query: LISTS_QUERY }]}>
        {(createList, { loading, error }) => (
          <View style={styles.container}>
            <Text style={styles.heading}>Add New List</Text>
            {error && <Error error={error} />}
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="List Name"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                placeholderTextColor="gray"
              />
            </Item>
            <Item picker>
              <Picker
                renderHeader={backAction => (
                  <Header style={{ backgroundColor: '#ef8354' }}>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon type="Feather" name="arrow-left" style={{ color: '#fff' }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: '#fff', fontFamily: 'Roboto' }}>Select List Type</Title>
                    </Body>
                    <Right />
                  </Header>
                )}
                note
                mode="dropdown"
                iosIcon={<Icon type="Feather" name="chevrons-down" style={{ color: '#ef8354' }} />}
                style={{ width: undefined }}
                selectedValue={this.state.type}
                textStyle={{ color: 'white', fontSize: 18 }}
                placeholderIconColor="#ef8354"
                itemStyle={{
                  marginLeft: 0,
                  paddingLeft: 20,
                  borderBottomWidth: 0,
                }}
                itemTextStyle={{
                  color: '#4f5d75',
                  fontFamily: 'Roboto',
                }}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="General" value="General" />
                <Picker.Item label="Gift" value="Gift" />
                <Picker.Item label="Grocery" value="Grocery" />
                <Picker.Item label="Market" value="Market" />
                <Picker.Item label="Party" value="Party" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </Item>
            <Button
              block
              style={styles.orangeButton}
              onPress={async () => {
                await createList();
                this.setState({ name: '', type: 'General' });
                this.props.showAdd();
              }}
            >
              <Text style={styles.orangeButtonText}>Add{loading && 'ing'}</Text>
            </Button>
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddList;
