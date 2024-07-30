import React, { useState } from 'react';
import { View, ScrollView,Text, SafeAreaView, TextInput, Button } from 'react-native';
import tw from 'twrnc';
import DropdownPicker from 'react-native-dropdown-picker';

const InputForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [age, setAge] = useState('');
  const [genderItems, setGenderItems] = useState( [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]);
  const [totalBilirubin, setTotalBilirubin] = useState('');
  const [directBilirubin, setDirectBilirubin] = useState('');
  const [alkanePhosphatase, setAlkanePhosphatase] = useState('');
  const [alanineAminotransferase, setAlanineAminotransferase] = useState('');
  const [aspartateAminotransferase, setAspartateAminotransferase] = useState('');
  const [totalProteins, setTotalProteins] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [albuminGlobulinRatio, setAlbuminGlobulinRatio] = useState('');

  const handlePredictPress = () => {
    // Handle prediction logic here
    console.log('Predict button pressed');
    console.log({
      age,
      gender: value,
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
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <SafeAreaView style={tw`flex-1`}>
    <View style={tw`flex justify-center items-center`}>
     <Text style={tw`font-bold`}>LIVER DISEASE PREDICTION
     </Text>
    </View>
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={tw`text-black mb-2`}>Age</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="numeric"
        placeholder="0"
        value={age}
        onChangeText={setAge}
      />

      <Text style={tw`text-black mb-2`}>Gender</Text>
      <DropdownPicker
        open={open}
        value={value}
        items={genderItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setGenderItems}
        placeholder="Select Gender"
      />
       <Text style={tw`text-black mb-2`}>Total Bilirubin</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="decimal-pad"
        placeholder="0"
        value={totalBilirubin}
        onChangeText={setTotalBilirubin}
      />
       <Text style={tw`text-black mb-2`}>Direct Bilirubin</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="decimal-pad"
        placeholder="0"
        value={directBilirubin}
        onChangeText={setDirectBilirubin}
      />
       <Text style={tw`text-black mb-2`}>Alkane Phosphatase</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="numeric"
        placeholder="0"
        value={alkanePhosphatase}
        onChangeText={setAlkanePhosphatase}
      />
       <Text style={tw`text-black mb-2`}>Alanine Aminotransferase</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="numeric"
        placeholder="0"
        value={alanineAminotransferase}
        onChangeText={setAlanineAminotransferase}
      />
       <Text style={tw`text-black mb-2`}>Aspartate Aminotransferase</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="numeric"
        placeholder="0"
        value={aspartateAminotransferase}
        onChangeText={setAspartateAminotransferase}
      />
       <Text style={tw`text-black mb-2`}>Total Proteins</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="decimal-pad"
        placeholder="0"
        value={totalProteins}
        onChangeText={setTotalProteins}
      />
       <Text style={tw`text-black mb-2`}>Albumin</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="decimal-pad"
        placeholder="0"
        value={albumin}
        onChangeText={setAlbumin}
      />
       <Text style={tw`text-black mb-2`}>Albumin and Globulin Ratio</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 mb-2 text-black`}
        keyboardType="decimal-pad"
        placeholder="0"
        value={albuminGlobulinRatio}
        onChangeText={setAlbuminGlobulinRatio}
      />
      <Button title="Predict" onPress={handlePredictPress} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default InputForm;
