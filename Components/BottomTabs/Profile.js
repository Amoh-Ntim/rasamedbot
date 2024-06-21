import React, { useEffect } from 'react'
import { View } from 'react-native'

export default function Profile() {
  // const { uniqueImageName, fileType } = route.params; 
  // const [username, setUsername] = useState('');
  // const [imageUrl, setImageUrl] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(FIREBASE_DATABASE, "users/eJi1FNZ7xFvYctcLTwmW");
  //     const docSnapshot = await getDoc(docRef);
  //     if (docSnapshot.exists()) {
  //       setUsername(docSnapshot.data().username);
  //     } else {
  //       console.log("No such document!");
  //     }
  
  //     // Replace with the path of the image file in Firebase Storage
  //     const storageRef = ref(FIREBASE_STORAGE, `${uniqueImageName}.${fileType}`);
  //     try {
  //       const url = await getDownloadURL(storageRef);
  //       setImageUrl(url);
  //     } catch (error) {
  //       console.log("Error getting image:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, [uniqueImageName]);
  return (
    
    <View>
     {/* <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} /> */}
     <Text>hi</Text>
    </View>
  )
}
