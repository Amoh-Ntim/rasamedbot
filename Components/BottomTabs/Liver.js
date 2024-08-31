import React, { useState, useRef } from 'react';
import { FlatList, Text, TextInput, Button, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Donut from './Donut';
import LiverChart from './BarCharts/LiverChart';

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
  const [explanation, setExplanation] = useState('');
  const [shap, setShap] = useState('');
  const [error, setError] = useState('');

  const sexItems = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 0 },
  ];

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
      const response = await axios.post('http://192.168.217.69:5000/api/predict_liver_disease', dataToSend);

      setPrediction(response.data.prediction);
      setProbability(response.data.probability * 100);
      setExplanation(response.data.explanation);
      setShap(response.data.shap_values);
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('There was an error making the prediction. Please try again later.');
    }
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

  const handleCombinedPress = () => {
    handlePredictPress();
    handlePresentSheetPress();
  };

  const handle2Press = () => {
    handlePresentSheetPress2();
  };

  const data = [
    { key: 'age', label: 'Age', value: age, setter: setAge, keyboardType: 'numeric' },
    { key: 'totalBilirubin', label: 'Total Bilirubin', value: totalBilirubin, setter: setTotalBilirubin, keyboardType: 'numeric' },
    { key: 'directBilirubin', label: 'Direct Bilirubin', value: directBilirubin, setter: setDirectBilirubin, keyboardType: 'numeric' },
    { key: 'alkalinePhosphotase', label: 'Alkaline Phosphotase', value: alkalinePhosphotase, setter: setAlkalinePhosphotase, keyboardType: 'numeric' },
    { key: 'alamineAminotransferase', label: 'Alamine Aminotransferase', value: alamineAminotransferase, setter: setAlamineAminotransferase, keyboardType: 'numeric' },
    { key: 'aspartateAminotransferase', label: 'Aspartate Aminotransferase', value: aspartateAminotransferase, setter: setAspartateAminotransferase, keyboardType: 'numeric' },
    { key: 'totalProteins', label: 'Total Proteins', value: totalProteins, setter: setTotalProteins, keyboardType: 'numeric' },
    { key: 'albumin', label: 'Albumin', value: albumin, setter: setAlbumin, keyboardType: 'numeric' },
    { key: 'albuminGlobulinRatio', label: 'Albumin and Globulin Ratio', value: albuminGlobulinRatio, setter: setAlbuminGlobulinRatio, keyboardType: 'numeric' },
    { key: 'sex', label: 'Sex', value: sex, setter: setSex, items: sexItems },
  ];

  const renderItem = ({ item }) => {
    if (item.items) {
      return (
        <View key={item.key} style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>{item.label}</Text>
          <Dropdown
            style={tw`border p-2 border-green-400`}
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
            style={tw`border p-2 border-green-400`}
          />
        </View>
      );
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <View style={tw`flex justify-center items-center p-4`}>
        <Text style={tw`text-black font-bold`}>LIVER DISEASE PREDICTION</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={tw``}
      />
      {/* predict button */}
      <TouchableOpacity 
       style={tw`mt-4 bg-green-800 py-2 px-4 rounded-lg`} 
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
          <Button style={tw`mt-4`} title="Show graph" onPress={handle2Press} />
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
          <LiverChart shap={shap} />
      </View>
      </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Liver;
