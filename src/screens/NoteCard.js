import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, metrics, iconTypes, iconNames } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    elevation: 4,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    elevation: 2,
    padding: 10,
  },
  iconContainer: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: metrics.title,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.primary1,
  },
  notesStyle: {
    fontSize: metrics.bodyText,
    color: colors.darkText,
  }
});

function NoteCard(props) {
  const { title, note, color } = props.data;
  const addColor = () => {
    const isColorExist = colors.colorPickerArray.find(col => col === color.toLowerCase());
    const noteColor = isColorExist ? color : colors.noteDefaultColor;
    return { 
      backgroundColor: noteColor,
    };
  };

  return(
    <View style={[styles.container, addColor()]}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleStyle} numberOfLines={1}>{title}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name={iconNames.edit}
            type={iconTypes.MaterialIcons}
            size={metrics.iconSize}
            color={colors.iconColor}
            onPress={props.onEditPress}
          />
          <Icon
            name={iconNames.delete}
            type={iconTypes.MaterialIcons}
            size={metrics.iconSize}
            color={colors.iconColor}
            onPress={props.onDeletePress}
          />
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.notesStyle}>{note}</Text>
      </View>
    </View>
  );
}

export default NoteCard;