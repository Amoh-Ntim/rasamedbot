import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Linking,
  SafeAreaView, // Import Linking for external URLs
} from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { FIREBASE_DATABASE } from "../firebase/FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import axios from "axios";
import moment from "moment";
import Start from "./BottomTabs/Start";
import Profile from "./BottomTabs/Profile";
import News from "./BottomTabs/News";
import GoProCard from "./Counsela/CounselaNav";

const Tab = createBottomTabNavigator();

function Welcome() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsername = async () => {
    try {
      const docRef = doc(FIREBASE_DATABASE, "users", "eJi1FNZ7xFvYctcLTwmW");
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setUsername(docSnapshot.data().username || "Guest");
      } else {
        setUsername("Guest");
      }
    } catch (error) {
      console.error("Error fetching username:", error.message);
      setUsername("Guest");
    }
  };

  const fetchNewsData = async (query = "health") => {
    const apiKey = "85dd4bb2a84e4780aa0f552c7202aa38";
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    try {
      const newsResponse = await axios.get(newsApiUrl);
      setNewsData(newsResponse.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchNewsData();
  }, []);

  const handleSearch = () => {
    fetchNewsData(searchQuery);
  };

  const handleNewsPress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  const handleCategoryPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.url)}>
      <View style={[styles.card]}>
        <Image
          source={
            item.urlToImage
              ? { uri: item.urlToImage }
              : require("../assets/placeholder.png") // Fallback image
          }
          style={styles.cardImg}
        />
        <View style={tw`p-4`}>
          <Text style={tw`font-bold text-lg mt-2 text-gray-800`}>
            {item.title}
          </Text>
          <Text style={styles.cardDuration}>
            {moment(item.publishedAt).format("MMM D, YYYY")}
          </Text>
          <Text style={tw`mt-1 text-gray-600`}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const diseasePredictions = [
    {
      label: "Heart",
      iconBgColor: "#F87171", // red
      bgColor: "#fff2f2",
      image: require("../assets/heart.png"),
      screen: "Heart", // Add the screen name for navigation
    },
    {
      label: "Diabetes",
      bgColor: "#e0f3ff",
      iconBgColor: "#60A5FA", // blue
      image: require("../assets/diabetes.png"),
      screen: "Diabetes", // Add the screen name for navigation
    },
    {
      label: "Kidney",
      bgColor: "#e9ffe8",
      iconBgColor: "#34D399", // green
      image: require("../assets/kidney.png"),
      screen: "Kidney", // Add the screen name for navigation
    },
    {
      label: "Liver",
      bgColor: "#fffade",
      iconBgColor: "#FBBF24", // yellow
      image: require("../assets/liver.png"),
      screen: "Liver", // Add the screen name for navigation
    },
  ];

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Hospital"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "hospital-box" : "hospital-box-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        }}
      >
        {() => (
          <SafeAreaView style={tw`flex-1`}>
            {/* Header with Linear Gradient */}
            <LinearGradient
              colors={["#a2cafc" , '#fff']}
              style={tw`pb-16 rounded-bl-3xl rounded-br-3xl`}
            >
              <View style={tw`px-6 mt-4`}>
              <View style={tw`flex-row justify-between items-center mt-0`}>
        {/* Left Icon */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-2xl font-bold text-black`}>Welcome <Text style={tw`text-2xl font-extrabold text-black`}>{username}!</Text></Text>
          
        </View>


        {/* Right Icons */}
        <View style={tw`flex-row space-x-4`}>
          
          <TouchableOpacity style={tw`p-2 mt-4`}>
            <Image
              source={require("../assets/notification.png")} // Replace with your actual image path for notification icon
              style={tw`w-6 h-6 rounded-full`}
              resizeMode="contain"
            />
            {/* Red dot for notification */}
            <View
              style={tw`absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full border border-white`}
            />
          </TouchableOpacity>
        </View>
      </View>
                
                
              </View>

            {/* Suggested Categories */}
            <View>
              <Text style={tw`text-lg font-bold mt-2 px-6`}>
                Disease Predictions
              </Text>
              <View style={tw`flex-row flex-wrap justify-between px-4 mt-4`}>
      {diseasePredictions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            tw`rounded-2xl mb-4 p-3 shadow-xl`,
            // Each card takes ~half width to form a 2x2 grid:
            { width: '48%', backgroundColor: item.bgColor || '#1c1c1c' }
          ]}
          onPress={() => handleCategoryPress(item.screen)}
        >
          {/* Top row: icon (top-left), 3-dot menu (top-right) */}
          <View style={tw`flex-row justify-between items-center`}>
            {/* Item image (top-left) */}
            <View style={[tw`rounded-xl p-4`, { backgroundColor: item.iconBgColor || 'blue' }]}>
            <Image
              source={item.image}
              style={tw`w-8 h-8 p-4`}
              resizeMode="contain"
            />
            </View>

            {/* Optional 3-dot menu icon (top-right) */}
            <TouchableOpacity>
              {/* <Image
                source={require('../assets/3dots.png')} // Replace with your 3-dot icon
                style={tw`w-4 h-4`}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>
          </View>

          {/* Text area (below the icon) */}
          <View style={tw`mt-3`}>
            {/* Main label (e.g., "Knee Hurts") */}
            <Text style={tw`text-black font-bold text-lg`}>
              {item.label}
            </Text>

            {/* Secondary info (e.g., "251 Total - Serious") */}
            <Text style={tw`text-gray-300 text-sm mt-1`}>
              {item.subLabel} {/* e.g. "251 Total - Serious" */}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
            </View>

            {/* Featured Resources */}
            <View style={tw`mt-2`}>
              <GoProCard/>
            </View>
            </LinearGradient>
          </SafeAreaView>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Chatbot"
        component={Start}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "robot" : "robot-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImg: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardDuration: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default Welcome;
