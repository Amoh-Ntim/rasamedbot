import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import tw from 'twrnc';

const AgeSelection = ({ navigation }) => {
  const { height } = Dimensions.get('screen');
  const [selectedAge, setSelectedAge] = useState(19);

  const ages = Array.from({ length: 100 }, (_, i) => i + 1); // Ages 1-100

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedAge(item)}
      style={[
        tw`h-20 flex items-center justify-center`,
        selectedAge === item && tw`bg-blue-500 rounded-lg`,
      ]}
    >
      <Text
        style={[
          tw`text-2xl`,
          selectedAge === item ? tw`text-white font-bold` : tw`text-gray-700`,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 px-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mt-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-lg`}>←</Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-gray-500`}>Skip</Text>
      </View>

      {/* Title */}
      <Text style={tw`text-2xl font-bold mt-8`}>What is your age?</Text>

      {/* Age Selector */}
      <FlatList
        data={ages}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height * 0.5,
        }}
        initialScrollIndex={selectedAge - 1}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
      />

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('Selected Age:', selectedAge);
          navigation.navigate('Blood');
        }}
        style={tw`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center mt-8`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgeSelection;
