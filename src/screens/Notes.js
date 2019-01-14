import React from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import NoteModal from './NoteModal';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { showModal } from './actionCreators';
import { deleteNote } from '../core/actionCreators/firebase';
import NoteCard from './NoteCard';
import { Header } from '../components';
import { colors, iconNames } from '../theme';

export class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('notes');
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  state = {
    notes: [],
  }

  onCollectionUpdate = (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc) => {
      const { title, note, color } = doc.data();
  
      notes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        note,
        color,
      });
    });
  
    this.setState({ notes });
  }

  onAddPress = () => {
    this.props.showModal(null, '', '');
  }

  onEditPress = (key, title, note, color) => () => {
    this.props.showModal(key, title, note, color);
  }

  onDeletePress = (key) => () => {
    this.props.deleteNote({ key });
  }

  keyExtractor = (item) => item.key;

	renderItem = (data) => (
    <NoteCard
      data={data.item}
      onEditPress={this.onEditPress(data.item.key, data.item.title, data.item.note, data.item.color)}
      onDeletePress={this.onDeletePress(data.item.key)}
    />
	);
	
	render() {
		return (
      <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
        <NoteModal />
        <Header title="My Notes" rightIcon={iconNames.add} onIconPress={this.onAddPress} />
        <FlatList
          data={this.state.notes}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
		);
	}
}


const mapStateToProps = (state) => {
  return null;
};

const mapDispatchToProps = { showModal, deleteNote };

export default connect(null, mapDispatchToProps)(Notes);