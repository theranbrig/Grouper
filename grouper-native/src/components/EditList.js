/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Item, Picker, Header, Left, Right, Body, Title, Input, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { LISTS_QUERY } from '../pages/Lists';
import Error from './ErrorMessage';
import { INDIVIDUAL_LIST_QUERY } from '../pages/List';

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
    fontFamily: 'Roboto',
  },
  orangeButtonText: {
    fontFamily: 'Lobster',
    fontSize: 25,
  },
  picker: {
    color: 'white',
  },
});

const EDIT_LIST_MUTATION = gql`
  mutation EDIT_LIST_MUTATION($id: ID!, $name: String, $type: String) {
    editList(id: $id, name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

class EditList extends React.PureComponent {
  state = { isCompleted: false, submitting: false };

  componentDidMount() {
    this.setState({ isCompleted: true });
  }

  onValueChange(value) {
    this.setState({
      type: value,
    });
  }

  updateList = async updateListMutation => {
    this.setState({ submitting: true });
    const res = await updateListMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    this.setState({ submitting: false });
  };

  render() {
    const { isCompleted } = this.state;
    return (
      <Query
        query={INDIVIDUAL_LIST_QUERY}
        variables={{ id: this.props.id }}
        onCompleted={() => this.setState({ isCompleted: false })}
      >
        {({ data }) => (
          <>
            {isCompleted ? (
              <Spinner color="#ef8354" />
            ) : data.list ? (
              <Mutation
                mutation={EDIT_LIST_MUTATION}
                variables={{ id: this.props.id, ...this.state }}
                refetchQueries={[{ query: LISTS_QUERY }, { query: INDIVIDUAL_LIST_QUERY }]}
              >
                {(editList, { loading, error }) => (
                  <View style={styles.container}>
                    <Text style={styles.heading}>Edit {data.list.name}</Text>
                    {error && <Error error={error} />}
                    <Item>
                      <Input
                        autoCapitalize="none"
                        placeholder="List Name"
                        onChangeText={name => this.setState({ name })}
                        style={{ color: '#fff', fontFamily: 'Roboto', paddingLeft: 15, fontSize: 18 }}
                        placeholderTextColor="gray"
                        defaultValue={data.list.name}
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
                        selectedValue={this.state.type || data.list.type}
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
                        await this.updateList(editList);
                      }}
                    >
                      {this.state.submitting ? (
                        <Spinner color="white" />
                      ) : (
                        <Text style={styles.orangeButtonText}>Update</Text>
                      )}
                    </Button>
                  </View>
                )}
              </Mutation>
            ) : (
              <Text>Nothing Found</Text>
            )}
          </>
        )}
      </Query>
    );
  }
}

export default EditList;
