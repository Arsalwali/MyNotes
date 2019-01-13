import React from 'react';
import { Text } from 'react-native';
import ColorPalette from 'react-native-color-palette';
import { colors } from '../../theme';

class ControlledColorPicker extends React.Component {
  componentDidMount() {
    if(!this.props.color && this.props.setColor) {
      this.props.setColor(colors.colorPickerArray[0]);
    }
  }
  
  // onColorChange = (color) => {
  //   if (this.props.setColor) {
  //     this.props.setColor(color);
  //   }
  // }
  
  render() {
    return (
      <ColorPalette
        onChange={this.props.onColorChange}
        value={this.props.color}
        colors={colors.colorPickerArray}
        title={null}
        icon={<Text>✔</Text>}
      />
    );
  }
};

export default ControlledColorPicker;
