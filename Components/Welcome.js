import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { FIREBASE_DATABASE } from "../firebase/FirebaseConfig";
import { FIREBASE_STORAGE } from "../firebase/FirebaseConfig";
import { ref } from 'firebase/storage';
import Profile from "./BottomTabs/Profile";
import Start from "./BottomTabs/Start";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import tw from 'twrnc'

function Welcome({ route }) {
  const { uniqueImageName, fileType } = route.params; 
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(FIREBASE_DATABASE, "users/eJi1FNZ7xFvYctcLTwmW");
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setUsername(docSnapshot.data().username);
      } else {
        console.log("No such document!");
      }
  
      // Replace with the path of the image file in Firebase Storage
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
      <View style={tw`h-1/3 flex`}>
      <View>
        <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>
      <View>
        <Text style={tw`text-2xl font-bold flex items-center`}>Welcome</Text>
        <Text style={tw`text-4xl font-bold flex items-center text-[#6C63FF]`}>{username}</Text>
      </View>
      </View>
      {/* grid view */}
      <View style={tw`flex-row flex-wrap h-2/3`}>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-[#F49884] w-full h-48`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-[#F4E784] w-full h-48`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-[#84F4E9] w-full h-48`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-[#CA84F4] w-full h-48`}>
          </View>
        </View>
      </View>
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

export default Welcome


// const docRef = firebase.firestore().doc("users/eJi1FNZ7xFvYctcLTwmW");
// docRef.get().then((doc) => {
//   if (doc.exists) {
//     console.log("Username:", doc.data().username);
//   } else {
//     console.log("No such document!");
//   }
// }).catch((error) => {
//   console.log("Error getting document:", error);
// });

// const storageRef = firebase.storage().ref('images/uniqueImageName.fileType');
// storageRef.getDownloadURL().then((url) => {
//   // `url` is the download URL for the image
//   console.log(url);
// }).catch((error) => {
//   console.log("Error getting image:", error);
// });
