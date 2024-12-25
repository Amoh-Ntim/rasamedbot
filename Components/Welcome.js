// React Native Code Update for Improved UI
import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Linking, ScrollView, TextInput } from 'react-native';
import { FIREBASE_DATABASE } from "../firebase/FirebaseConfig";
import { FIREBASE_STORAGE } from "../firebase/FirebaseConfig";
import { ref } from 'firebase/storage';
import Profile from "./BottomTabs/Profile";
import Start from "./BottomTabs/Start";
import axios from 'axios';
import moment from 'moment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';


import { useNavigation } from '@react-navigation/native';

function Welcome({ route }) {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const [username, setUsername] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const fetchNewsData = async (query = 'drug') => {
    const apiKey = '85dd4bb2a84e4780aa0f552c7202aa38';
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    try {
      const newsResponse = await axios.get(newsApiUrl);
      setNewsData(newsResponse.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

    const fetchUsername = async () => {
      try {
        const docRef = doc(FIREBASE_DATABASE, "users", "eJi1FNZ7xFvYctcLTwmW"); // Use the correct path structure
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setUsername(docSnapshot.data().username || 'Guest'); // Fallback to 'Guest' if username is missing
        } else {
          console.log("No such document!");
          setUsername('Guest'); // Handle case where document does not exist
        }
      } catch (error) {
        console.error("Error fetching username:", error.message); // Log detailed error message
        setUsername('Guest'); // Provide a fallback in case of an error
      }
    };
  

  useEffect(() => {
    fetchNewsData(); // Fetch news articles
    fetchUsername(); // Fetch the username
  }, []);

  const handleSearch = () => {
    fetchNewsData(searchQuery); // Fetch data based on search query
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.url)}>
      <View style={[styles.card, tw`px-4`]}>
        <Image source={{ uri: item.urlToImage }} style={[styles.cardImg, tw`rounded-xl`]} />
        <Text style={tw`font-bold text-lg mt-2`}>{item.title}</Text>
        <Text style={styles.cardDuration}>{moment(item.publishedAt).format('MMM D, YYYY')}</Text>
        <Text style={tw`mt-1`}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Hospital" options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? 'hospital-box' : 'hospital-box-outline'} size={size} color={color} />
        ),
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}>
        {() => (
            <LinearGradient
              colors={['#cbfefe', '#eefefe', '#ffffff']} // from-blue-500 via-purple-500 to-pink-500
              style={tw`flex-1`}
            >
          <View style={tw`flex-1`}>
            <View style={tw`h-1/6 px-4 flex flex-row justify-between items-center rounded-bl-3xl rounded-br-3xl`}>
            <View style={tw`mt-4`}>
              <Text style={tw`text-xl font-bold flex items-center`}>
                Welcome <Text style={tw`text-blue-500 text-2xl mt-2`}>{username}!</Text>
              </Text>
            </View>

            </View>
            
            <Text style={tw`text-lg px-4 font-bold flex items-center ml-2`}>DISEASE PREDICTIONS</Text>
            <View style={tw`flex justify-center items-center`}>
            <ScrollView horizontal style={tw`px-4`}>
  {[
    { label: 'Heart', bgColor: 'bg-red-200', image: require('../assets/heart.png'), screen: 'Heart' },
    { label: 'Diabetes', bgColor: 'bg-green-200', image: require('../assets/diabetes.png'), screen: 'Diabetes' },
    { label: 'Kidney', bgColor: 'bg-yellow-200', image: require('../assets/kidney.png'), screen: 'Kidney' },
    { label: 'Liver', bgColor: 'bg-blue-200', image: require('../assets/liver.png'), screen: 'Liver' },
  ].map((item, index) => (
    <TouchableOpacity
      key={index}
      style={tw`flex-row items-center ${item.bgColor} shadow-xl shadow-black p-3 rounded-lg m-2 shadow`}
      onPress={() => handleNavigation(item.screen)}
    >
      <Image source={item.image} style={tw`w-8 h-8 mr-2`} />
      <Text style={tw`text-base font-bold text-gray-800`}>{item.label}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

            </View>


            <View style={tw`p-4`}>
            <View style={tw`flex-row items-center bg-gray-100 rounded-full`}>
               {/* <Ionicons name="search" size={20} color="#888" style={tw`ml-2 bg-white p-2`} /> */}
               <TextInput
                 style={tw`flex-1 text-base text-black bg-white py-2 rounded-xl border border-black`}
                 placeholder=" Search For All Your Health News..."
                 placeholderTextColor="#888"
                 value={searchQuery}
                 onChangeText={setSearchQuery}
                 onSubmitEditing={handleSearch} // Trigger search on Enter key
               />
            </View>
            </View>
            <FlatList
              data={newsData}
              keyExtractor={(item, index) => `${index}-${item.url}`}
              renderItem={renderNewsItem}
            />
          </View>
            </LinearGradient>
        )}
      </Tab.Screen>
      <Tab.Screen name="Chatbot" component={Start} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? 'robot' : 'robot-outline'} size={size} color={color} />
        ),
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }} />

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
        ),
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  articleContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
  cardDuration: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  searchBarContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 24,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default Welcome;
