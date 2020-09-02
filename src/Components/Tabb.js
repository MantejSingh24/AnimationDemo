/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Tabb = ({icon, isSelected}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Icon name={icon} color={isSelected ? 'black' : 'grey'} size={30}></Icon>
  </View>
);
export default Tabb;
