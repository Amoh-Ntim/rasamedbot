import { View, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const BASE_URL = 'http://192.168.217.69:8000/gemini'; // Replace with your Next.js API's URL

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

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    if (messages[0]?.text) {
      setLoading(true);

      try {
        const responseText = await getBardResp(messages[0].text);
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: responseText,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chat Bot',
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatAIResp)
        );
      } catch (error) {
        console.error('Error fetching response from API:', error);
        setMessages((previousMessages) =>
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
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const getBardResp = async (msg) => {
    try {
      const messageArray = Array.isArray(msg) ? msg : [msg];
      const resp = await axios.post(`${BASE_URL}`, { message: messageArray }); // Assuming Bard API expects a POST request
      if (resp?.data?.generatedText) {
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
    setSavedMessages((prevSaved) => {
      if (!prevSaved.find((m) => m._id === message._id)) {
        return [...prevSaved, message];
      }
      return prevSaved;
    });
    Alert.alert('Saved', 'Message has been saved.');
  };

  // Delete a message
  const handleDeleteMessage = (message) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m._id !== message._id));
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
            color: '#0D4CEF',
            fontSize: 18,
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
        textInputStyle={{ color: '#fff' }}
      />
    );
  };

  // Customize the send button
  const renderSend = (props) => {
    const { text, onSend } = props;
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome
            name="send"
            size={24}
            color={text.trim().length > 0 ? 'white' : 'transparent'} // Show button only if there's text
          />
        </View>
      </Send>
    );
  };

  // Customize the avatar with default size
  const renderAvatar = ({ size = 24 }) => (
    <FontAwesome5 name="robot" size={size} color="black" />
  );

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
