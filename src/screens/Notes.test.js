import React from 'react';
import { shallow } from 'enzyme';
import Notes from './Notes';
import firebase from 'react-native-firebase';

// jest.mock('react-native-firebase');
const props = {
  
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Notes screen', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
