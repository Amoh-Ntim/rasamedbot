import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Donut from './Donut';
import Mybarchart from './Mybarchart';
import axios from 'axios';
import HeartChart from './BarCharts/HeartChart';

const Heart = () => {
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
  const [shap, setShap] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(null);

  const sexItems = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 0 },
  ];

  const chestPainItems = [
    { label: 'Typical Angina', value: 0 },
    { label: 'Atypical Angina', value: 1 },
    { label: 'Non-Anginal Pain', value: 2 },
    { label: 'Asymptotic', value: 3 },
  ];

  const fastingBloodSugarItems = [
    { label: 'False', value: 0 },
    { label: 'True', value: 1 },
  ];

  const exerciseInducedAnginaItems = [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ];

  const stSlopeItems = [
    { label: 'Upsloping', value: 0 },
    { label: 'Flat', value: 1 },
    { label: 'Downsloping', value: 2 },
  ];

  const thalassemiaItems = [
    { label: 'Normal', value: 0 },
    { label: 'Fixed Defect', value: 1 },
    { label: 'Reversible Defect', value: 2 },
  ];

  const formFields = [
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric', type: 'text' },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems, type: 'dropdown' },
    { key: 'chestPainType', label: 'Chest Pain Type', value: chestPainType, setter: setChestPainType, items: chestPainItems, type: 'dropdown' },
    { key: 'restingBP', label: 'Resting Blood Pressure', value: restingBP, setter: setRestingBP, keyboardType: 'numeric', type: 'text' },
    { key: 'serumCholesterol', label: 'Serum Cholesterol', value: serumCholesterol, setter: setSerumCholesterol, keyboardType: 'numeric', type: 'text' },
    { key: 'fastingBloodSugar', label: 'Fasting Blood Sugar', value: fastingBloodSugar, setter: setFastingBloodSugar, items: fastingBloodSugarItems, type: 'dropdown' },
    { key: 'restingECG', label: 'Resting ECG', value: restingECG, setter: setRestingECG, keyboardType: 'numeric', type: 'text' },
    { key: 'maxHeartRate', label: 'Max Heart Rate', value: maxHeartRate, setter: setMaxHeartRate, keyboardType: 'numeric', type: 'text' },
    { key: 'exerciseInducedAngina', label: 'Exercise Induced Angina', value: exerciseInducedAngina, setter: setExerciseInducedAngina, items: exerciseInducedAnginaItems, type: 'dropdown' },
    { key: 'stDepression', label: 'ST Depression', value: stDepression, setter: setStDepression, keyboardType: 'numeric', type: 'text' },
    { key: 'stSlope', label: 'Slope of the Peak Exercise ST Segment', value: stSlope, setter: setStSlope, items: stSlopeItems, type: 'dropdown' },
    { key: 'majorVessels', label: 'Number of Major Vessels Colored by Fluoroscopy', value: majorVessels, setter: setMajorVessels, keyboardType: 'numeric', type: 'text' },
    { key: 'thalassemia', label: 'Thalassemia', value: thalassemia, setter: setThalassemia, items: thalassemiaItems, type: 'dropdown' },
  ];


  const bottomSheetRef = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const handlePresentSheetPress = () => {
    if (prediction || error) {
      bottomSheetRef.current.expand();
    }
  };
  const handlePresentSheetPress2 = () => {
    if (prediction || error) {
      bottomSheetRef2.current.expand();
    }
  };

  const handlePredictPress = async () => {
    const dataToSend = {
      age: age,
      sex: sex,
      cp: chestPainType,
      trestbps: restingBP,
      chol: serumCholesterol,
      fbs: fastingBloodSugar,
      restecg: restingECG,
      thalach: maxHeartRate,
      exang: exerciseInducedAngina,
      oldpeak: stDepression,
      slope: stSlope,
      ca: majorVessels,
      thal: thalassemia,
    };

    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post('http://192.168.117.69:5000/api/predict_heart_disease', dataToSend);

      setPrediction(response.data.prediction);
      setProbability(response.data.probability * 100);
      setExplanation(response.data.explanation);
      setShap(response.data.shap_values)
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('There was an error making the prediction. Please try again later.');
    }

    handlePresentSheetPress();
  };


  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress();
  };

  const handle2Press = () => {
    handlePresentSheetPress2();
  };


  const renderItem = ({ item }) => {
    if (item.type === 'dropdown') {
      return (
        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <Dropdown
            data={item.items}
            labelField="label"
            valueField="value"
            placeholder={`Select ${item.label}`}
            value={item.value}
            onChange={item.setter}
            containerStyle={tw`border border-gray-300`}
            style={tw`border border-red-500 p-2 rounded`}
          />
        </View>
      );
    } else {
      return (
        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <TextInput
            keyboardType={item.keyboardType}
            value={item.value}
            onChangeText={item.setter}
            placeholder={item.label}
            style={tw`border border-red-500 p-2 rounded`}
          />
        </View>
      );
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Text style={tw`text-center text-xl text-red-900 font-bold mb-4 py-4`}>Heart Disease Prediction</Text>
      <ScrollView style={tw`mb-4`}>
        <FlatList
          data={formFields}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          scrollEnabled={false}
        />
      </ScrollView>

     {/* predict button */}
     <TouchableOpacity 
       style={tw`mt-4 bg-red-800 py-2 px-4 rounded-lg`} 
       onPress={handleCombinedPress}
      >
        <Text style={tw`text-white font-bold text-center`}>Tap twice to Predict</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['25%', '50%', '100%']}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
        <View style={tw`flex px-2 mt-8`}>
          {prediction ? <Text style={tw`text-2xl font-bold mb-4`}>Prediction: {prediction}</Text> : null}
          {probability ? <Text style={tw`text-2xl font-bold mb-4`}>Probability: {probability} %</Text> : null}
          {explanation ? <Text style={tw`text-xl font-bold`}>Explanation: {explanation}</Text> : null}
          {shap && typeof shap === 'object' ? (
         <View style={tw`mt-4`}>
           <Text style={tw`text-xl font-bold mb-2`}>SHAP Values:</Text>
           {Object.keys(shap).map((key) => (
             <Text key={key} style={tw`text-lg text-black`}>
               {key}: {shap[key]}
             </Text>
           ))}
         </View>
       ) : null}
        </View>
          <View style={tw`flex justify-center items-center`}>
            <Donut percentage={probability} color="tomato" max={100} />
          </View>
          <View style={tw`flex justify-center items-center`}>
          </View>
          <TouchableOpacity 
          style={tw`mt-4 bg-red-700 py-2 px-4 mx-4 rounded-lg`} 
          onPress={handle2Press}
          >
         <Text style={tw`text-white font-bold text-center text-lg`}>Show Graph</Text>
         </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

      {/* 2nd bottomsheet for graph */}
      <BottomSheet
        ref={bottomSheetRef2}
        index={0}
        snapPoints={['25%', '50%', '80%','100%']}
        enablePanDownToClose={true}
      >
      <BottomSheetView style={tw`flex mt-46`}>
      <View style={tw``}>
          <HeartChart shap={shap} />
      </View>
      </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Heart;
