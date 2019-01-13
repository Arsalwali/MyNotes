import React from 'react';
import { shallow } from 'enzyme';
import NoteCard from './NoteCard';


describe('NoteCard component', () => {
  it('should render properly', () => {
    const props = {
      data: {
        title: 'Note Title',
        note: 'This is my first note',
        color: '#5d7a90',
      },
      onEditPress: jest.fn(),
      onDeletePress: jest.fn(),
    };
    
    const wrapper = shallow(<NoteCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with defualt color if color not found', () => {
    const props = {
      data: {
        title: 'Note Title',
        note: 'This is my first note',
        color: '#ffffff',
      },
      onEditPress: jest.fn(),
      onDeletePress: jest.fn(),
    };

    const wrapper = shallow(<NoteCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
