import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('Header component', () => {
  it('should render properly without right icon', () => {
    const props = {
      title: 'My Notes',
    };
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with right icon', () => {
    const props = {
      title: 'My Notes',
      rightIcon: 'add',
    };
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
