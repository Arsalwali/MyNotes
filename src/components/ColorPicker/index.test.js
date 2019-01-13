import React from 'react';
import { shallow } from 'enzyme';
import ControlledColorPicker from './';

describe('Color picker component', () => {
  it('should render properly', () => {
    const props = {
      color: '#ffffff',
      setColor: jest.fn(),
      onChangeColor: jest.fn(),
    };
    const wrapper = shallow(<ControlledColorPicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with no color props', () => {
    const props = {
      color: null,
      setColor: jest.fn(),
      onChangeColor: jest.fn(),
    };
    const wrapper = shallow(<ControlledColorPicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set color if not passed in props', () => {
    const props = {
      color: null,
      setColor: jest.fn(),
      onChangeColor: jest.fn(),
    };
    const wrapper = shallow(<ControlledColorPicker {...props} />);
    expect(props.setColor.mock.calls.length).toBe(1);
  });

});
