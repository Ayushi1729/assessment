import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { PermissionsAndroid } from 'react-native'; 
import Contacts from 'react-native-contacts';
import BottomSheet from '@gorhom/bottom-sheet';

const images = [
  { uri: 'https://thumbs.dreamstime.com/b/sunrise-over-beach-cancun-beautiful-mexico-40065727.jpg' },
  { uri: 'https://media.istockphoto.com/id/1360554439/photo/maldives-tropical-island.webp?b=1&s=170667a&w=0&k=20&c=AWY54kmUT9IcXJZdSdxxm5JUFK_3fxpmMbWQ6IhEG50=' },
  { uri: 'https://ca-times.brightspotcdn.com/dims4/default/ab95174/2147483647/strip/false/crop/2000x1331+0+0/resize/1486x989!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F65%2F72%2F6e59b1f84a1e829ac316f5935453%2F1190708-tn-dpt-me-lb-south-laguna-beaches-3.jpg' },
];

const ReferToEarnScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]); 
  const [searchText, setSearchText] = useState(''); 
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetRef = useRef(null); 

  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Refer to Earn - Contact Access',
          message: 'App needs access to contacts to find referrable friends.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchContacts();
      } else {
        console.warn('Contact permission denied');
      }
    } catch (err) {
      console.error('Error requesting contact permission:', err);
    }
  };

  const fetchContacts = async () => {

    try {
      Contacts.getAll()
        .then((contacts) => {
          setContacts(contacts);
          setFilteredContacts(contacts); 
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }

  };

 

  const renderContactItem = (item) => {
    const initials = getInitials(item.displayName);
    // console.log("allItem",item)
    return (
      <View key={item.recordID} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
  {item.hasThumbnail && (
    <Image source={{ uri: item.thumbnailPath }} style={styles.contactImage} />
  )}
  {!item.hasThumbnail &&
    <View style={[styles.contactImage, { backgroundColor: '#57cade', alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.contactInitials}>{initials}</Text>
    </View>
  }

  <View style={{ flex: 1, marginLeft: 10 }}>
    <Text style={styles.contactName}>{item.displayName}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{item.phoneNumbers[0]?.number? item.phoneNumbers[0]?.number + " " : item.phoneNumbers[1]?.number + " "}</Text>
      <Text style={{ color: 'blue' }}>Invite</Text>
    </View>
  </View>

  <Image source={require('.././assets/whatsapp.png')} style={{ width: 24, height: 24 }} />
</View>

    );
  };

  const getInitials = (name) => {
    if(name!=null){

      const parts = name.split(' ');
      let initials = '';
      for (const part of parts) {
        initials += part.charAt(0).toUpperCase();
      }
      return initials;
    }
  };

  const handleSubmit = () => {
    setName('');
    setMobile('');
    setEmail('');
  };

  useEffect(() => {
    requestContactPermission(); 
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.uri }} style={styles.carouselImage} />
      </View>
    );
  };

  
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand(); 
    }
  };

  const CustomHandleComponent = () => {
    return (
      <TouchableOpacity style={{alignItems:'center', }} onPress={() => openBottomSheet()}>
        <View style={{height:50, width:50,justifyContent:'center', borderRadius:50/2, backgroundColor:'#ffffff', borderColor:1,position:'absolute',marginTop:-25, alignItems:'center'}}>
      <Image source={require('.././assets/upload.png')} style={[styles.searchIcon,{ overflow:'hidden', marginRight:0, tintColor:'#57cade'}]} />

      </View>
      </TouchableOpacity>
    )

  };

  const filterContacts = (text) => {
    if(text==""){
      setContacts(filteredContacts)
    }else{
      const filtered = contacts.filter((contact) =>
      contact.displayName && contact.displayName.toLowerCase().includes(text.toLowerCase())
      );

    setContacts(filtered);
  }
  };
  return (


    <View style={{ flex: 1, padding: 10, backgroundColor: '#e1f6fb' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity >
          <Image source={require('.././assets/back.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Refer to Earn</Text>
        <TouchableOpacity >
          <Text style={{ fontSize: 14, color: 'black', textDecorationLine: 'underline', }}>TNCs</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="Enter Name"
        style={[styles.textInput, { marginTop: 30 }]} />
      <TextInput placeholder="Enter Mobile Number" keyboardType="phone-pad"
        style={styles.textInput} />
      <TextInput placeholder="Enter E-mail-ID" keyboardType="email-address"
        style={styles.textInput} />
      <TouchableOpacity style={styles.btnStyle} onPress={() => {
        handleSubmit()
      }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>

      <View style={{ height: 200, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderWidth: 2, borderRadius: 30 }}>
        <Carousel
          data={images} 
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={800}
          layout="default"
        />
      </View>

      <View style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 10, padding: 10 }}>
        <Text style={{ color: '#57cade', textAlign: 'center', fontWeight: 'bold' }}>Check Phonebook below</Text>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Find friends you can refer and win assured rewards!</Text>

      </View>


      <BottomSheet
        ref={bottomSheetRef} 
        index={0} 
        snapPoints={['8%', '100%']} 
        backgroundComponent={() => <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />} 
        handleComponent={CustomHandleComponent}
      >
        <View style={{ backgroundColor: 'white', flex: 1 }}>

{console.log(filteredContacts.length,"lengthhhh")}
        <Text style={{ textAlign: 'center', marginTop:25 }}>Swipe up to see {filteredContacts.length} friends you can invite</Text>

          <View style={styles.searchBar}>
            <Image source={require('.././assets/search.png')} style={[styles.searchIcon, {marginLeft:5}]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Name or Mobile No."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                filterContacts(text);
              }}
            />

          </View>
          <ScrollView style={{marginHorizontal:15}}>
            {contacts.map((contact) => renderContactItem(contact))}
          </ScrollView>
        </View>
      </BottomSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#f6f9fe',
    marginHorizontal:10,
    marginTop:15
  },
  subTitle: {
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  btnStyle: {
    borderWidth: 1, backgroundColor: '#0586af', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20
  },
  carouselItem: {
    width: 300,
    height: 200,
    borderRadius: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contactImage: {
    width: 30, height: 30, borderRadius: 30 / 2
  }
});

export default ReferToEarnScreen;   