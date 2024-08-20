import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
// const styles = StyleSheet.create({
//   dropdownContainer: {
//     zIndex: 10, // Ensure dropdown is above other elements
//     position: 'absolute', // Position dropdown absolutely
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
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
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={tw`text-black mb-2`}>Age</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="numeric"
        placeholder="0"
        value={age}
        onChangeText={setAge}
      />

      <Text style={tw`text-black mb-2`}>Sex</Text>
      
      <DropDownPicker
        open={openSex}
        value={sex}
        items={sexItems}
        setOpen={setOpenSex}
        setValue={setSex}
        setItems={setSexItems}
        placeholder="Select Sex"
      />

      <Text style={tw`text-black mb-2`}>Chest Pain Type</Text>
      <DropDownPicker
        open={openChestPain}
        value={chestPainType}
        items={chestPainItems}
        setOpen={setOpenChestPain}
        setValue={setChestPainType}
        setItems={setChestPainItems}
        placeholder="Select Chest Pain Type"
      />

      {/* ... other inputs and dropdowns */}

      <Text style={tw`text-black mb-2`}>Fasting Blood Sugar</Text>
      <DropDownPicker
        open={openFastingBloodSugar}
        value={fastingBloodSugar}
        items={fastingBloodSugarItems}
        setOpen={setOpenFastingBloodSugar}
        setValue={setFastingBloodSugar}
        setItems={setFastingBloodSugarItems}
        placeholder="Select Fasting Blood Sugar"
      />

      <Text style={tw`text-black mb-2`}>Exercise Induced Angina</Text>
      <View>
      <DropDownPicker
        open={openExerciseInducedAngina}
        value={exerciseInducedAngina}
        items={exerciseInducedAnginaItems}
        setOpen={setOpenExerciseInducedAngina}
        setValue={setExerciseInducedAngina}
        setItems={setExerciseInducedAnginaItems}
        placeholder="Select Exercise Induced Angina"
      />
      </View>

      <Text style={tw`text-black mb-2`}>Slope of the Peak Exercise ST Segment</Text>
      <DropDownPicker
        open={openStSlope}
        value={stSlope}
        items={stSlopeItems}
        setOpen={setOpenStSlope}
        setValue={setStSlope}
        setItems={setStSlopeItems}
        placeholder="Select ST Slope"
      />

      <Text style={tw`text-black mb-2`}>Thalassemia</Text>
      <DropDownPicker
        open={openThalassemia}
        value={thalassemia}
        items={thalassemiaItems}
        setOpen={setOpenThalassemia}
        setValue={setThalassemia}
        setItems={setThalassemiaItems}
        placeholder="Select Thalassemia"
      />

    </ScrollView>
      <Button title="Predict" onPress={handlePredictPress} />
      </>
  );
};

export default InputForm;
