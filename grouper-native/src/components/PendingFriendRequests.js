import React from 'react';
import { Query } from 'react-apollo';
import { Text } from 'native-base';

const PendingRequests = () => {
  <Query >{({ data }) => <Text>Hi</Text>}</Query>;
};

export default PendingRequests;
