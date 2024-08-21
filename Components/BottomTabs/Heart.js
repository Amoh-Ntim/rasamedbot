import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, FlatList } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';

const InputForm = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState(null);
  const [chestPainType, setChestPainType] = useState(null);
  const [restingBP, setRestingBP] = useState('');
  const [serumCholesterol, setSerumCholesterol] = useState('');
  const [fastingBloodSugar, setFastingBloodSugar] = useState(null);
  const [restingECG, setRestingECG] = useState('');
  const [maxHeartRate, setMaxHeartRate] = useState('');
  const [exerciseInducedAngina, setExerciseInducedAngina] = useState(null);
  const [stDepression, setStDepression] = useState('');
  const [stSlope, setStSlope] = useState(null);
  const [majorVessels, setMajorVessels] = useState('');
  const [thalassemia, setThalassemia] = useState(null);

  const [openSex, setOpenSex] = useState(false);
  const [sexItems, setSexItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const [openChestPain, setOpenChestPain] = useState(false);
  const [chestPainItems, setChestPainItems] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ]);

  const [openFastingBloodSugar, setOpenFastingBloodSugar] = useState(false);
  const [fastingBloodSugarItems, setFastingBloodSugarItems] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
  ]);

  const [openExerciseInducedAngina, setOpenExerciseInducedAngina] = useState(false);
  const [exerciseInducedAnginaItems, setExerciseInducedAnginaItems] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
  ]);

  const [openStSlope, setOpenStSlope] = useState(false);
  const [stSlopeItems, setStSlopeItems] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
  ]);

  const [openThalassemia, setOpenThalassemia] = useState(false);
  const [thalassemiaItems, setThalassemiaItems] = useState([
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ]);

  const formFields = [
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric', type: 'text' },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems, open: openSex, setOpen: setOpenSex, type: 'dropdown' },
    { key: 'chestPainType', label: 'Chest Pain Type', value: chestPainType, setter: setChestPainType, items: chestPainItems, open: openChestPain, setOpen: setOpenChestPain, type: 'dropdown' },
    { key: 'restingBP', label: 'Resting Blood Pressure', value: restingBP, setter: setRestingBP, keyboardType: 'numeric', type: 'text' },
    { key: 'serumCholesterol', label: 'Serum Cholesterol', value: serumCholesterol, setter: setSerumCholesterol, keyboardType: 'numeric', type: 'text' },
    { key: 'fastingBloodSugar', label: 'Fasting Blood Sugar', value: fastingBloodSugar, setter: setFastingBloodSugar, items: fastingBloodSugarItems, open: openFastingBloodSugar, setOpen: setOpenFastingBloodSugar, type: 'dropdown' },
    { key: 'restingECG', label: 'Resting ECG', value: restingECG, setter: setRestingECG, keyboardType: 'numeric', type: 'text' },
    { key: 'maxHeartRate', label: 'Max Heart Rate', value: maxHeartRate, setter: setMaxHeartRate, keyboardType: 'numeric', type: 'text' },
    { key: 'exerciseInducedAngina', label: 'Exercise Induced Angina', value: exerciseInducedAngina, setter: setExerciseInducedAngina, items: exerciseInducedAnginaItems, open: openExerciseInducedAngina, setOpen: setOpenExerciseInducedAngina, type: 'dropdown' },
    { key: 'stDepression', label: 'ST Depression', value: stDepression, setter: setStDepression, keyboardType: 'numeric', type: 'text' },
    { key: 'stSlope', label: 'Slope of the Peak Exercise ST Segment', value: stSlope, setter: setStSlope, items: stSlopeItems, open: openStSlope, setOpen: setOpenStSlope, type: 'dropdown' },
    { key: 'majorVessels', label: 'Number of Major Vessels Colored by Fluoroscopy', value: majorVessels, setter: setMajorVessels, keyboardType: 'numeric', type: 'text' },
    { key: 'thalassemia', label: 'Thalassemia', value: thalassemia, setter: setThalassemia, items: thalassemiaItems, open: openThalassemia, setOpen: setOpenThalassemia, type: 'dropdown' },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'dropdown') {
      return (
        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <DropDownPicker
            open={item.open}
            value={item.value}
            items={item.items}
            setOpen={item.setOpen}
            setValue={item.setter}
            placeholder={`Select ${item.label}`}
            containerStyle={tw`border border-gray-300`}
            style={tw`z-50 elevation-50 border border-gray-300`}
            dropDownStyle={tw`border border-gray-300`}
          />
        </View>
      );
    } else {
      return (
        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <TextInput
            keyboardType={item.keyboardType}
            placeholder={item.label}
            value={item.value}
            onChangeText={item.setter}
            style={tw`border border-gray-300 p-2`}
          />
        </View>
      );
    }
  };

  const handlePredictPress = () => {
    // Handle prediction logic here
    console.log('Predict button pressed');
    console.log({
      age,
      sex,
      chestPainType,
      restingBP,
      serumCholesterol,
      fastingBloodSugar,
      restingECG,
      maxHeartRate,
      exerciseInducedAngina,
      stDepression,
      stSlope,
      majorVessels,
      thalassemia,
    });
  };

  return (
    <>

    <View style={tw`flex-1 p-4`}>
      <FlatList
        data={formFields}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={tw`pb-4`}
      />
    </View>
      <Button title="Predict" onPress={handlePredictPress} />
    </>
  );
};

export default InputForm;
