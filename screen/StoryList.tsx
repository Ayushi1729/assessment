import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
const WalkthroughableView = walkthroughable(View);
import {
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
interface Story {
  id: string;
  username: string;
  imageUrl: string;
  isAddStory?: boolean;
}

const yourStory: Story = {
  id: '0',
  username: 'Your Story',
  imageUrl: 'https://via.placeholder.com/150',
  isAddStory: true,
};

const storiesData: Story[] = [
  {
    id: '1',
    username: 'john_doe',
    imageUrl: 'https://via.placeholder.com/150',
  },

  {
    id: '2',
    username: 'john_doe',
    imageUrl: 'https://via.placeholder.com/150',
  },

  {
    id: '3',
    username: 'john_doe',
    imageUrl: 'https://via.placeholder.com/150',
  },
 
];

const StoryItem = ({ story }: any) => (
  <View style={styles.storyItem}>
    {story.isAddStory ? (


      <CopilotStep text="Create your own story" order={1} name="storyListStep1">
        <WalkthroughableView style={styles.storyList}>
          <TouchableOpacity style={styles.addStory}>
            <Image source={require('.././assets/plus.png')}
              style={{ width: 30, height: 30, position: 'absolute', right: 0, bottom: -5 }} resizeMode='center' />
          </TouchableOpacity>
          <Text style={styles.storyUsername}>{story.username}</Text>
        </WalkthroughableView>
      </CopilotStep>
    ) : (
      <>
        <Image source={{ uri: story.imageUrl }} style={styles.storyImage} />
        <Text style={styles.storyUsername}>{story.username}</Text>
      </>
    )}
  </View>
);

const StoryList = () => {

 
  return(
  <FlatList
    horizontal
    data={[yourStory, ...storiesData]} 
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <StoryItem story={item} />}
    contentContainerStyle={styles.storyList}
  />
  )
};

export default StoryList;

const styles = StyleSheet.create({
  storyList: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  storyItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#c13584',
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  addStory: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#c13584',

    marginLeft: 5
  },
});
