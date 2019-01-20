import React from 'react';
import { shallow } from 'enzyme';
import {Notes} from './Notes';
import firebase from 'react-native-firebase';

const notesArray = [
  {
    key: '123',
    title: 'First',
    note: "Note",
    color: '#606060',  
  },
  {
    key: '1234',
    title: 'Seccond',
    note: "Note",
    color: '#60F060',  
  }
];

const props = {
  showModal: jest.fn(),
  deleteNote: jest.fn(),
};


beforeEach(() => {
 
  // const firestore = firebase.firestore = jest.fn();
});

describe('Notes screen', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with notes', () => {
    const wrapper = shallow(<Notes {...props} />);
    wrapper.setState({ notes: notesArray })
    expect(wrapper).toMatchSnapshot();
  });

  it('renderItem() should render one item properly', () => {
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    const data ={
      item: {
        key: '123',
        title: 'First',
        note: 'Note',
        color: '#454545',
      }
    }
    const item = instance.renderItem(data);
    expect(item).toMatchSnapshot();
  });

  it('keyExtractor() should render key properly', () => {
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    const data ={
      item: {
        key: '123',
        title: 'First',
        note: 'Note',
        color: '#454545',
      }
    }
    const key = instance.keyExtractor(data.item);
    expect(key).toEqual('123');
  });

  it('onAddPress() should show modal with empty text', () => {
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    expect(props.showModal.mock.calls.length).toBe(0);
    const key = instance.onAddPress();
    expect(props.showModal.mock.calls.length).toBe(1);
    expect(props.showModal.mock.calls[0][0]).toEqual(null);
    expect(props.showModal.mock.calls[0][1]).toEqual('');
    expect(props.showModal.mock.calls[0][2]).toEqual('');
  });

  it('onEditPress() should show modal with filled text', () => {
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    expect(props.showModal.mock.calls.length).toBe(1);
    const key = instance.onEditPress('123', 'Imp', 'long note', '#654542')();
    expect(props.showModal.mock.calls.length).toBe(2);
    expect(props.showModal.mock.calls[1][0]).toEqual('123');
    expect(props.showModal.mock.calls[1][1]).toEqual('Imp');
    expect(props.showModal.mock.calls[1][2]).toEqual('long note');
    expect(props.showModal.mock.calls[1][3]).toEqual('#654542');
    
  });

  it('onDeletePress() should call delete note', () => {
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    expect(props.deleteNote.mock.calls.length).toBe(0);
    const key = instance.onDeletePress('123')();
    expect(props.deleteNote.mock.calls.length).toBe(1);
    expect(props.deleteNote.mock.calls[0][0]).toEqual({ key: '123' });
  });

  it('onCollectionUpdate() should set notes', () => {
    const note = {
      key: '123', title: '1234', note: '1234455', color: '#232DD9',
    }
    const firebaseData = {
      querySnapshot: [
        {
            data: jest.fn(() => note),
            id: '123',
        }
      ],
    };
    const wrapper = shallow(<Notes {...props} />);
    const instance = wrapper.instance();
    instance.onCollectionUpdate (firebaseData.querySnapshot);
    expect(wrapper.state().notes).toEqual([note]);
  });
});
