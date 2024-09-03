import React, { useState, useRef } from 'react';
import { FlatList, Text, TextInput, Button, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Donut from './Donut';
import DiabetesChart from './BarCharts/DiabetesChart';

const Diabetes = () => {
  const [bmi, setBmi] = useState('');
  const [age, setAge] = useState('');
  const [generalHealth, setGeneralHealth] = useState(null);
  const [income, setIncome] = useState(null);
  const [mentalHealth, setMentalHealth] = useState('');
  const [physicalHealth, setPhysicalHealth] = useState('');
  const [educationalLevel, setEducationalLevel] = useState(null);
  const [sex, setSex] = useState(null);
  const [highCholesterol, setHighCholesterol] = useState(null);
  const [heavyAlcoholConsumption, setHeavyAlcoholConsumption] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState('');
  const [explanation, setExplanation] = useState('');
  const [shap, setShap] = useState('');
  const [error, setError] = useState('');

  const incomeItems = [
    { label: '<$10,000', value: 1 },
    { label: '$10,000 - $15,000', value: 2 },
    { label: '$15,000 - $20,000', value: 3 },
    { label: '$20,000 - $25,000', value: 4 },
    { label: '$25,000 - $35,000', value: 5 },
    { label: '$35,000 - $50,000', value: 6 },
    { label: '$50,000 - $75,000', value: 7 },
    { label: '>$75,000', value: 8 },
  ];

  const educationalLevelItems = [
    { label: 'Never attended school or only kindergarten', value: 1 },
    { label: 'Grade 1 through 8 (elementary)', value: 2 },
    { label: 'Grade 9 through 11 (Some high school)', value: 3 },
    { label: 'Grade 12 or GED (High school graduate)', value: 4 },
    { label: 'College 1 year to 3 years (Some college or technical school)', value: 5 },
    { label: 'College 4 years or more (College graduate)', value: 6 },
  ];

  const sexItems = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 0 },
  ];

  const highCholesterolItems = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

  const heavyAlcoholConsumptionItems = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

  const generalHealthItems = [
    { label: 'Excellent', value: 1 },
    { label: 'Very Good', value: 2 },
    { label: 'Good', value: 3 },
    { label: 'Fair', value: 4 },
    { label: 'Poor', value: 5 },
  ];

  const handleMentalHealthChange = (value) => {
    if (value < 0 || value > 30) {
      Alert.alert('Invalid Input', 'Please enter a value between 0 and 30 for Mental Health.');
      return;
    }
    setMentalHealth(value);
  };

  const handlePhysicalHealthChange = (value) => {
    if (value < 0 || value > 30) {
      Alert.alert('Invalid Input', 'Please enter a value between 0 and 30 for Physical Health.');
      return;
    }
    setPhysicalHealth(value);
  };

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
  // const handlePresentSheetPressTwo = () => {
  //   if (prediction || error) {
  //     bottomSheetRef.current.expand();
  //   }
  // };
  const handlePredictPress = async () => {
    const dataToSend = {
      BMI: bmi,
      Age: age,
      GenHlth: generalHealth,
      Income: income,
      MentHlth: mentalHealth,
      PhysHlth: physicalHealth,
      Education: educationalLevel,
      Sex: sex,
      HighChol: highCholesterol,
      HvyAlcoholConsump: heavyAlcoholConsumption,
    };

    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post('http://192.168.117.69:5000/api/predict_diabetes', dataToSend);

      setPrediction(response.data.prediction);
      setProbability(response.data.probability * 100);
      setExplanation(response.data.explanation);
      setShap(response.data.shap_values);


    } catch (error) {
      console.error('Error making prediction:', error);
      alert('There was an error making the prediction. Please try again later.');
    }
  };

  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress();
  };

  const handle2Press = () => {
    handlePresentSheetPress2();
  };

  const data = [
    { key: 'bmi', label: 'BMI', value: bmi, setter: setBmi, keyboardType: 'numeric' },
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric' },
    { key: 'generalHealth', label: 'General Health', value: generalHealth, setter: setGeneralHealth, items: generalHealthItems },
    { key: 'mentalHealth', label: 'Mental Health (Days)', value: mentalHealth, setter: handleMentalHealthChange, keyboardType: 'numeric' },
    { key: 'physicalHealth', label: 'Physical Health (Days)', value: physicalHealth, setter: handlePhysicalHealthChange, keyboardType: 'numeric' },
    { key: 'income', label: 'Income', value: income, setter: setIncome, items: incomeItems },
    { key: 'educationalLevel', label: 'Educational Level', value: educationalLevel, setter: setEducationalLevel, items: educationalLevelItems },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems },
    { key: 'highCholesterol', label: 'High Cholesterol', value: highCholesterol, setter: setHighCholesterol, items: highCholesterolItems },
    { key: 'heavyAlcoholConsumption', label: 'Heavy Alcohol Consumption', value: heavyAlcoholConsumption, setter: setHeavyAlcoholConsumption, items: heavyAlcoholConsumptionItems },
  ];

  const renderItem = ({ item }) => {
    if (item.items) {
      return (
        <View key={item.key} style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <Dropdown
            style={tw`border p-2 border-yellow-500`}
            data={item.items}
            labelField="label"
            valueField="value"
            placeholder={`Select ${item.label}`}
            value={item.value}
            onChange={(value) => item.setter(value.value)}
          />
        </View>
      );
    } else {
      return (
        <View key={item.key} style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <TextInput
            keyboardType={item.keyboardType}
            placeholder={item.label}
            value={item.value}
            onChangeText={item.setter}
            style={tw`border p-2 border-yellow-500`}
          />
        </View>
      );
    }
  };

  

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <View style={tw`flex justify-center items-center p-4`}>
        <Text style={tw`text-black text-lg text-yellow-900 font-bold`}>DIABETES PREDICTION</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={tw``}
      />
      {/* predict button */}
      <TouchableOpacity 
       style={tw`mt-4 bg-yellow-800 py-2 px-4 rounded-lg`} 
       onPress={handleCombinedPress}
      >
        <Text style={tw`text-white font-bold text-center`}>Tap twice to Predict</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['25%', '50%', '80%','95%']}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={tw`flex-1`}>
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

          {error ? <Text style={tw`text-red-500`}>Error: {error}</Text> : null}
          <View style={tw`flex justify-center items-center mt-4`}>
            <Donut percentage={probability} color="tomato" max={100} />
          </View>
          <TouchableOpacity 
          style={tw`mt-4 bg-yellow-700 py-2 px-4 mx-4 rounded-lg`} 
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
          <DiabetesChart shap={shap} />
      </View>
      </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Diabetes;
