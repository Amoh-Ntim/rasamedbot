import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const WeightInput = ({ navigation }) => {
  const [weight, setWeight] = useState(140);
  const [unit, setUnit] = useState('lbs'); // Unit can be 'lbs' or 'kg'

  const handleIncrease = () => {
    setWeight((prevWeight) => prevWeight + 1); // Increment weight
  };

  const handleDecrease = () => {
    setWeight((prevWeight) => Math.max(prevWeight - 1, 1)); // Decrement weight, minimum 1
  };

  const toggleUnit = (selectedUnit) => {
    if (unit !== selectedUnit) {
      // Convert weight to the new unit
      const convertedWeight = selectedUnit === 'kg' ? Math.round(weight / 2.205) : Math.round(weight * 2.205);
      setWeight(convertedWeight);
      setUnit(selectedUnit);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-lg`}>←</Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-gray-500`}>Skip</Text>
      </View>

      {/* Title */}
      <Text style={tw`flex justify-center text-2xl font-bold mt-8`}>What is your weight?</Text>

      {/* Unit Selection */}
      <View style={tw`flex-row justify-around items-center mt-6`}>
        <TouchableOpacity
          onPress={() => toggleUnit('lbs')}
          style={tw`px-4 py-2 border rounded-lg ${
            unit === 'lbs' ? 'bg-blue-500' : 'bg-white'
          }`}
        >
          <Text style={tw`text-lg ${unit === 'lbs' ? 'text-white' : 'text-black'}`}>lbs</Text>
        </TouchableOpacity>
        <View style={tw`w-4`} /> {/* Spacer */}
        <TouchableOpacity
          onPress={() => toggleUnit('kg')}
          style={tw`px-4 py-2 border rounded-lg ${
            unit === 'kg' ? 'bg-blue-500' : 'bg-white'
          }`}
        >
          <Text style={tw`text-lg ${unit === 'kg' ? 'text-white' : 'text-black'}`}>kg</Text>
        </TouchableOpacity>
      </View>

      {/* Weight Display */}
      <Text style={tw`text-4xl font-bold text-center mt-8`}>
        {weight} {unit}
      </Text>

      {/* Buttons to Adjust Weight */}
      <View style={tw`flex-row justify-center items-center mt-8`}>
        {/* Decrease Button */}
        <TouchableOpacity
          onPress={handleDecrease}
          style={tw`bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center`}
        >
          <Text style={tw`text-2xl font-bold text-gray-800`}>-</Text>
        </TouchableOpacity>

        {/* Spacer */}
        <View style={tw`w-12`} />

        {/* Increase Button */}
        <TouchableOpacity
          onPress={handleIncrease}
          style={tw`bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center`}
        >
          <Text style={tw`text-2xl font-bold text-gray-800`}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => {
          console.log(`Final Weight: ${weight} ${unit}`);
          navigation.navigate('Blood');
        }}
        style={tw`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center mt-8`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeightInput;
