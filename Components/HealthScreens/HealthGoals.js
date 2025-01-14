import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';

const HealthGoals = ({ navigation }) => {
  const { width } = Dimensions.get('screen');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    'I wanna get healthy',
    'I wanna lose weight',
    'I wanna try AI Chatbot',
    'I wanna manage meds',
    'Just trying out the app',
  ];

  return (
    <View style={tw`flex-1 bg-gray-100 px-6`}>
      <View style={tw`flex-row justify-between items-center mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-lg`}>←</Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-gray-500`}>Skip</Text>
      </View>
      <Text style={tw`text-2xl font-bold mt-8`}>What is your health goal for the app?</Text>
      <View style={tw`mt-6`}>
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedGoal(index)}
            style={tw`flex-row items-center justify-between px-4 py-3 rounded-lg mb-3 ${
              selectedGoal === index ? 'bg-blue-500' : 'bg-white'
            }`}
          >
            <Text style={tw`${selectedGoal === index ? 'text-white' : 'text-black'} text-lg`}>
              {goal}
            </Text>
            <View
              style={tw`w-6 h-6 border-2 rounded-full ${
                selectedGoal === index ? 'bg-white' : 'border-gray-400'
              }`}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Gender')}
        style={tw`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center mt-8`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HealthGoals;
