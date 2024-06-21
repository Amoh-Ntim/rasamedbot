import { View, Text, Image } from 'react-native'
import React from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { useState, useEffect, useCallback } from 'react';
import GlobalApi from '../../Services/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://192.168.193.69:3000/bardapi'; // Replace with your Next.js API's URL

export default function ChatScreen () {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am your chat bot, How Can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = async (userMsg) => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL, { userInput: userMsg }); // Use POST for sending data
      const generatedText = response.data.generatedText;
      setLoading(false);
      const chatAIResp = {
        _id: Math.random() * (9999999 - 1),
        text: generatedText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
    } catch (error) {
      console.error('Error fetching response from API:', error);
      setLoading(false);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: Math.random() * (9999999 - 1),
          text: 'Sorry, I encountered an error. Please try again later.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        })
      );
    }
  };
   const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#671ddf',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#671ddf',
                  // fontSize:20,
                  padding:2
                }
              }}
          />
        )
      }

    const  renderInputToolbar =(props)=> {
        //Add the extra styles via containerStyle
       return <InputToolbar {...props} 
       containerStyle={{
       padding:3,
      
        backgroundColor:'#671ddf',
        color:'#fff',
        }} 
        
        textInputStyle={{ color: "#fff" }}
         />
     }

   const  renderSend=(props)=> {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                   
                </View>
            </Send>
        );
    }

    const renderAvatar = () => {
        return <FontAwesome5 name="robot" size={24} color="black" />;
    }

  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>

      <GiftedChat
      messages={messages}
      isTyping={loading}
      multiline ={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      
      }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar} 
      renderSend={renderSend}
      renderAvatar={renderAvatar}
    />
    
    
    </View>
  )
}
