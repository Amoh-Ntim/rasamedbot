import React,{useState , useEffect} from 'react'
import { Image, Text, TouchableOpacity, StyleSheet, View, FlatList,TextInput,Linking, } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import axios from "axios";
import moment from "moment";
function News() {
     const [newsData, setNewsData] = useState([]);
      const [searchQuery, setSearchQuery] = useState("");

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

      const renderNewsItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNewsPress(item.url)}>
          <View style={[styles.card]}>
            <Image
              source={
                item.urlToImage
                  ? { uri: item.urlToImage }
                  : require("../../assets/placeholder.png") // Fallback image
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
    
  return (
    <View>
            <LinearGradient
              colors={["#a2cafc" , '#fff']}
              style={tw`pb-16 rounded-bl-3xl rounded-br-3xl`}
            >

         {/* Search Bar */}
         <View
                  style={tw`flex-row items-center bg-white rounded-3xl p-2 mx-8 mb-4 mt-8 shadow-lg`}
                >
                  <MaterialCommunityIcons
                    name="magnify"
                    size={24}
                    color="#888"
                    style={tw`mr-2`}
                  />
                  <TextInput
                    style={tw`flex-1 text-base text-gray-800 px-4`}
                    placeholder="Search Health News..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                  />
                </View>

                 {/* Featured Resources */}
            <View style={tw`mt-2`}>
              <FlatList
                data={newsData}
                keyExtractor={(item, index) => `${index}-${item.url}`}
                renderItem={renderNewsItem}
                style={tw`mt-0 px-4`}
              />
            </View>
            </LinearGradient>
    </View>
  )
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

export default News
