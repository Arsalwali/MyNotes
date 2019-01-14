import React from 'react';
import { shallow } from 'enzyme';
import {Notes} from './Notes';
import firebase from 'react-native-firebase';

jest.mock('react-native-firebase', () => ({
  analytics: jest.fn(),
  firestore: jest.fn(),
}));
const props = {
  
};


beforeEach(() => {
  jest.resetAllMocks();
  // const firestore = firebase.firestore = jest.fn();
});

describe('Notes screen', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
