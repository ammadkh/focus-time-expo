import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes, spacing} from '../utils/sizes';

const convertMinsToMilli = mins => mins * 60 * 1000;
const formatTime = time => (time < 10 ? `0${time}` : time);
export const Countdown = ({minutes = 1, isPaused, onProgress, onEnd}) => {
  const [millis, setMillis] = useState(convertMinsToMilli(minutes));
  const mins = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(convertMinsToMilli(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / convertMinsToMilli(minutes));
    if(!millis) {
      onEnd();
    }
  }, [millis, onProgress, onEnd, minutes])

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  return (
    <View>
      <Text style={styles.text}>{`${formatTime(mins)}: ${formatTime(
        seconds,
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.xxxl,
    padding: spacing.xl,
    backgroundColor: colors.lightBlue,
  },
});
