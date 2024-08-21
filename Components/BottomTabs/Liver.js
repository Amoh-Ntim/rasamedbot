import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';

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

  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
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

  const handlePredictPress = () => {
    // Handle prediction logic here
    console.log('Predict button pressed');
    console.log({
      age,
      gender: genderValue,
      totalBilirubin,
      directBilirubin,
      alkanePhosphatase,
      alanineAminotransferase,
      aspartateAminotransferase,
      totalProteins,
      albumin,
      albuminGlobulinRatio,
    });
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
        <Button title="Predict" onPress={handlePredictPress} />
      </View>
    </SafeAreaView>
  );
};

export default Liver;
