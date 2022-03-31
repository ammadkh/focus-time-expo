import React, {useState} from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {Countdown} from '../components/Countdown';
import {RoundedButton} from '../components/RoundedButton';
import {Timings} from '../components/Timings';
import {colors} from '../utils/colors';
import {spacing} from '../utils/sizes';

export const Timer = ({focusSubject, onTimerEnd, onClearSubject}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.1);
  const [progress, setProgress] = useState(1);

  const onProgressHandler = prog => {
    setProgress(prog);
  };
  const onMinsChangeHandler = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const endTimerHandler = () => {
    if (Platform.OS === 'ios') {
      const vibrationInterval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(vibrationInterval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
    setMinutes(0.4);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onEnd={endTimerHandler}
          onProgress={onProgressHandler}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          color={colors.lightBlue}
          progress={progress}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timings onSetMins={onMinsChangeHandler} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          size={120}
          onPress={() => setIsStarted(prevValue => !prevValue)}
        />
      </View>
      <View style={styles.clearBtn}>
        <RoundedButton title="-" onPress={onClearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: 10,
  },
  titleContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtn: {
    paddingLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
});
