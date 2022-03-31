import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../components/RoundedButton';
import {fontSizes, spacing} from '../utils/sizes';

export const Focus = ({addSubject}) => {
  const [activity, setActivity] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({nativeEvent}) => setActivity(nativeEvent.text)}
          />
          <RoundedButton title="+" onPress={() => addSubject(activity)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center'
  },
  innerContainer: {
    padding: spacing.md,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
