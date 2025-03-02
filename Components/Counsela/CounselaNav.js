import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";


export default function GoProCard() {
    const navigation = useNavigation();
  const handlePress = () => {
    // Navigate to your Counsela AI screen
    navigation.navigate('Complaint');
  };

  return (
    <View style={tw`m-4`}>
    <TouchableOpacity onPress={handlePress}>
      <View style={tw`bg-blue-500 flex-row rounded-xl p-4`}>
        {/* Left side: Text content */}
        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-white text-xl font-bold mb-2`}>
        TRY COUNSELA!
          </Text>
          <Text style={tw`text-white text-lg font-bold mb-2 font-sans`}>
          Our conversational AI on mental health
          </Text>

          <Text style={tw`text-white mb-1`}>
            ⚡ Fast Response
          </Text>
          <Text style={tw`text-white mb-2`}>
            ♾️ Unlimited Chats
          </Text>

          <TouchableOpacity
            style={tw`bg-white rounded-full px-3 py-2 flex-row items-center`}
            onPress={handlePress}
          >
            <Text style={tw`text-blue-500 font-bold mr-1`}>Start Now</Text>
            <Text style={tw`text-green-500`}>⭐</Text>
          </TouchableOpacity>
        </View>

        {/* Right side: Robot image */}
        <Image
          source={require('../../assets/m3.png')} // or a remote URL
          style={tw`w-20 h-full ml-2`}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
    </View>
  );
}
