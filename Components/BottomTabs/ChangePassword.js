import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const reauthenticateUser = async (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log('User reauthenticated successfully!');
    } catch (error) {
      console.error('Error during reauthentication:', error);
      throw error;
    }
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      await reauthenticateUser(currentPassword);
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      console.log('Password updated successfully!');
      Alert.alert('Success', 'Password updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('SignIn'),
        },
      ]);
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    await changeUserPassword(currentPassword, newPassword);
  };

  return (
    <View style={tw`flex-1 justify-center items-center py-2`}>
      <Text style={tw`text-3xl font-bold p-2 mb-4 text-black`}>Change Password</Text>
      <View style={tw`w-full px-4`}>
        <View style={tw`mb-4`}>
          <TextInput
            style={tw`text-xl border border-gray-400 rounded p-2 text-black bg-white`}
            placeholder="Current Password"
            secureTextEntry={!showCurrentPassword} // Use showCurrentPassword state here
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={toggleShowCurrentPassword} style={tw`absolute right-2 top-2`}>
            <MaterialCommunityIcons
              name={showCurrentPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={tw`mb-8`}>
          <TextInput
            style={tw`text-xl border border-gray-400 rounded p-2 text-black bg-white`}
            placeholder="New Password"
            secureTextEntry={!showNewPassword} // Use showNewPassword state here
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={toggleShowNewPassword} style={tw`absolute right-2 top-2`}>
            <MaterialCommunityIcons
              name={showNewPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Button title="Change Password" onPress={handleChangePassword} />
      </View>
    </View>
  );
}
