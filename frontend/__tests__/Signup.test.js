import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Login from '../components/Signup';

describe('<Login/>', () => {
  it('should render the login page', () => {
    const wrapper = shallow(<Login />);
    expect(toJSON(wrapper.find('h1'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('a'))).toMatchSnapshot();
  });
});
