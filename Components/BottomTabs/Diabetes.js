import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, View, DatePicker } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';

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

  // ... dropdown items and states for dropdowns

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


  const handlePredictPress = () => {
    // Handle prediction logic here
    console.log('Predict button pressed');
    console.log({
      bmi,
      age,
      generalHealth,
      income,
      mentalHealthData,
      physicalHealthData,
      educationalLevel,
      sex,
      highCholesterol,
      heavyAlcoholConsumption,
    });
  };

  return (
    <>
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={tw`text-black mb-2`}>BMI</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="BMI"
        value={bmi}
        onChangeText={setBmi}
      />

      <Text style={tw`text-black mb-2`}>Age</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />

      <Text style={tw`text-black mb-2`}>General Health</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="General Health (1-5)"
        value={generalHealth}
        onChangeText={setGeneralHealth}
      />

      <Text style={tw`text-black mb-2`}>Income</Text>
      <DropDownPicker
      open={income}
      value={income}
      items={incomeItems}
      setOpen={setOpenIncome}
      setValue={setIncome}
      setItems={setIncomeItems}
      placeholder="Select Income"
        // ... dropdown props for income
        
      />

      <Text style={tw`text-black mb-2`}>Mental Health</Text>
      <DatePicker
        // ... date picker props
        onDateChange={(date) => {
          // Set the date for mental health input
        }}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="Mental Health Score (1-10)"
        // ... other props
        onChangeText={(score) => {
          handleMentalHealthChange(selectedDate, score);
        }}
      />

      <Text style={tw`text-black mb-2`}>Physical Health</Text>
      {/* Similar setup for physical health */}

      <Text style={tw`text-black mb-2`}>Educational Level</Text>
      <DropDownPicker
        // ... dropdown props for educational level
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

        // ... dropdown props for sex
      />

      <Text style={tw`text-black mb-2`}>High Cholesterol</Text>
      <DropDownPicker
      open={openHighCholesterol}
  value={highCholesterol}
  items={highCholesterolItems}
  setOpen={setOpenHighCholesterol}
  setValue={setHighCholesterol}
  setItems={setHighCholesterolItems}
  placeholder="Select High Cholesterol"
        // ... dropdown props for high cholesterol (yes/no)
      />

      <Text style={tw`text-black mb-2`}>Heavy Alcohol Consumption</Text>
      <DropDownPicker
      open={openHeavyAlcoholConsumption}
  value={heavyAlcoholConsumption}
  items={heavyAlcoholConsumptionItems}
  setOpen={setOpenHeavyAlcoholConsumption}
  setValue={setHeavyAlcoholConsumption}
  setItems={setHeavyAlcoholConsumptionItems}
  placeholder="Select Heavy Alcohol Consumption"
        // ... dropdown props for heavy alcohol consumption (yes/no)
      />

    </ScrollView>
      <Button title="Predict" onPress={handlePredictPress} />

    </>
  );
};

export default Diabetes;
