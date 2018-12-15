import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import LoginCheck from '../components/LoginCheck';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

describe('<LoginCheck/>', () => {
  it('should render the login page with no user', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <LoginCheck />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('h1').text()).toContain('Sign In to Grouper');
    const Login = wrapper.find('Login');
    expect(Login.exists()).toBe(true);
  });
});

describe('<LoginCheck/>', () => {
  // Child component to check Logged in wordks
  const Child = () => <p>I am a Child Component</p>;

  it('should render the child when logged in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <LoginCheck>
          <Child />
        </LoginCheck>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.contains(<Child />)).toBe(true);
  });
});
