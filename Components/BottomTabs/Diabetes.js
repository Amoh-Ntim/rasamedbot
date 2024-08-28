import React, { useState,useRef } from 'react';
import { FlatList, Text, TextInput, Button, View, Alert } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import Donut from './Donut';
import Mybarchart from './Mybarchart';


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
  const [error, setError] = useState(''); 

  const [openIncome, setOpenIncome] = useState(false);
  const [openEducationalLevel, setOpenEducationalLevel] = useState(false);
  const [openSex, setOpenSex] = useState(false);
  const [openHighCholesterol, setOpenHighCholesterol] = useState(false);
  const [openHeavyAlcoholConsumption, setOpenHeavyAlcoholConsumption] = useState(false);
  const [openGeneralHealth, setOpenGeneralHealth] = useState(false); // New state for general health dropdown

  

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
    { label: 'Grade 12 or GED (High school graduate)', value: 4},
    { label: 'College 1 year to 3 years(Some college or technical school', value: 5 },
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
    { label: 'No', value: 0},
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
  const handlePresentSheetPress = () => {
    if (prediction || error) { // Check if prediction or error exists
      bottomSheetRef.current.expand();
    }
  };

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
      const response = await axios.post('http://192.168.166.69:5000/api/predict_diabetes', dataToSend);
      
      setPrediction(response.data.predicted_class);
      setProbability(response.data.probability * 100);
  
      // alert(`Prediction: ${response.data.predicted_class}\nProbability: ${response.data.probability}`);
  
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('There was an error making the prediction. Please try again later.');
    }
  };

  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress(); // Add the second function here
  };

  const data = [
    { key: 'bmi', label: 'BMI', value: bmi, setter: setBmi, keyboardType: 'numeric' },
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric' },
    { key: 'generalHealth', label: 'General Health', value: generalHealth, setter: setGeneralHealth, items: generalHealthItems, open: openGeneralHealth, setOpen: setOpenGeneralHealth },
    { key: 'mentalHealth', label: 'Mental Health (Days)', value: mentalHealth, setter: handleMentalHealthChange, keyboardType: 'numeric' },
    { key: 'physicalHealth', label: 'Physical Health (Days)', value: physicalHealth, setter: handlePhysicalHealthChange, keyboardType: 'numeric' },
    { key: 'income', label: 'Income', value: income, setter: setIncome, items: incomeItems, open: openIncome, setOpen: setOpenIncome },
    { key: 'educationalLevel', label: 'Educational Level', value: educationalLevel, setter: setEducationalLevel, items: educationalLevelItems, open: openEducationalLevel, setOpen: setOpenEducationalLevel },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems, open: openSex, setOpen: setOpenSex },
    { key: 'highCholesterol', label: 'High Cholesterol', value: highCholesterol, setter: setHighCholesterol, items: highCholesterolItems, open: openHighCholesterol, setOpen: setOpenHighCholesterol },
    { key: 'heavyAlcoholConsumption', label: 'Heavy Alcohol Consumption', value: heavyAlcoholConsumption, setter: setHeavyAlcoholConsumption, items: heavyAlcoholConsumptionItems, open: openHeavyAlcoholConsumption, setOpen: setOpenHeavyAlcoholConsumption },
  ];

  const renderItem = ({ item, index }) => {
    const zIndex = data.length - index;
    if (item.items) {
      return (
        <View key={item.key} style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <DropDownPicker
            open={item.open}
            value={item.value}
            items={item.items}
            setOpen={item.setOpen}
            setValue={item.setter}
            placeholder={`Select ${item.label}`}
            containerStyle={{ zIndex }}
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
          />
        </View>
      );
    }
  };

  const dataa = [{
    percentage: 8,
    color: 'tomato',
    max: 10
  }, {
    percentage: 14,
    color: 'skyblue',
    max: 20
  }, {
    percentage: 92,
    color: 'gold',
    max: 100
  }, {
    percentage: 240,
    color: '#222',
    max: 500
  }]

  return (
    <>
      <View style={tw`flex justify-center items-center`}>
        <Text style={tw`text-black font-bold`}>DIABETES PREDICTION</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={tw`p-4`}
      />
      <Button style={tw`mt-4`} title="Predict" onPress={handleCombinedPress} />
      <BottomSheet
           ref={bottomSheetRef}
           index={0}
           snapPoints={['25%', '50%' ,'80%', ]}
           enablePanDownToClose={true}
           >
           <BottomSheetView>
           {prediction ? <Text>Prediction: {prediction}</Text> : null}
           {probability ? <Text>Probability: {probability} %</Text> : null}

           {error ? <Text style={tw`text-red-500`}>Error: {error}</Text> : null}
           <View style={tw`flex justify-center items-center`}>
            <Donut percentage={probability} color="tomato" max={100} />
           </View>
           <View style={tw`flex justify-center items-center`}>
            <Mybarchart/>
           </View>
           </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default Diabetes;
