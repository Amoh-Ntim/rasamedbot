import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Linking, ScrollView } from 'react-native';
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


import { useNavigation } from '@react-navigation/native';

function Welcome( { route } ) {
  // const { uniqueImageName, fileType } = route.params;
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  }; 
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


  useEffect(() => {
    
    const fetchData = async () => {
      // Fetch news data from NewsAPI
      const apiKey = '85dd4bb2a84e4780aa0f552c7202aa38'; // Replace with your actual NewsAPI key
      const newsApiUrl = `https://newsapi.org/v2/everything?q=drug&apiKey=${apiKey}`;
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
     };
  
    fetchData();
  }, []);
  
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  // 85dd4bb2a84e4780aa0f552c7202aa38

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.url)}>
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
    </TouchableOpacity>
  );
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,  // This line hides the header
    }}>
      <Tab.Screen name="News" 
      options={{
      tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'home' : 'home-outline'; // choose appropriate icon names
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarLabelStyle: {
      fontSize: 16, // Increase the font size
      fontWeight: 'bold', // Make the text bold
    },
  }}
      >
        {() => (
    <View style={tw`flex-1`}>
      <View style={tw`h-1/6 px-4 flex flex-row justify-between items-center rounded-bl-3xl rounded-br-3xl`}>
      <View style={tw``}>
        <Text style={tw`text-lg font-bold flex items-center`}>Welcome</Text>
        <Text style={tw`text-5xl font-bold flex items-center text-black`}>{username}!</Text>
      </View>
      </View>
      
      <Text style={tw`text-xl px-4 font-bold flex items-center`}>DISEASE PREDICTIONS</Text>
      {/* diseases scrollview */}
      <View style={tw`flex justify-center items-center`}>
      <ScrollView  horizontal>
      <View style={tw`h-24 mb-4`}>
        {/* View 1 */}
        <TouchableOpacity
          style={tw`flex-1 items-center bg-red-400 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Heart')}
        >
          <Image source={require('../assets/heart.png')} style={tw`w-8 h-8 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Heart</Text>
        </TouchableOpacity>

      </View>
      <View style={tw`h-24 mb-4`}>
        {/* View 2 */}
        <TouchableOpacity
          style={tw`flex-1 items-center bg-yellow-600 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Diabetes')}
        >
          <Image source={require('../assets/diabetes.png')} style={tw`w-8 h-8 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>diabetes</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`h-24 mb-4`}>
        {/* View 3 */}
        <TouchableOpacity
          style={tw`flex-1 items-center bg-blue-600 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Kidney')}
        >
          <Image source={require('../assets/kidney.png')} style={tw`w-8 h-8 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Kidney</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`h-24`}>
        {/* View 4 */}
        <TouchableOpacity
          style={tw`flex-1 items-center bg-green-600 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Liver')}
        >
          <Image source={require('../assets/liver.png')} style={tw`w-8 h-8 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Liver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
      </View>
      {/* grid view */}
      <View style={tw`py-4`}>
      <Text style={tw`ml-4 font-bold text-2xl`}>ALL THE LATEST HEALTH NEWS</Text>
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
      <Tab.Screen name="Chatbot" 
      component={Start}
      options={{
      tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'robot' : 'robot-outline'; // choose appropriate icon names
      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
    tabBarLabelStyle: {
      fontSize: 16, // Increase the font size
      fontWeight: 'bold', // Make the text bold
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
    tabBarLabelStyle: {
      fontSize: 16, // Increase the font size
      fontWeight: 'bold', // Make the text bold
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


