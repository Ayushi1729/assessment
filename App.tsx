import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import Home from './screen/Home';
import BottomNavigation from './screen/BottomNavigation';
import { CopilotProvider } from "react-native-copilot";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CopilotProvider overlay="view" verticalOffset={25} >
      <Home />
      <BottomNavigation />
    </CopilotProvider>
    </SafeAreaView>
  );
};

export default App;
