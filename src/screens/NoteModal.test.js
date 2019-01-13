import React from 'react';
import { shallow } from 'enzyme';
import NoteModal from './NoteModal';
// import RNFirebase  from 'react-native-firebase';
// jest.mock('react-native-firebase');
const props = {
  
};

beforeEach(() => {
  //jest.resetAllMocks();
  // RNFirebase.reset();
});

describe.only('Notes screen', () => {
  it('should render properly', () => {
    // const ref = RNFirebase.firebase.firestore().collection('notes');
    // ref.data = [];
    // const firebase = require.requireMock('react-native-firebase').default;
    const wrapper = shallow(<NoteModal {...props} />);
    // expect(wrapper).toMatchSnapshot();
  });
});
