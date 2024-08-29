import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, Button } from 'react-native';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Donut from './Donut';
import Mybarchart from './Mybarchart';

const Liver = () => {
  const [age, setAge] = useState('');
  const [totalBilirubin, setTotalBilirubin] = useState('');
  const [directBilirubin, setDirectBilirubin] = useState('');
  const [alkalinePhosphotase, setAlkalinePhosphotase] = useState('');
  const [alamineAminotransferase, setAlamineAminotransferase] = useState('');
  const [aspartateAminotransferase, setAspartateAminotransferase] = useState('');
  const [totalProteins, setTotalProteins] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [albuminGlobulinRatio, setAlbuminGlobulinRatio] = useState('');
  const [sex, setSex] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState('');
  const [error, setError] = useState('');

  const sexItems = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 0 },
  ];

  const bottomSheetRef = useRef(null);
  const handlePresentSheetPress = () => {
    if (prediction || error) {
      bottomSheetRef.current.expand();
    }
  };

  const handlePredictPress = async () => {
    const dataToSend = {
      Age: age,
      Total_Bilirubin: totalBilirubin,
      Direct_Bilirubin: directBilirubin,
      Alkaline_Phosphotase: alkalinePhosphotase,
      Alamine_Aminotransferase: alamineAminotransferase,
      Aspartate_Aminotransferase: aspartateAminotransferase,
      Total_Proteins: totalProteins,
      Albumin: albumin,
      Albumin_and_Globulin_Ratio: albuminGlobulinRatio,
      Gender: sex,
    };

    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post('http://192.168.78.69:5000/api/predict_liver', dataToSend);
      
      setPrediction(response.data.predictions);
      setProbability(response.data.probabilities * 100);
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('There was an error making the prediction. Please try again later.');
    }
  };

  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress();
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView style={tw`px-4 py-8`}>
          <Text style={tw`text-center text-xl font-bold mb-4`}>Liver Disease Prediction</Text>

          <Text style={tw`text-base mb-2`}>Age:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Total Bilirubin:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Total Bilirubin"
            value={totalBilirubin}
            onChangeText={setTotalBilirubin}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Direct Bilirubin:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Direct Bilirubin"
            value={directBilirubin}
            onChangeText={setDirectBilirubin}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Alkaline Phosphotase:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Alkaline Phosphotase"
            value={alkalinePhosphotase}
            onChangeText={setAlkalinePhosphotase}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Alamine Aminotransferase:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Alamine Aminotransferase"
            value={alamineAminotransferase}
            onChangeText={setAlamineAminotransferase}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Aspartate Aminotransferase:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Aspartate Aminotransferase"
            value={aspartateAminotransferase}
            onChangeText={setAspartateAminotransferase}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Total Proteins:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Total Proteins"
            value={totalProteins}
            onChangeText={setTotalProteins}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Albumin:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Albumin"
            value={albumin}
            onChangeText={setAlbumin}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Albumin and Globulin Ratio:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Albumin and Globulin Ratio"
            value={albuminGlobulinRatio}
            onChangeText={setAlbuminGlobulinRatio}
            style={tw`border p-2 mb-4 border-gray-300`}
          />

          <Text style={tw`text-base mb-2`}>Sex:</Text>
          <Dropdown
            style={tw`border p-2 mb-4 border-gray-300`}
            data={sexItems}
            labelField="label"
            valueField="value"
            placeholder="Select Sex"
            value={sex}
            onChange={(value) => setSex(value.value)}
          />

          <Button title="Predict" onPress={handleCombinedPress} />
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['25%', '50%', '80%']}
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
            <Mybarchart />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default Liver;
