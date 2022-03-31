import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RoundedButton} from './RoundedButton';

export const Timings = ({onSetMins}) => {
  return (
    <>
      <View style={styles.button}>
        <RoundedButton title={10} size={50} onPress={() => onSetMins(10)} />
      </View>
      <View style={styles.button}>
        <RoundedButton title={15} size={50} onPress={() => onSetMins(15)} />
      </View>
      <View style={styles.button}>
        <RoundedButton title={20} size={50} onPress={() => onSetMins(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
