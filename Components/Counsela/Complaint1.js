import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function SymptomsScreen({ navigation }) {
  // List of possible complaints
  const symptomsList = [
    { label: 'Overthinking 🤕', value: 'overthinking' },
    { label: 'Depression 😭', value: 'depression' },
    { label: 'Sadness 🤬', value: 'sadness' },
    { label: 'Post Traumatic Stress 🤕', value: 'ptsd' },
    { label: 'Unwanted Thoughts 🤢', value: 'unwantedThoughts' },
    { label: 'Hallucinations 😵‍💫', value: 'hallucinations' },
    { label: 'Addiction 🔥', value: 'addiction' },
    { label: 'Substance Abuse 😵', value: 'substanceAbuse' },
    { label: 'Foreign Body Sensation 🏖️', value: 'foreignBody' },
    { label: 'Stress and Tiredness 🏖️', value: 'stress' },
    { label: 'Unwanted Repetitive Behaviour 🏖️', value: 'unwantedRepetitiveBehaviour' },
    // ...add as many as you need
  ];

  // State to hold selected complaints
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Toggle a complaint's selection
  const toggleSymptom = (value) => {
    if (selectedSymptoms.includes(value)) {
      setSelectedSymptoms((prev) => prev.filter((symptom) => symptom !== value));
    } else {
      setSelectedSymptoms((prev) => [...prev, value]);
    }
  };

  // On pressing "Next", navigate to the details screen and pass the selected symptoms.
  const handleNext = () => {
    console.log('Selected Symptoms:', selectedSymptoms);
    navigation.navigate('SpecificComplaint', { selectedSymptoms });
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      {/* Top header */}
      <View style={tw`flex justify-end items-end mb-4 mt-4`}>
        <Text style={tw`text-lg border rounded-xl px-2 bg-gray-200`}>
        <Text style={tw`text-black font-bold text-lg`}>Counsela</Text>
          ⚡Powered by <Text style={tw`text-black font-bold text-lg`}>Gemini</Text> 
        </Text>
      </View>

      <Text style={tw`text-xl font-bold mb-4`}>
        What are you going through? I’m here to help
      </Text>
      <Text style={tw`text-lg mb-4`}>
        Please select all that apply
      </Text>

      <ScrollView contentContainerStyle={tw`pb-20`}>
        {symptomsList.map((item) => {
          const isSelected = selectedSymptoms.includes(item.value);
          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => toggleSymptom(item.value)}
              style={tw.style(
                'flex-row items-center rounded-2xl p-3 mb-2',
                isSelected ? 'bg-blue-500' : 'bg-gray-100'
              )}
            >
              <Text
                style={tw.style(
                  'text-base',
                  isSelected ? 'text-white' : 'text-black'
                )}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Custom "Next" Button at bottom */}
      <View style={tw`absolute bottom-0 left-0 right-0 p-4`}>
        <TouchableOpacity
          style={tw`bg-blue-700 rounded-xl p-4 mt-4`}
          onPress={handleNext}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
