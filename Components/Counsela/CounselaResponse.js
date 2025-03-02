import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import tw from 'twrnc';


export default function ResultScreen({ route }) {
  const { apiResponse } = route.params;

  return (
    <View style={tw`flex-1 bg-white p-4`}>
    <View style={tw`flex flex-row items-center mb-4 mt-4`}>
        <Image
          source={require("../../assets/Robot.png")} // Replace with actual bot image
          style={tw`w-10 h-10 rounded-full`}
        />
        <View style={tw`ml-3`}>
          <Text style={tw`text-black font-bold text-lg`}>Counsela AI</Text>
          <Text style={tw`text-green-500 text-sm`}>Always active</Text>
        </View>
      </View>
      <ScrollView style={tw`bg-gray-100 p-4 rounded`}>
        <Text style={tw`text-lg mb-8`}>
          {apiResponse}
        </Text>
      </ScrollView>
    </View>
  );
}
