import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, View } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const   
 [whiteBloodCellCount, setWhiteBloodCellCount] = useState('');

  const [hypertension, setHypertension] = useState(null);
  const [diabetesMellitus, setDiabetesMellitus] = useState(null);
  const [appetite, setAppetite] = useState(null);
  const [redBloodCells, setRedBloodCells] = useState(null);
  const [anemia, setAnemia] = useState(null);

  const hypertensionItems = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ];

  const diabetesMellitusItems = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ];

  const appetiteItems = [
    { label: 'Poor', value: 'poor' },
    { label: 'Good', value: 'good' },
  ];

  const redBloodCellsItems = [
    { label: 'Normal', value: 'normal' },
    { label: 'Abnormal', value: 'abnormal' },
  ];

  const anemiaItems = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ];

  const [openHypertension, setOpenHypertension] = useState(false);
  const [openDiabetesMellitus, setOpenDiabetesMellitus] = useState(false);
  const [openAppetite, setOpenAppetite] = useState(false);
  const [openRedBloodCells, setOpenRedBloodCells] = useState(false);
  const [openAnemia, setOpenAnemia] = useState(false);

  const handlePredictPress = () => {
    // Handle prediction logic here
    console.log('Predict button pressed');
    // ...
  };

  return (
    <>
    <View style={tw`flex justify-center items-center`}>
    <Text style={tw`text-black font-bold`}>KIDNEY DISEASE</Text>
    </View>
    <ScrollView style={tw`flex-1 p-4`}>
    <View>

      <Text style={tw`text-black mb-2`}>Age</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />

      <Text style={tw`text-black mb-2`}>Blood Pressure</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Blood Pressure"
        value={bloodPressure}
        onChangeText={setBloodPressure}
      />

      <Text style={tw`text-black mb-2`}>Specific Gravity</Text>
      <TextInput
        keyboardType="decimal-pad"
        placeholder="1.00"
        value={specificGravity}
        onChangeText={setSpecificGravity}
      />

      <Text style={tw`text-black mb-2`}>Albumin</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Albumin"
        value={albumin}
        onChangeText={setAlbumin}
      />

      <Text style={tw`text-black mb-2`}>Blood Glucose Random</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Blood Glucose Random"
        value={bloodGlucoseRandom}
        onChangeText={setBloodGlucoseRandom}
      />

      <Text style={tw`text-black mb-2`}>Blood Urea</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Blood Urea"
        value={bloodUrea}
        onChangeText={setBloodUrea}
      />

      <Text style={tw`text-black mb-2`}>Serum Creatinine</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Serum Creatinine"
        value={serumCreatinine}
        onChangeText={setSerumCreatinine}
      />

      <Text style={tw`text-black mb-2`}>Sodium</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Sodium"
        value={sodium}
        onChangeText={setSodium}
      />

      <Text style={tw`text-black mb-2`}>Potassium</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Potassium"
        value={potassium}
        onChangeText={setPotassium}
      />

      <Text style={tw`text-black mb-2`}>Hemoglobin</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Hemoglobin"
        value={hemoglobin}
        onChangeText={setHemoglobin}
      />

      <Text style={tw`text-black mb-2`}>White Blood Cell Count</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="White Blood Cell Count"
        value={whiteBloodCellCount}
        onChangeText={setWhiteBloodCellCount}
      />

      <Text style={tw`text-black mb-2`}>Hypertension</Text>
      <DropDownPicker
        open={openHypertension}
        value={hypertension}
        items={hypertensionItems}
        setOpen={setOpenHypertension}
        setValue={setHypertension}
        
        // setItems={setHypertensionItems}
        placeholder="Select Hypertension"
      />

      <Text style={tw`text-black mb-2`}>Diabetes Mellitus</Text>
      <View>

      <DropDownPicker
        open={openDiabetesMellitus}
        value={diabetesMellitus}
        items={diabetesMellitusItems}
        setOpen={setOpenDiabetesMellitus}
        setValue={setDiabetesMellitus}
        // setItems={setDiabetesMellitusItems}
        placeholder="Select Diabetes Mellitus"
      />
      </View>

      <Text style={tw`text-black mb-2`}>Appetite</Text>
      <View>
      <DropDownPicker
        open={openAppetite}
        value={appetite}
        items={appetiteItems}
        setOpen={setOpenAppetite}
        setValue={setAppetite}
        // setItems={setAppetiteItems}
        placeholder="Select Appetite"
      />
      </View>

      <Text style={tw`text-black mb-2`}>Red Blood Cells</Text>
      <DropDownPicker
        open={openRedBloodCells}
        value={redBloodCells}
        items={redBloodCellsItems}
        setOpen={setOpenRedBloodCells}
        setValue={setRedBloodCells}
        // setItems={setRedBloodCellsItems}
        placeholder="Select Red Blood Cells"
      />

      <Text style={tw`text-black mb-2`}>Anemia</Text>
      <DropDownPicker
        open={openAnemia}
        value={anemia}
        items={anemiaItems}
        setOpen={setOpenAnemia}
        setValue={setAnemia}
        // setItems={setAnemiaItems}
        placeholder="Select Anemia"
      />


      {/* ... other dropdowns */}

    </View>
    </ScrollView>
      <Button style={tw`mt-4`} title="Predict" onPress={handlePredictPress} />
    </>
  );
};

export default Kidney;
