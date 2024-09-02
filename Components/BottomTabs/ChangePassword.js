import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import tw from 'twrnc'

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const reauthenticateUser = async (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log('User reauthenticated successfully!');
    } catch (error) {
      console.error('Error during reauthentication:', error);
      // Handle reauthentication errors here
    }
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    await reauthenticateUser(currentPassword);
    const user = auth.currentUser;
    try {
      await updatePassword(user, newPassword);
      console.log('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle errors here
    }
  };

  const handleChangePassword = async () => {
    await changeUserPassword(currentPassword, newPassword);
  };

  return (
    <View style={tw`flex-1 justify-center items-center py-2`}>
    <View style={tw` `}>

      <Text>Change Password</Text>
      <TextInput
        style={tw`text-xl border border-gray-400 rounded p-2 mb-4 text-black bg-white`}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
      style={tw`text-xl border border-gray-400 rounded p-2 mb-8 text-black bg-white`}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
    </View>
  );
}
