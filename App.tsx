import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import Home from './screen/Home';
import BottomNavigation from './screen/BottomNavigation';
import { CopilotProvider } from "react-native-copilot";

const App = () => {
  return (
    <CopilotProvider overlay="view" verticalOffset={50} >
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
      <BottomNavigation />
    </SafeAreaView>
  </CopilotProvider>
  );
};

export default App;
