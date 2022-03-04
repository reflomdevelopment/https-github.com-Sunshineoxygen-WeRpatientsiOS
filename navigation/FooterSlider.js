import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={
            this.props.screens == 'Register' ? styles.active : styles.inactive
          }></View>
        <View
          style={
            this.props.screens == 'SignupPatholodgy'
              ? styles.active
              : styles.inactive
          }></View>
        <View
          style={
            this.props.screens == 'SignUpgender'
              ? styles.active
              : styles.inactive
          }></View>
        <View
          style={
            this.props.screens == 'SignUpEmail'
              ? styles.active
              : styles.inactive
          }></View>
        <View
          style={
            this.props.screens == 'SignUpProfessional'
              ? styles.active
              : styles.inactive
          }></View>
        <View
          style={
            this.props.screens == 'SignUpAvatar'
              ? styles.active
              : styles.inactive
          }></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: SIZES.width / 2,
    height: SIZES.height / 30,
    alignSelf: 'center',
    marginTop: '3%',
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  inactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
