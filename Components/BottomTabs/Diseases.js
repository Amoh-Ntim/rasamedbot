import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
// import Liver from './Liver';
// import Kidney from './Kidney';
// import Heart from  './Heart';
// import Diabetes from './Diabetes';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
    <View>
    <Text style={tw`text-4xl text-black font-bold`}>
                What organ disease would you like to predict?
            </Text>
    </View>
      {/* Row 1 */}
      <View style={tw`flex-row justify-between w-full mb-4`}>
        <TouchableOpacity
          style={tw`flex-1 items-center bg-red-500 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Liver')}
        >
          <Image source={require('../../assets/liver.png')} style={tw`w-16 h-16 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Liver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 items-center bg-blue-500 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Kidney')}
        >
          <Image source={require('../../assets/kidney.png')} style={tw`w-16 h-16 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Kidney</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={tw`flex-row justify-between w-full`}>
        <TouchableOpacity
          style={tw`flex-1 items-center bg-green-500 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Diabetes')}
        >
          <Image source={require('../../assets/diabetes.png')} style={tw`w-16 h-16 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Diabetes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 items-center bg-yellow-500 p-4 m-2 rounded-lg shadow-lg`}
          onPress={() => handleNavigation('Heart')}
        >
          <Image source={require('../../assets/heart.png')} style={tw`w-16 h-16 mb-2`} />
          <Text style={tw`text-lg font-bold text-white`}>Heart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
