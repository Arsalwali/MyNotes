import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, metrics, iconNames, iconTypes } from '../../theme';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 5,
  },
  textStyle: {
    fontSize: metrics.header,
    fontWeight: 'bold',
    color: colors.primary1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});


function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{props.title}</Text>
      { props.rightIcon && 
        <View style={styles.rightIconContainer}>
          <Icon
            name={props.rightIcon}
            type={iconTypes.MaterialIcons}
            size={metrics.iconSize}
            color={colors.iconColor}
            onPress={props.onIconPress}
          />
        </View>
      }
    </View>
  );
}

export default Header;