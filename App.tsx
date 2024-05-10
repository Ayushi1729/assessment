/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ReferToEarnScreen from './screen/Refer&Earn';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <SafeAreaView style={{ flex: 1, backgroundColor: '#e1f6fb' }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#293464"}
      />
     <ReferToEarnScreen/>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
