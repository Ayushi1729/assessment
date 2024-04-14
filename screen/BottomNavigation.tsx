import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const WalkthroughableView = walkthroughable(View);

import {
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
const BottomNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('home')}
      >
        <MaterialCommunityIcons
          name={selectedTab === 'home' ? 'home' : 'home-outline'}
          size={24}
          color={selectedTab === 'home' ? '#000' : '#888'}
        />
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('search')}
      >
        <MaterialCommunityIcons
          name={selectedTab === 'search' ? 'magnify' : 'magnify'}
          size={24}
          color={selectedTab === 'search' ? '#000' : '#888'}
        />
      </TouchableOpacity>
      <View style={styles.targetViewContainer}>
      <CopilotStep text="Create your post" order={5} name="post creation" >
        <WalkthroughableView >
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress('add')}
          >
            <MaterialCommunityIcons
              name="plus-box"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </WalkthroughableView>
      </CopilotStep>
      </View>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('notifications')}
      >
        <MaterialCommunityIcons
          name={selectedTab === 'notifications' ? 'video' : 'video-outline'}
          size={24}
          color={selectedTab === 'notifications' ? '#000' : '#888'}
        />
      </TouchableOpacity>

      <CopilotStep text="Here you can check your profile" order={4} name="profile">
        <WalkthroughableView >
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress('profile')}
          >
            <MaterialCommunityIcons
              name={selectedTab === 'profile' ? 'account' : 'account-outline'}
              size={24}
              color={selectedTab === 'profile' ? '#000' : '#888'}
            />
          </TouchableOpacity>
        </WalkthroughableView>
      </CopilotStep>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 5
  },
  tab: {
    alignItems: 'center',
  },
  targetViewContainer: {
    position: 'relative', 
  },
});
