import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FIREBASE_DATABASE } from "../firebase/FirebaseConfig";
import { FIREBASE_STORAGE } from "../firebase/FirebaseConfig";
import { ref } from 'firebase/storage';

import tw from 'twrnc'

function Welcome() {
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(FIREBASE_DATABASE, "users/eJi1FNZ7xFvYctcLTwmW");
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setUsername(docSnapshot.data().username);
      } else {
        console.log("No such document!");
      }

      const storageRef = ref(FIREBASE_STORAGE, 'gs://medbot-2aa2d.appspot.com'); // Replace with actual path
      try {
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (error) {
        console.log("Error getting image:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`h-1/3`}>
        <Text>Welcome</Text>
        <Text>{username}</Text>
        <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      </View>
      {/* grid view */}
      <View style={tw`flex-row flex-wrap h-2/3`}>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-green-500 w-full h-1/2`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-green-500 w-full h-1/2`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-green-500 w-full h-1/2`}>
          </View>
        </View>
        <View style={tw`w-1/2 p-2`}>
          <View style={tw`rounded-xl bg-green-500 w-full h-1/2`}>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Welcome


// const docRef = firebase.firestore().doc("users/eJi1FNZ7xFvYctcLTwmW");
// docRef.get().then((doc) => {
//   if (doc.exists) {
//     console.log("Username:", doc.data().username);
//   } else {
//     console.log("No such document!");
//   }
// }).catch((error) => {
//   console.log("Error getting document:", error);
// });

// const storageRef = firebase.storage().ref('images/uniqueImageName.fileType');
// storageRef.getDownloadURL().then((url) => {
//   // `url` is the download URL for the image
//   console.log(url);
// }).catch((error) => {
//   console.log("Error getting image:", error);
// });
