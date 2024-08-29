import { View, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const BASE_URL = 'http://192.168.148.69:8000/gemini'; // Replace with your Next.js API's URL

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am your chat bot. How can I help you?',
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
          },
          left: {
            color: '#0D4CEF',
          },
        }}
      />
    );
  };

  // Customize the input toolbar
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#0D4CEF',
          padding: 5,
        }}
        textInputStyle={{ color: "#fff" }}
      />
    );
  };

  // Customize the send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="white" />
        </View>
      </Send>
    );
  };

  // Customize the avatar
  const renderAvatar = () => <FontAwesome5 name="robot" size={24} color="black" />;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
