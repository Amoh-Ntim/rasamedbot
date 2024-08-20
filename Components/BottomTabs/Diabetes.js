import React, { useState } from 'react';
import { FlatList, Text, TextInput, Button, View } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const Diabetes = () => {
  const [bmi, setBmi] = useState('');
  const [age, setAge] = useState('');
  const [generalHealth, setGeneralHealth] = useState('');
  const [income, setIncome] = useState(null);
  const [mentalHealthData, setMentalHealthData] = useState({});
  const [physicalHealthData, setPhysicalHealthData] = useState({});
  const [educationalLevel, setEducationalLevel] = useState(null);
  const [sex, setSex] = useState(null);
  const [highCholesterol, setHighCholesterol] = useState(null);
  const [heavyAlcoholConsumption, setHeavyAlcoholConsumption] = useState(null);

  const [openIncome, setOpenIncome] = useState(false);
  const [openEducationalLevel, setOpenEducationalLevel] = useState(false);
  const [openSex, setOpenSex] = useState(false);
  const [openHighCholesterol, setOpenHighCholesterol] = useState(false);
  const [openHeavyAlcoholConsumption, setOpenHeavyAlcoholConsumption] = useState(false);

  const incomeItems = [
    { label: '<$10,000', value: '0' },
    { label: '$10,000 - $15,000', value: '1' },
    // ... other income ranges
  ];

  const educationalLevelItems = [
    { label: 'Never attended school or only kindergarten', value: '0' },
    { label: 'Grade 1 through 8 (elementary)', value: '1' },
    // ... other educational levels
  ];

  const sexItems = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const highCholesterolItems = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const heavyAlcoholConsumptionItems = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const handleMentalHealthChange = (date, score) => {
    if (score < 1 || score > 10) {
      // Handle invalid input, e.g., show an error message
      return;
    }
    setMentalHealthData({ ...mentalHealthData, [date.toISOString()]: score });
  };

  const handlePhysicalHealthChange = (date, score) => {
    if (score < 1 || score > 10) {
      // Handle invalid input, e.g., show an error message
      return;
    }
    setPhysicalHealthData({ ...physicalHealthData, [date.toISOString()]: score });
  };

  const handlePredictPress = async () => {
    // Structure the data to match the expected keys in your Flask API
    const dataToSend = {
      bmi: bmi,
      age: age,
      general_health: generalHealth,
      income: income,
      mental_health_data: mentalHealthData,
      physical_health_data: physicalHealthData,
      educational_level: educationalLevel,
      sex: sex,
      high_cholesterol: highCholesterol,
      heavy_alcohol_consumption: heavyAlcoholConsumption,
    };
  
    console.log('Data to send:', dataToSend);
  
    try {
      // Send POST request to Flask API
      const response = await axios.post('/predict_diabetes', dataToSend);
      
      // Handle the response from the API
      const { prediction, probability } = response.data;
      console.log('Prediction:', prediction);
      console.log('Probability:', probability);
  
      // You can display the prediction and probability to the user or handle it as needed
      alert(`Prediction: ${prediction}\nProbability: ${probability}`);
  
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('There was an error making the prediction. Please try again later.');
    }
  };

  const data = [
    { key: 'bmi', label: 'BMI', value: bmi, setter: setBmi, keyboardType: 'numeric' },
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric' },
    { key: 'generalHealth', label: 'General Health', value: generalHealth, setter: setGeneralHealth, keyboardType: 'numeric' },
    { key: 'income', label: 'Income', value: income, setter: setIncome, items: incomeItems, open: openIncome, setOpen: setOpenIncome },
    { key: 'educationalLevel', label: 'Educational Level', value: educationalLevel, setter: setEducationalLevel, items: educationalLevelItems, open: openEducationalLevel, setOpen: setOpenEducationalLevel },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems, open: openSex, setOpen: setOpenSex },
    { key: 'highCholesterol', label: 'High Cholesterol', value: highCholesterol, setter: setHighCholesterol, items: highCholesterolItems, open: openHighCholesterol, setOpen: setOpenHighCholesterol },
    { key: 'heavyAlcoholConsumption', label: 'Heavy Alcohol Consumption', value: heavyAlcoholConsumption, setter: setHeavyAlcoholConsumption, items: heavyAlcoholConsumptionItems, open: openHeavyAlcoholConsumption, setOpen: setOpenHeavyAlcoholConsumption },
    // Add entries for Mental Health and Physical Health if needed
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
            // zIndex={zIndex}
            // containerStyle={{ zIndex }}
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
      <Button style={tw`mt-4`} title="Predict" onPress={handlePredictPress} />
    </>
  );
};

export default Diabetes;
