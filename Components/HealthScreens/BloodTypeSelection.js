import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const BloodTypeSelection = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('A');
  const [rhFactor, setRhFactor] = useState('+');

  const bloodTypes = ['A', 'B', 'AB', 'O'];

  const toggleRhFactor = () => {
    setRhFactor((prev) => (prev === '+' ? '-' : '+'));
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-3xl font-bold`}>←</Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-gray-500`}>Skip</Text>
      </View>

      {/* Title */}
      <Text style={tw`text-2xl font-bold mt-8`}>What’s your official blood type?</Text>

      {/* Blood Type Options */}
      <View style={tw`flex-row justify-between items-center mt-6`}>
        {bloodTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={tw`px-6 py-3 border rounded-lg ${
              selectedType === type ? 'bg-blue-500 border-blue-700' : 'border-gray-400'
            }`}
          >
            <Text
              style={tw`text-lg ${
                selectedType === type ? 'text-white font-bold' : 'text-black'
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Blood Type Display */}
      <Text style={tw`text-6xl font-bold text-center mt-8`}>
        {selectedType}
        <Text style={tw`text-red-500`}>{rhFactor}</Text>
      </Text>

      {/* Rh Factor Buttons */}
      <View style={tw`flex-row justify-center items-center mt-6`}>
        {/* Positive Button */}
        <TouchableOpacity
          onPress={() => setRhFactor('+')}
          style={tw`bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-4 ${
            rhFactor === '+' && 'opacity-100'
          }`}
        >
          <Text style={tw`text-white text-2xl font-bold`}>+</Text>
        </TouchableOpacity>

        {/* Negative Button */}
        <TouchableOpacity
          onPress={() => setRhFactor('-')}
          style={tw`bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center mx-4 ${
            rhFactor === '-' && 'opacity-100'
          }`}
        >
          <Text style={tw`text-gray-800 text-2xl font-bold`}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('Selected Blood Type:', `${selectedType}${rhFactor}`);
          navigation.navigate('Welcome');
        }}
        style={tw`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center mt-8`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BloodTypeSelection;
