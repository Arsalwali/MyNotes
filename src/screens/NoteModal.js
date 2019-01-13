import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux'; 
import { hideModal, setColor } from './actionCreators';
import firebase from 'react-native-firebase';
import { ColorPicker } from '../components';
import { colors, metrics } from '../theme';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 20,
    elevation: 6,
    width: '100%',
  },
  content: {
    flexGrow: 0,
    marginTop: 5,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    fontSize: metrics.bodyText,
    color: colors.darkText,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  textInputMultiline: {
    color: colors.darkText,
    fontSize: metrics.bodyText,
  },
});

class NoteModal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.documentKey !== state.documentKey) {
      return {
        documentKey: props.documentKey,
        title: props.title,
        note: props.note,
        color: props.color,
        isAdd: !props.documentKey ? true : false,
        saveButtonDisable: !props.title ? true: false,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('notes');
    this.state = {
      documentKey: '',
      title: '',
      note: '',
      color: '',
      isAdd: true, 
      titleHasError: false,
      noteHasError: false,
      saveButtonDisable: true,
    };
  }

  handleModalCloseRequest = () => null;

  handlePress = () => {
    if(this.state.isAdd) {
      this.ref.add({
        title: this.state.title,
        note: this.state.note,
        color: this.props.color,
      }).then(() => console.log('add success'))
      .catch((error) => console.log('add error', error));
      this.setState({ title: '', note: '' });
    } else {
      this.ref.doc(this.state.documentKey).update({
        title: this.state.title,
        note: this.state.note,
        color: this.props.color,
      }).then(() => console.log('edit success'))
      .catch((error) => console.log('edit error', error));
    }
    this.props.hideModal();
  }

  onCancelPress = () => {
    this.setState({ documentKey: '', titleHasError: false, noteHasError: false, saveButtonDisable: true });
    this.props.hideModal();
  }

  getTitleStyling = () => {
    if (!this.state.titleHasError) {
      return styles.textInput;
    }

    return [styles.textInput, { borderColor: colors.error }];
  };

  onTitleChangeTextHandler = (value) => {
    if (value.length === 0) {
      this.setState({
        title: value,
        titleHasError: true,
        saveButtonDisable: true,
      });
      return;
    }

    this.setState({
      title: value,
      titleHasError: false,
      saveButtonDisable: false,
    });
  }

  onNoteChangeText = (value) => {
    if (value.length === 0) {
      this.setState({
        note: value,
        noteHasError: true,
      });
      return;
    }

    this.setState({
      note: value,
      noteHasError: false,
    });
  }

  onColorChange = (color) => {
    if (this.props.setColor) {
      this.props.setColor(color);
    }
  }

  renderContentSection = () => (
    <ScrollView style={styles.content}>
      <ColorPicker color={this.props.color} setColor={this.props.setColor} onColorChange={this.onColorChange} />
      <TextInput
        style={this.getTitleStyling()}
        placeholder="Title"
        value={this.state.title}
        onChangeText={this.onTitleChangeTextHandler}
      />
      <TextInput
        style={styles.textInputMultiline}
        placeholder="Note"
        defaultValue={this.state.note}
        onChangeText={this.onNoteChangeText}
        underlineColorAndroid="transparent"
        multiline
      />
    </ScrollView>
  );

  renderButtonSection = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button title='Cancel' onPress={this.onCancelPress} />
      <Button disabled={this.state.saveButtonDisable} title='Save' onPress={this.handlePress} />
    </View>
  );

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        animationType="none"
        transparent
        onRequestClose={this.handleModalCloseRequest}
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {this.renderContentSection()}
            {this.renderButtonSection()}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { key, title, note, color, isVisible } = state.modal;
  return { documentKey: key, title, note, color, isVisible };
};

const mapDispatchToProps = { hideModal, setColor };

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);
