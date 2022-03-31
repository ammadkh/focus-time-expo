import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 40,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress} >
      <Text style={[styles(size).title, textStyle]} >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = size =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      height: size,
      width: size,
      borderColor: 'white',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: size / 3,
      color: 'white',
    },
  });
