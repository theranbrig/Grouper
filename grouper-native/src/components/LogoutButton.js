import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Text } from 'native-base';
import { CURRENT_USER_QUERY } from './User';

const LOGOUT_USER_MUTATION = gql`
  mutation LOGOUT_USER_MUTATION {
    signout {
      message
    }
  }
`;

// const LogoutButton = props => (
//   <Mutation mutation={LOGOUT_USER_MUTATION}>
//     {(signout, { loading, error }) => (
//       <Button
//         onPress={async () => {
//           await signout();
//         }}
//       >
//         <Text>Logout</Text>
//       </Button>
//     )}
//   </Mutation>
// );

const LogoutButton = () => (
  <Mutation mutation={LOGOUT_USER_MUTATION}>
    {(signout, { loading, error }) => (
      <Button
        onPress={async () => {
          await signout();
        }}
      >
        <Text>Logout</Text>
      </Button>
    )}
  </Mutation>
);

export default LogoutButton;
