import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Focus} from './src/pages/Focus';
import {colors} from './src/utils/colors';
import {Timer} from './src/pages/Timer';
import { FocusHistory } from './src/components/FocusHistory';
import uuid from 'react-native-uuid';

const Status = {
  COMPLETED: 1,
  UNFINISHED: 0,
}

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status, id: uuid.v4()}])
  }

  const saveFocusHistoryToStorage = async() => {
    try {
      await AsyncStorage.setItem('focus-history', JSON.stringify(focusHistory))
    } catch(error) {
      console.log(error);
    }
  }

  const loadFocusHistoryFromStorage = async() => {
    try {
      const loadedHistory = await AsyncStorage.getItem('focus-history');
      setFocusHistory(JSON.parse(loadedHistory));
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadFocusHistoryFromStorage();
  }, [])

  useEffect(() => {
    saveFocusHistoryToStorage();
  }, [focusHistory])
  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistory(focusSubject, Status.COMPLETED);
            setFocusSubject(null);
          }}
          onClearSubject={() => {
            addFocusHistory(focusSubject, Status.UNFINISHED);
            setFocusSubject(null) }}
        />
        ) : (
          <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} clearHistory={setFocusHistory}  />
          </>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
