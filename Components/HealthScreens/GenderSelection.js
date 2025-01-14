import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import tw from 'twrnc';

const GenderSelection = ({ navigation }) => {
  const { width } = Dimensions.get('screen');
  const [selected, setSelected] = useState(false);

  return (
    <View style={tw`flex-1 bg-gray-100 px-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-lg`}>←</Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-gray-500`}>Skip</Text>
      </View>

      <Text style={tw`text-2xl font-bold mt-8`}>What is your Gender?</Text>
      <Text style={tw`text-sm text-gray-500 mt-2`}>
        Please select your gender for better personalized health experience.
      </Text>

      {/* Gender Option with Image */}
      <TouchableOpacity
        onPress={() => setSelected(!selected)}
        style={tw`w-full ${
          selected ? 'bg-blue-500 border-blue-700' : 'border-gray-400'
        } mt-6 p-4 flex justify-center items-center`}
      >
        {/* Image */}
        <Image
          source={require('../../assets/gender.png')} // Replace with your image path
          style={tw`w-full h-72`}
        //   resizeMode="contain"
        />
        
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Weight')}
        style={tw`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center mt-8`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelection;
