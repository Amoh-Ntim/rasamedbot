import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const DATA = [
  {
    title: 'Emphatic AI Wellness Chatbot For All.',
    description: 'Experience compassionate and personalized care with our Lucy AI.',
    image: require('../assets/m3.png'), // Update with your asset path
  },
  {
    title: 'Medical Prediction',
    description:
      'Our AI-powered system provides accurate medical predictions based on advanced algorithms.',
    image: require('../assets/m1.png'),
  },
  {
    title: 'Healthy Living Tips',
    description:
      'Discover practical lifestyle habits to positively impact your health, from nutrition to exercise.',
    image: require('../assets/m2.png'),
  },
  {
    title: 'Privacy of Data',
    description:
      'Your health data is secure and confidential. We prioritize privacy and comply with standards.',
    image: require('../assets/m5.png'),
  },
  {
    title: 'Medically Approved',
    description: 'Our system has been reviewed and approved by medical experts.',
    image: require('../assets/m4.png'),
  },
];

export default function Onboarding({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const goToNextScreen = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Welcome'); // Navigate to the next screen after the last slide
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* FlatList for Swiping */}
      <FlatList
        ref={flatListRef}
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            {/* Image */}
            <Image source={item.image} style={styles.image} />

            {/* Title */}
            <Text style={styles.title}>{item.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        {DATA.map((_, index) => {
          const widthInterpolation = scrollX.interpolate({
            inputRange: [
              width * (index - 1),
              width * index,
              width * (index + 1),
            ],
            outputRange: [8, 24, 8], // Active dot is wider
            extrapolate: 'clamp',
          });

          const opacityInterpolation = scrollX.interpolate({
            inputRange: [
              width * (index - 1),
              width * index,
              width * (index + 1),
            ],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: widthInterpolation,
                  opacity: opacityInterpolation,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={goToNextScreen}>
        <FontAwesome name="arrow-right" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    marginTop: 30,
    color: '#6C63FF',
    fontSize: 25,
    fontWeight: '600',
  },
  contentContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
    marginHorizontal: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
