import React from 'react';
import gql from 'graphql-tag';
import { View, Text } from 'native-base';

const INDIVIDUAL_LIST_QUERY = gql`
  query INDIVIDUAL_LIST_QUERY($id: ID!) {
    list(where: { id: $id }) {
      id
      name
      type
      users {
        id
        username
        email
      }
      items {
        id
        name
        price
        inCart
      }
    }
  }
`;

const List = () => (
  <View>
    <Text>List Page</Text>
  </View>
);

export default List;
export { INDIVIDUAL_LIST_QUERY };
