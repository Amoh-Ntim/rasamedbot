import { View, Text, Image } from 'react-native'
import React from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { useState, useEffect, useCallback } from 'react';
import GlobalApi from '../../Services/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://192.168.146.69:8000/gemini'; // Replace with your Next.js API's URL

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
      setLoading(true); // Indicate loading state
  
      // Call getBardResp to fetch response from Bard API
      getBardResp(messages[0].text)
        .then(response => {
          if (response && response.data) { // Check for response and data existence
            console.log(response.data);
          setLoading(false); // Update loading state after successful response
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: response.data, // Assuming response.data contains the generated text
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
            },
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
        }
        })
        .catch(error => {
          console.error('Error fetching response from API:', error);
          setLoading(false); // Update loading state after error
          setMessages((previousMessages) =>
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
        });
      }
    }, []);
  
  const getBardResp = async (msg) => {
    try {
      setLoading(true); // Can potentially move this inside the try block
      const messageArray = Array.isArray(msg) ? msg : [msg];
      const resp = await axios.post('http://192.168.129.69:5000/gemini', { message: messageArray }); // Assuming Bard API expects a POST request
      console.log('API response:', resp);
      if (resp && resp.data && resp.data.generatedText) { // Assuming successful response has data
        console.log(resp.data);
        setLoading(false);
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: resp.data.generatedText, // Assuming response data contains the generated text
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
        // return chatAIResp; // Return the chatAIResp object for onSend to use
      } else {
        console.error('API response does not contain data');
        setLoading(false);
        throw new Error('API response does not contain data:', resp); // Re-throw an error for handling in onSend
      }
    } catch (error) {
      console.error('Error fetching response from API:', error);
      setLoading(false);
      throw error; // Re-throw the error for handling in onSend
    }
  };
  
  
   const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#0D4CEF',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#0D4CEF',
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
      
        backgroundColor:'#0D4CEF',
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
        name:'React Native'
      
      }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar} 
      renderSend={renderSend}
      renderAvatar={renderAvatar}
    />
    
    
    </View>
  )
}
