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
  Linking, // Import Linking for external URLs
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

  const fetchNewsData = async (query = "drug") => {
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
      bgColor: "#FCD3D3",
      image: require("../assets/heart.png"),
      screen: "Heart", // Add the screen name for navigation
    },
    {
      label: "Diabetes",
      bgColor: "#C5E1A5",
      image: require("../assets/diabetes.png"),
      screen: "Diabetes", // Add the screen name for navigation
    },
    {
      label: "Kidney",
      bgColor: "#FFF9C4",
      image: require("../assets/kidney.png"),
      screen: "Kidney", // Add the screen name for navigation
    },
    {
      label: "Liver",
      bgColor: "#BBDEFB",
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
          <View style={tw`flex-1`}>
            {/* Header with Linear Gradient */}
            <LinearGradient
              colors={["#1767fc", "#82adfd", "#a3c3fe"]}
              style={tw`pb-6 rounded-bl-3xl rounded-br-3xl`}
            >
              <View style={tw`px-6`}>
                <Text style={tw`text-2xl font-bold text-white mt-6`}>
                  Welcome{" "}
                  <Text style={tw`text-white font-extrabold`}>{username}!</Text>
                </Text>
                {/* Search Bar */}
                <View
                  style={tw`flex-row items-center bg-white rounded-full p-3 mt-4 shadow-lg`}
                >
                  <MaterialCommunityIcons
                    name="magnify"
                    size={24}
                    color="#888"
                    style={tw`mr-2`}
                  />
                  <TextInput
                    style={tw`flex-1 text-base text-gray-800`}
                    placeholder="Search Health News..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                  />
                </View>
              </View>
            </LinearGradient>

            {/* Suggested Categories */}
            <View>
              <Text style={tw`text-lg font-bold mt-6 px-6`}>
                Disease Predictions
              </Text>
              <ScrollView
                horizontal
                style={tw`px-4 mt-4`}
                showsHorizontalScrollIndicator={false}
              >
                {diseasePredictions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tw`p-4 rounded-lg mr-4 flex justify-center items-center`,
                      { backgroundColor: item.bgColor, width: 90 },
                    ]}
                    onPress={() => handleCategoryPress(item.screen)}
                  >
                    <Image
                      source={item.image}
                      style={tw`w-12 h-12 mb-2`}
                      resizeMode="contain"
                    />
                    <Text style={tw`text-center font-bold text-gray-800`}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Featured Resources */}
            <View style={tw`mt-6`}>
              <Text style={tw`text-lg font-bold px-6`}>
                Health News
              </Text>
              <FlatList
                data={newsData}
                keyExtractor={(item, index) => `${index}-${item.url}`}
                renderItem={renderNewsItem}
                style={tw`mt-0 px-4`}
              />
            </View>
          </View>
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
