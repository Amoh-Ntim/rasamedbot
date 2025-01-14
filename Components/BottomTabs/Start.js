import { View, Alert, TouchableOpacity, Image, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import tw from 'twrnc'

const BASE_URL = 'http://192.168.7.69:8000/gemini'; // Replace with your Next.js API's URL

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am Lucy. How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    if (messages[0].text) {
      setLoading(true); // Set loading state to true when a message is sent

      // Fetch response from Bard API
      getBardResp(messages[0].text)
        .then(responseText => {
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: responseText,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Chat Bot',
            },
          };

          setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
        })
        .catch(error => {
          console.error('Error fetching response from API:', error);
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, {
              _id: Math.random() * (9999999 - 1),
              text: 'Sorry, I encountered an error. Please try again later.',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Chat Bot',
              },
            })
          );
        })
        .finally(() => {
          setLoading(false); // Ensure loading is set to false once the response is handled
        });
    }
  }, []);

  const getBardResp = async (msg) => {
    try {
      const messageArray = Array.isArray(msg) ? msg : [msg];
      const resp = await axios.post(`${BASE_URL}`, { message: messageArray }); // Assuming Bard API expects a POST request
      if (resp && resp.data && resp.data.generatedText) {
        return resp.data.generatedText; // Return the generated text
      } else {
        console.error('API response does not contain data');
        throw new Error('API response does not contain data');
      }
    } catch (error) {
      console.error('Error fetching response from API:', error);
      throw error;
    }
  };

  // Handle long press on a message
  const handleLongPress = (context, message) => {
    Alert.alert(
      'Message Options',
      'Choose an action',
      [
        {
          text: 'Save',
          onPress: () => handleSaveMessage(message),
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteMessage(message),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Save a message
  const handleSaveMessage = (message) => {
    setSavedMessages(prevSaved => {
      if (!prevSaved.find(m => m._id === message._id)) {
        return [...prevSaved, message];
      }
      return prevSaved;
    });
    Alert.alert('Saved', 'Message has been saved.');
  };

  // Delete a message
  const handleDeleteMessage = (message) => {
    setMessages(prevMessages => prevMessages.filter(m => m._id !== message._id));
    Alert.alert('Deleted', 'Message has been deleted.');
  };

  // Customize the message bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0D4CEF',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 18,
          },
          left: {
            color: '#000000',
            fontSize: 18,
          },
        }}
      />
    );
  };

  // Customize the input toolbar
      const renderInputToolbar = (props) => (
        <InputToolbar
          {...props}
          // containerStyle={{
          //   backgroundColor: '#FFFFFF', // Light background for the toolbar
          //   marginRight: 10,
          //   borderWidth: 0, // No border
          //   borderRadius: 50, // Rounded container
          //   paddingVertical: 4, // Padding for better alignment
          //   paddingHorizontal: 8, // Inner spacing
          //   shadowColor: "#000",
          //   shadowOffset: { width: 0, height: 2 },
          //   shadowOpacity: 0.1,
          //   shadowRadius: 4,
          //   elevation: 2, // Slight elevation for material design
          // }}
          textInputStyle={{
            color: "#000", // Black text color
            flex: 1,
            fontSize: 16,
            backgroundColor: "#fff", // Light gray background for input
            paddingVertical: 10, // Adjust vertical padding
            paddingHorizontal: 16, // Inner spacing for text
            borderRadius: 50, // Rounded input field
            borderWidth: 1, // Subtle border
            borderColor: "#E0E0E0", // Light border color
          }}
        />
      );
      
      const renderSend = (props) => {
        return (
          <Send {...props}>
            <View
              style={{
                marginRight: 10,
                marginBottom: 5,
                backgroundColor: "#000000", // Black background for send button
                width: 40,
                height: 40,
                borderRadius: 20, // Circular button
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="send" size={20} color="white" />
            </View>
          </Send>
        );
      };
      


  // Customize the avatar
  const renderAvatar = () => <Image
  source={require("../../assets/Robot.png")} // Replace with actual bot image
  style={tw`w-14 h-14 rounded-full`}
/>;

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <View style={tw`flex-row items-center justify-between p-4 bg-white shadow-md`}>
      {/* Back Button */}
      <TouchableOpacity style={tw`p-2`}>
        <Text style={tw`text-gray-500 text-3xl`}>&larr;</Text>
      </TouchableOpacity>

      {/* Profile Details */}
      <View style={tw`flex-row items-center`}>
        <Image
          source={require("../../assets/Robot.png")} // Replace with actual bot image
          style={tw`w-10 h-10 rounded-full`}
        />
        <View style={tw`ml-3`}>
          <Text style={tw`text-black font-bold text-lg`}>LucyAI</Text>
          <Text style={tw`text-green-500 text-sm`}>Always active</Text>
        </View>
      </View>

      {/* Options Menu */}
      <TouchableOpacity style={tw`p-2`}>
        <Text style={tw`text-gray-500 text-3xl`}>⋮</Text>
      </TouchableOpacity>
    </View>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'User',
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        onLongPress={handleLongPress}
      />
    </View>
  );
}
