import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import tw from 'twrnc'

const PrivacyPolicy = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.container}>
    <View>
    {/* introduction */}
      <Text style={tw`font-bold text-3xl`}> 
      Precognosis Privacy Policy
      </Text>
    </View>
    <ScrollView>

      {/* sub */}
      <Text style={tw`font-bold text-xl mt-2`}>Introduction</Text>
      <Text style={tw` text-xl`}>
      Precognosis is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our app.
      </Text>
       
       {/* info */}
      <Text style={tw`font-bold text-2xl mt-4 mb-2`}>Information We Collect</Text>
      <Text style={tw`text-lg`}>
      <Text style={tw`text-lg font-semibold`}>Personal Information: </Text>Name, email address, phone number, date of birth, gender, and other information you provide when you create an account or interact with our app.
      </Text>
      <Text style={tw`text-lg font-semibold`}>Health Information: </Text>
      <Text style={tw`text-lg`}>Health data you voluntarily provide, such as symptoms, medical history, and test results.</Text>

      {/* use of info */}
      <Text style={tw`font-bold text-2xl mt-4 mb-2`}>How We Use Your Information</Text>
      <Text style={tw`text-lg`}>
      <Text style={tw`text-lg font-semibold`}>To provide our services: </Text>We use your information to deliver our AI-powered predictions, health news, and chatbot interactions.
      </Text>
      <Text style={tw`text-lg font-semibold`}>To improve our app: </Text>
      <Text style={tw`text-lg`}>We analyze your usage data to enhance our app's features and performance.</Text>
      <Text style={tw`text-lg font-semibold`}>For research purposes:  </Text>
      <Text style={tw`text-lg`}> We may use your data anonymously for research to improve our AI models and healthcare services.</Text>
      
      {/* data retention */}
      <Text style={tw`text-2xl font-bold mt-4`}>Data Retention</Text>
      <Text style={tw`text-lg`}>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy. We may retain your information for a longer period if required by law or for legitimate business purposes.</Text>
    
       {/* data security */}
      <Text style={tw`text-2xl font-bold mt-4`}>Data Security</Text>
      <Text style={tw`text-lg`}>We implement reasonable security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. Please be aware that there is always a risk of unauthorized access.</Text>
 

      <Text style={tw`text-2xl font-bold mt-4`}>Data Sharing</Text>
      <Text style={tw`text-xl font-semibold mb-2`}>We may share your information with:</Text>
      <Text style={tw`text-lg font-semibold`}>Third-party service providers: </Text>
      <Text style={tw`text-lg`}>We may engage third-party service providers to help us deliver our services, such as cloud storage providers, analytics providers, and customer support providers. These providers are required to maintain the confidentiality of your information.</Text>
      <Text style={tw`text-lg font-semibold mt-4`}>Law enforcement or regulatory authorities:  </Text>
      <Text style={tw`text-lg`}>We may disclose your information if required by law or to comply with legal processes.</Text>

  {/* rights */}
      <Text style={tw`font-bold text-2xl mt-4 mb-2`}>Your Rights</Text>
      <Text style={tw`text-lg`}>
      <Text style={tw`text-xl font-bold`}>You have the right to: </Text>
      </Text>
      
      <Text>
      <Text style={tw`text-lg mt-2 font-semibold`}>Access and correct your personal information</Text>
      <Text style={tw`text-lg mt-2 font-semibold`}>Request the deletion of your personal information</Text>
      <Text style={tw`text-lg mt-2 font-semibold`}>Object to the processing of your personal information.</Text>
      <Text style={tw`text-lg mt-2 font-semibold`}>Withdraw your consent to the processing of your personal information</Text>
      </Text>

      <Text style={tw`text-2xl font-bold mt-4`}> Changes to This Privacy Policy</Text>
      <Text style={tw`text-lg mt-2 font-semibold pb-8`}>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website.</Text>

    </ScrollView>

    </View>
  );
};

export default PrivacyPolicy;