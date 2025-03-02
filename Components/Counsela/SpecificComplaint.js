import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

export default function DetailsScreen({ navigation, route }) {
  const { selectedSymptoms } = route.params || {};
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!details.trim()) {
      Alert.alert('Input Required', 'Please enter some details before continuing.');
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint.
      const response = await fetch('http://192.168.18.69:5000/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedSymptoms, details })
      });

      console.log('Status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to send data to the API.');
      }

      const data = await response.text();
      console.log('API response:', data);

      // Navigate to ResultScreen, passing the API response as a parameter.
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Counsela', { apiResponse: data });
      }, 10);
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-lg text-blue-600 font-bold px-2`}>Counsela is assessing your situation and generating solutions to your problem</Text>
      </View>
    );
  }
  return (
    <View style={tw`flex-1 bg-white p-4`}>
    <View style={tw`flex justify-end items-end mb-4 mt-6`}>
    <Text style={tw`text-lg border rounded-xl px-2 bg-gray-200`}>
        <Text style={tw`text-black font-bold text-lg`}>Counsela</Text>
          ⚡Powered by <Text style={tw`text-black font-bold text-lg`}>Gemini</Text> 
        </Text>
      </View>
      <Text style={tw`text-xl font-bold mb-4 mt-4`}>
        Please share some more details so Counsela can help you💆:
      </Text>

      <TextInput
        style={[
          tw`border border-blue-500 rounded-xl p-4 mb-4 text-lg`,
          { height: '66%', textAlignVertical: 'top' }
        ]}
        multiline
        placeholder="Please Describe what happened or what you think led to this situation..."
        value={details}
        onChangeText={setDetails}
      />

      <TouchableOpacity
        style={tw`bg-blue-500 rounded-xl p-4 mt-4`}
        onPress={handleNext}
        disabled={loading}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>
        Submit to Counsela
        </Text>
      </TouchableOpacity>
    </View>
  );
}
