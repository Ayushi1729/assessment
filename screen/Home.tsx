import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, Button } from 'react-native';
import StoryList from './StoryList';
import { useCopilot } from 'react-native-copilot';

import {
    CopilotStep,
    walkthroughable,
} from "react-native-copilot";

const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);

interface Post {
    id: string;
    username: string;
    imageUrl: string;
    likes: number;
    caption: string;
    profileImage: string
}


const postsData: Post[] = [
    {
        id: '1',
        username: 'a_grillz10',
        imageUrl: 'https://thumbs.dreamstime.com/b/sunrise-over-beach-cancun-beautiful-mexico-40065727.jpg',
        likes: 100,
        caption: 'Beautiful day at the beach! ☀️🏖',
        profileImage: 'https://i.pinimg.com/564x/d7/7d/82/d77d82e020703bd1ac13f96418b0c103.jpg'
    },
    {
        id: '2',
        username: 'chelphill',
        imageUrl: 'https://media.istockphoto.com/id/1360554439/photo/maldives-tropical-island.webp?b=1&s=170667a&w=0&k=20&c=AWY54kmUT9IcXJZdSdxxm5JUFK_3fxpmMbWQ6IhEG50=',
        likes: 100,
        caption: 'Beautiful day at the beach! ☀️🏖',
        profileImage: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp'
    },
    {
        id: '3',
        username: 'john_doe',
        imageUrl: 'https://ca-times.brightspotcdn.com/dims4/default/ab95174/2147483647/strip/false/crop/2000x1331+0+0/resize/1486x989!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F65%2F72%2F6e59b1f84a1e829ac316f5935453%2F1190708-tn-dpt-me-lb-south-laguna-beaches-3.jpg',
        likes: 100,
        caption: 'Beautiful day at the beach! ☀️🏖',
        profileImage: 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw'
    },
];



const Post = ({ post }: any) => (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <Image source={{ uri: post.profileImage }}
                style={{ width: 30, height: 30, borderRadius: 30 / 2 }} resizeMode='center' />

            <Text style={styles.username}>{post.username}</Text>
        </View>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <View style={styles.postFooter}>
            <Text>{post.likes} likes</Text>
            <Text>{post.caption}</Text>
        </View>
    </View>
);

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>Instagram</Text>
            <WalkthroughableView style={styles.icons}>
                <CopilotStep text="Check your notification" order={3} name="helloImage">
                    <WalkthroughableImage
                        source={require('.././assets/heart.png')}
                        style={{ width: 20, height: 20, }}
                    />
                </CopilotStep>
                <CopilotStep text="Message your friends" order={2} name="msgImage">
                    <WalkthroughableImage
                        source={require('.././assets/messenger.png')} style={{ width: 20, height: 20, marginStart: 10 }}
                    />
                </CopilotStep>

            </WalkthroughableView>
        </View>
    );
};
  




const Home = () => {

    const { start } = useCopilot();

    return (

        <ScrollView onLayout={() => start()} style={styles.container}>

            <View>
                <Header />
                <StoryList />
            </View>
            <View>
                <FlatList
                    data={postsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Post post={item} />}
                />
            </View>
        </ScrollView>
    )


};

export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
    },
    username: {
        fontWeight: 'bold',
        marginStart: 10,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    postFooter: {
        padding: 10,
    },

   
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
    },
   
});
