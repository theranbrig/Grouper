import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

function createClient({ headers }) {
	// Set up apollo clietn
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
		request: operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		},
		// Local Data
		clientState: {
			resolvers: {}
		}
	});
}

export default withApollo(createClient);
