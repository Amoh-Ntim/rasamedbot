import React, { useState, useRef } from 'react';
import { FlatList, Text, TextInput, Button, View, Alert } from 'react-native';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';  // Import axios
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Donut from './Donut';
import Mybarchart from './Mybarchart';

const Kidney = () => {
  const [age, setAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [specificGravity, setSpecificGravity] = useState('1.00');
  const [albumin, setAlbumin] = useState('');
  const [bloodGlucoseRandom, setBloodGlucoseRandom] = useState('');
  const [bloodUrea, setBloodUrea] = useState('');
  const [serumCreatinine, setSerumCreatinine] = useState('');
  const [sodium, setSodium] = useState('');
  const [potassium, setPotassium] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [whiteBloodCellCount, setWhiteBloodCellCount] = useState('');
  const [hypertension, setHypertension] = useState(null);
  const [diabetesMellitus, setDiabetesMellitus] = useState(null);
  const [appetite, setAppetite] = useState(null);
  const [redBloodCells, setRedBloodCells] = useState(null);
  const [anemia, setAnemia] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');  // Define state for error handling

  const hypertensionItems = [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ];

  const diabetesMellitusItems = [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ];

  const appetiteItems = [
    { label: 'Poor', value: 0 },
    { label: 'Good', value: 1 },
  ];

  const redBloodCellsItems = [
    { label: 'Normal', value: 0 },
    { label: 'Abnormal', value: 1 },
  ];

  const anemiaItems = [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ];

  const [openHypertension, setOpenHypertension] = useState(false);
  const [openDiabetesMellitus, setOpenDiabetesMellitus] = useState(false);
  const [openAppetite, setOpenAppetite] = useState(false);
  const [openRedBloodCells, setOpenRedBloodCells] = useState(false);
  const [openAnemia, setOpenAnemia] = useState(false);
  const bottomSheetRef = useRef(null);
  const handlePresentSheetPress = () => {
    if (prediction || error) { // Check if prediction or error exists
      bottomSheetRef.current.expand();
    }
  };

  const handlePredictPress = async () => {
    const requestBody = {
      age: age ? parseInt(age) : 0,
      bp: bloodPressure ? parseInt(bloodPressure) : 0,
      sg: specificGravity ? parseFloat(specificGravity) : 1,
      al: albumin ? parseInt(albumin) : 0,
      bgr: bloodGlucoseRandom ? parseInt(bloodGlucoseRandom) : 0,
      bu: bloodUrea ? parseInt(bloodUrea) : 0,
      sc: serumCreatinine ? parseFloat(serumCreatinine) : 0,
      sod: sodium ? parseFloat(sodium) : 0,
      pot: potassium ? parseFloat(potassium) : 0,
      hemo: hemoglobin ? parseFloat(hemoglobin) : 0,
      wc: whiteBloodCellCount ? parseInt(whiteBloodCellCount) : 0,
      htn: hypertension ? parseInt(hypertension) : 0,
      dm: diabetesMellitus ? parseInt(diabetesMellitus) : 0,
      appet: appetite ? parseInt(appetite) : 0,
      rbc: redBloodCells ? parseInt(redBloodCells) : 0,
      ane: anemia ? parseInt(anemia) : 0,
    };

    console.log('Request Body:', requestBody);  // Log the request body

    try {
      const response = await axios.post('http://192.168.217.69:5000/api/predict_kidney_disease', requestBody);

      setPrediction(response.data.prediction);
      setProbability(response.data.probability * 100);
      setExplanation(response.data.explanation);
      console.log('API Response:', response.data);
      setError('');  // Clear any previous errors
    } catch (error) {
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Error:', error);
      setError(error.response?.data?.error || error.message);
      Alert.alert('Error', error.response?.data?.error || error.message);
    }
  };

  const data = [
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric' },
    { key: 'bloodPressure', label: 'Blood Pressure', value: bloodPressure, setter: setBloodPressure, keyboardType: 'numeric' },
    { key: 'specificGravity', label: 'Specific Gravity', value: specificGravity, setter: setSpecificGravity, keyboardType: 'decimal-pad' },
    { key: 'albumin', label: 'Albumin', value: albumin, setter: setAlbumin, keyboardType: 'numeric' },
    { key: 'bloodGlucoseRandom', label: 'Blood Glucose Random', value: bloodGlucoseRandom, setter: setBloodGlucoseRandom, keyboardType: 'numeric' },
    { key: 'bloodUrea', label: 'Blood Urea', value: bloodUrea, setter: setBloodUrea, keyboardType: 'numeric' },
    { key: 'serumCreatinine', label: 'Serum Creatinine', value: serumCreatinine, setter: setSerumCreatinine, keyboardType: 'numeric' },
    { key: 'sodium', label: 'Sodium', value: sodium, setter: setSodium, keyboardType: 'numeric' },
    { key: 'potassium', label: 'Potassium', value: potassium, setter: setPotassium, keyboardType: 'numeric' },
    { key: 'hemoglobin', label: 'Hemoglobin', value: hemoglobin, setter: setHemoglobin, keyboardType: 'numeric' },
    { key: 'whiteBloodCellCount', label: 'White Blood Cell Count', value: whiteBloodCellCount, setter: setWhiteBloodCellCount, keyboardType: 'numeric' },
    { key: 'hypertension', label: 'Hypertension', value: hypertension, setter: setHypertension, items: hypertensionItems, open: openHypertension, setOpen: setOpenHypertension },
    { key: 'diabetesMellitus', label: 'Diabetes Mellitus', value: diabetesMellitus, setter: setDiabetesMellitus, items: diabetesMellitusItems, open: openDiabetesMellitus, setOpen: setOpenDiabetesMellitus },
    { key: 'appetite', label: 'Appetite', value: appetite, setter: setAppetite, items: appetiteItems, open: openAppetite, setOpen: setOpenAppetite },
    { key: 'redBloodCells', label: 'Red Blood Cells', value: redBloodCells, setter: setRedBloodCells, items: redBloodCellsItems, open: openRedBloodCells, setOpen: setOpenRedBloodCells },
    { key: 'anemia', label: 'Anemia', value: anemia, setter: setAnemia, items: anemiaItems, open: openAnemia, setOpen: setOpenAnemia },
  ];

  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress();
  };

  const renderItem = ({ item, index }) => {
    if (item.items) {
      return (
        <View key={item.key} style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <Dropdown
            style={tw`border p-2 border-gray-300 rounded-lg`}
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
            style={tw`border p-2 border-gray-300 rounded-lg`}
            keyboardType={item.keyboardType}
            placeholder={item.label}
            value={item.value}
            onChangeText={item.setter}
          />
        </View>
      );
    }
  }

  return (
    <>
      <View style={tw`flex justify-center items-center`}>
        <Text style={tw`text-black font-bold`}>KIDNEY DISEASE</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={tw`p-4`}
      />
      <View>
        <Button style={tw`mt-4`} title="Predict" onPress = {handleCombinedPress} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['25%', '50%', '80%']}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
        <View style={tw`flex px-2 mt-8`}>
          {prediction ? <Text style={tw`text-2xl font-bold mb-4`}>Prediction: {prediction}</Text> : null}
          {probability ? <Text style={tw`text-2xl font-bold mb-4`}>Probability: {probability} %</Text> : null}
          {explanation ? <Text style={tw`text-xl font-bold`}>Explanation: {explanation}</Text> : null}
        </View>
          <View style={tw`flex justify-center items-center`}>
            <Donut percentage={probability} color="tomato" max={100} />
          </View>
          <View style={tw`flex justify-center items-center`}>
            <Mybarchart />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default Kidney;
