import React, { useState,useRef  } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Donut from './Donut';
import Mybarchart from './Mybarchart';

const Liver = () => {
  const [openGender, setOpenGender] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [age, setAge] = useState('');
  const [totalBilirubin, setTotalBilirubin] = useState('');
  const [directBilirubin, setDirectBilirubin] = useState('');
  const [alkanePhosphatase, setAlkanePhosphatase] = useState('');
  const [alanineAminotransferase, setAlanineAminotransferase] = useState('');
  const [aspartateAminotransferase, setAspartateAminotransferase] = useState('');
  const [totalProteins, setTotalProteins] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [albuminGlobulinRatio, setAlbuminGlobulinRatio] = useState('');
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState('');
  const [error, setError] = useState('');  // Define state for error handling

  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 1 },
    { label: 'Female', value: 0 },
  ]);

  const formFields = [
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric', type: 'text' },
    { key: 'gender', label: 'Gender', value: genderValue, setter: setGenderValue, items: genderItems, open: openGender, setOpen: setOpenGender, type: 'dropdown' },
    { key: 'totalBilirubin', label: 'Total Bilirubin', value: totalBilirubin, setter: setTotalBilirubin, keyboardType: 'decimal-pad', type: 'text' },
    { key: 'directBilirubin', label: 'Direct Bilirubin', value: directBilirubin, setter: setDirectBilirubin, keyboardType: 'decimal-pad', type: 'text' },
    { key: 'alkanePhosphatase', label: 'Alkane Phosphatase', value: alkanePhosphatase, setter: setAlkanePhosphatase, keyboardType: 'numeric', type: 'text' },
    { key: 'alanineAminotransferase', label: 'Alanine Aminotransferase', value: alanineAminotransferase, setter: setAlanineAminotransferase, keyboardType: 'numeric', type: 'text' },
    { key: 'aspartateAminotransferase', label: 'Aspartate Aminotransferase', value: aspartateAminotransferase, setter: setAspartateAminotransferase, keyboardType: 'numeric', type: 'text' },
    { key: 'totalProteins', label: 'Total Proteins', value: totalProteins, setter: setTotalProteins, keyboardType: 'decimal-pad', type: 'text' },
    { key: 'albumin', label: 'Albumin', value: albumin, setter: setAlbumin, keyboardType: 'decimal-pad', type: 'text' },
    { key: 'albuminGlobulinRatio', label: 'Albumin and Globulin Ratio', value: albuminGlobulinRatio, setter: setAlbuminGlobulinRatio, keyboardType: 'decimal-pad', type: 'text' },
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
            // style={{ backgroundColor: '#fafafa' }}
        dropDownContainerStyle={{
          backgroundColor: '#fafafa',
          zIndex: 1000, // Ensure the dropdown appears above other components
          elevation: 1000, // For Android
        }}
        zIndex={1000} // Ensure the dropdown appears above other components
        zIndexInverse={3000} // Ensure the dropdown appears above other components
          />
        </View>
      );
    } else {
      return (
        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <TextInput
            keyboardType={item.keyboardType}
            placeholder={`Enter ${item.label}`}
            value={item.value}
            onChangeText={item.setter}
            style={tw`border border-gray-300 p-2`}
          />
        </View>
      );
    }
  };

  const handlePredictPress = async () => {
    const requestBody = {
      Age: age,  // Assuming 'age' is a variable in your component
  Gender: genderValue,  // Assuming 'genderValue' is defined somewhere in your component
  Total_Bilirubin: totalBilirubin,  // Assuming 'totalBilirubin' is a state or variable
  Direct_Bilirubin: directBilirubin,  // Assuming 'directBilirubin' is a state or variable
  Alkaline_Phosphotase: alkanePhosphatase,  // Assuming 'alkanePhosphatase' is a state or variable
  Alamine_Aminotransferase: alanineAminotransferase,  // Assuming 'alanineAminotransferase' is a state or variable
  Aspartate_Aminotransferase: aspartateAminotransferase,  // Assuming 'aspartateAminotransferase' is a state or variable
  Total_Protiens: totalProteins,  // Assuming 'totalProteins' is a state or variable
  Albumin: albumin,  // Assuming 'albumin' is a state or variable
  Albumin_and_Globulin_Ratio: albuminGlobulinRatio,  // Assuming 'albuminGlobulinRatio' is a state or variable

    };

    console.log('Request Body:', requestBody);  // Log the request body

    try {
      const response = await axios.post('http://192.168.202.69:5000/api/predict_liver_disease', requestBody);

      setPrediction(response.data.predicted_class);
      setProbability(response.data.probability);
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
  const bottomSheetRef = useRef(null);
  const handlePresentSheetPress = () => {
    if (prediction || error) { // Check if prediction or error exists
      bottomSheetRef.current.expand();
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex justify-center items-center p-4`}>
        <Text style={tw`font-bold text-xl`}>LIVER DISEASE PREDICTION</Text>
      </View>
      <View style={tw`flex-1 p-4`}>
        <FlatList
          data={formFields}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
      <View style={tw`p-4`}>
        <Button title="Predict" onPress={() => {
        handlePresentSheetPress();
        handlePredictPress();
        }} />
      </View>
      <BottomSheet
           ref={bottomSheetRef}
           index={0}
           snapPoints={['25%', '50%' ,'80%', ]}
           enablePanDownToClose={true}
           >
           <BottomSheetView>
           {prediction ? <Text>Prediction: {prediction}</Text> : null}
           {probability ? <Text>Probability: {probability}</Text> : null}
           {error ? <Text style={tw`text-red-500`}>Error: {error}</Text> : null}
           <View style={tw`flex justify-center items-center`}>
            <Donut percentage={probability} color="tomato" max={100} />
           </View>
           <View style={tw`flex justify-center items-center`}>
            <Mybarchart/>
           </View>
           </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Liver;
