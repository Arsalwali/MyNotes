import React from 'react';
import { shallow } from 'enzyme';
import { NoteModal, mapStateToProps } from './NoteModal';

describe('Note Modal', () => {
  it('should render properly', () => {
    const props = {
      documentKey: null,
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('getDerivedStateFromProps should return null is document key unchanged', () => {
    const props = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    
    const state = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
    }

    expect(NoteModal.getDerivedStateFromProps(props, state)).toEqual(null);
  });

  it('getDerivedStateFromProps should return new state is document key changed', () => {
    const props = {
      documentKey: '112233',
      title: 'Second Note',
      note: 'Important Note',
      color: '#cff12b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    
    const state = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
    }

    const expectedState = {
      documentKey: '112233',
      title: 'Second Note',
      note: 'Important Note',
      color: '#cff12b',
      isAdd: false,
      saveButtonDisable: false,
    }

    expect(NoteModal.getDerivedStateFromProps(props, state)).toEqual(expectedState);
  });

  it('getDerivedStateFromProps should disable save button if title is empty', () => {
    const props = {
      documentKey: null,
      title: '',
      note: '',
      color: '',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    
    const state = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
    }

    const expectedState = {
      documentKey: null,
      title: '',
      note: '',
      color: '',
      isAdd: true,
      saveButtonDisable: true,
    }

    expect(NoteModal.getDerivedStateFromProps(props, state)).toEqual(expectedState);
  });

  it('handlePress should call addNote if Add is true', () => {
    const props = {
      documentKey: null,
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.addNote.mock.calls.length).toBe(0);
    instance.handlePress();
    expect(props.addNote.mock.calls.length).toBe(1);
    expect(props.addNote.mock.calls[0][0]).toEqual({
      key: props.documentKey,
      title: props.title,
      note: props.note,
      color: props.color,
    });
  });

  it('handlePress should call editNote if Add is false', () => {
    const props = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.editNote.mock.calls.length).toBe(0);
    instance.handlePress();
    expect(props.editNote.mock.calls.length).toBe(1);
    expect(props.editNote.mock.calls[0][0]).toEqual({
      key: props.documentKey,
      title: props.title,
      note: props.note,
      color: props.color,
    });
  });

  it('handlePress should call hideModal', () => {
    const props = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.hideModal.mock.calls.length).toBe(0);
    instance.handlePress();
    expect(props.hideModal.mock.calls.length).toBe(1);
  });

  it('onCancelPress should call hideModal', () => {
    const props = {
      documentKey: '12345',
      title: 'First Note',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.hideModal.mock.calls.length).toBe(0);
    instance.onCancelPress();
    expect(props.hideModal.mock.calls.length).toBe(1);
  });

  it('getTitleStyling should retrun error style if title is empty', () => {
    const props = {
      documentKey: '12345',
      title: '',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    instance.setState({ titleHasError: true });
    const errorStyle = instance.getTitleStyling();
    expect(errorStyle).toMatchSnapshot();
  });

  it('getTitleStyling should return simple style if title is filled', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    const style = instance.getTitleStyling();
    expect(style).toMatchSnapshot();
  });

  it('onTitleChangeTextHandler set errors if title is empty', () => {
    const props = {
      documentKey: '12345',
      title: '',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    instance.onTitleChangeTextHandler('');
    expect(wrapper.state().titleHasError).toEqual(true);
    expect(wrapper.state().saveButtonDisable).toEqual(true);
  });

  it('onTitleChangeTextHandler set errors false if title is filled', () => {
    const props = {
      documentKey: '12345',
      title: '',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    instance.onTitleChangeTextHandler('First');
    expect(wrapper.state().titleHasError).toEqual(false);
    expect(wrapper.state().saveButtonDisable).toEqual(false);
  });

  it('onNoteChangeText set errors if note is empty', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: 'Important Note',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    instance.onNoteChangeText('');
    expect(wrapper.state().noteHasError).toEqual(true);
  });

  it('onNoteChangeText set errors false if title is filled', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: '',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    instance.onNoteChangeText('First');
    expect(wrapper.state().noteHasError).toEqual(false);
  });

  it('onColorChange should call set color if fn is available', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: '',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.setColor.mock.calls.length).toBe(0);
    instance.onColorChange('#c0392b');
    expect(props.setColor.mock.calls.length).toBe(1);
    expect(props.setColor.mock.calls[0][0]).toEqual('#c0392b');
  });

  it('onColorChange should not call set color if fn is not available', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: '',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: null,
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    expect(props.setColor).toBe(null);
    instance.onColorChange('#c0392b');
    expect(props.setColor).toBe(null);
  });

  it('handleModalCloseRequest should return null', () => {
    const props = {
      documentKey: '12345',
      title: 'First',
      note: '',
      color: '#c0392b',
      isVisible: true,
      hideModal: jest.fn(),
      setColor: null,
      addNote: jest.fn(),
      editNote: jest.fn(),
    };
    const wrapper = shallow(<NoteModal {...props} />);
    const instance = wrapper.instance();
    const handle = instance.handleModalCloseRequest();
    expect(handle).toBe(null);
  });

  it('mapStateToProps', () => {
    const state = {
      modal: {
        key: '123',
        title: 'my note',
        note: 'long note',
        color: '#454545',
        isVisible: true,
      },
    };

    const props = mapStateToProps(state);
    expect(props).toEqual({
      documentKey: '123',
      title: 'my note',
      note: 'long note',
      color: '#454545',
      isVisible: true,
    });
  });
});
