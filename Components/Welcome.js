import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { FIREBASE_DATABASE } from "../firebase/FirebaseConfig";
import { FIREBASE_STORAGE } from "../firebase/FirebaseConfig";
import { ref } from 'firebase/storage';
import Profile from "./BottomTabs/Profile";
import Start from "./BottomTabs/Start";
import axios from 'axios';
import moment from 'moment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import tw from 'twrnc' 

function Welcome( { route } ) {
  const { uniqueImageName, fileType } = route.params; 
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const keyExtractor = (item, index) => {
    // Check if the item has a unique identifier property like 'id'
    if (item.id) {
      return item.id.toString();
    }
  
    // If no unique identifier exists, create a combination of index and url
    return `${index}-${item.url}`;
  }
  const keywords = ["kidney","heart", "liver", "diabetes"];

  useEffect(() => {
    
    const fetchData = async () => {
      // Fetch news data from NewsAPI
      const apiKey = '85dd4bb2a84e4780aa0f552c7202aa38'; // Replace with your actual NewsAPI key
      const newsApiUrl = `https://newsapi.org/v2/everything?q=kidney&apiKey=${apiKey}`;
      try {
        const newsResponse = await axios.get(newsApiUrl);
        setNewsData(newsResponse.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
  
      // Fetch user data from Firebase
      const docRef = doc(FIREBASE_DATABASE, "users/eJi1FNZ7xFvYctcLTwmW");
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setUsername(docSnapshot.data().username);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  
      // Fetch image URL from Firebase Storage
      const storageRef = ref(FIREBASE_STORAGE, `${uniqueImageName}.${fileType}`);
      try {
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (error) {
        console.log("Error getting image:", error);
      }
     };
  
    fetchData();
  }, [uniqueImageName]);
  

  // 85dd4bb2a84e4780aa0f552c7202aa38

  const renderNewsItem = ({ item }) => (
    <View style={[styles.card,tw`px-4`]}>
    <View style={tw`flex`}>
    <View style={styles.cardTop}>
      <Image source={{ uri: item.urlToImage }} style={[styles.cardImg, tw`rounded-xl`]} />
    </View>
    <View>
      <Text style={tw`font-bold text-xl`}>{item.title}</Text>
      <Text style={styles.cardDuration}>{moment(item.publishedAt).format('MMM D, YYYY')}</Text>
      <Text style={tw`font-semibold`}>{item.description}</Text>
    </View>
    </View>
    </View>
  );
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,  // This line hides the header
    }}>
      <Tab.Screen name="Welcome" 
      options={{
      tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'home' : 'home-outline'; // choose appropriate icon names
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  }}
      >
        {() => (
    <View style={tw`flex-1`}>
      <View style={tw`h-1/6 px-4 flex flex-row justify-between items-center bg-blue-200 rounded-bl-3xl rounded-br-3xl`}>
      <View style={tw``}>
        <Text style={tw`text-xl font-bold flex items-center`}>Welcome</Text>
        <Text style={tw`text-4xl font-bold flex items-center text-blue-800`}>{username}!</Text>
      </View>
      <View>
        <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        {/* <Image source={require('../assets/undraw_medicine.png')} style={{ width: 50, height: 50, borderRadius: 25 }}/> */}
      </View>
      </View>
      {/* grid view */}
      <View style={tw`py-4`}>
      <Text style={tw`ml-4 font-bold text-xl`}>ALL THE LATEST HEALTH NEWS</Text>
      </View>
      <FlatList
      data={newsData}
      keyExtractor={keyExtractor}
      renderItem={renderNewsItem}
    />
    </View>
  )}
      </Tab.Screen>
      {/* Add more Tab.Screen components here for other tabs */}
      <Tab.Screen name="Start" 
      component={Start}
      options={{
      tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'robot' : 'robot-outline'; // choose appropriate icon names
      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
  }} 
       />
      <Tab.Screen name="Profile" 
      component={Profile} 
      options={{
      tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'settings-sharp' : 'settings-outline'; // choose appropriate icon names
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  }} 
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  articleContainer: {
    marginBottom: 16,
  },
   card: {
    padding: 12,
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderRadius: 24,
  },
  cardTop: {
    position: 'relative',
    borderRadius: 24,
  },
  cardDuration: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6a6bff',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default Welcome


