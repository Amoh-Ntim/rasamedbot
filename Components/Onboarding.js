/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import DotsPagination from 'react-native-dots-pagination';
const { width } = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import tw from 'twrnc';


// https://www.creative-flyers.com
const DATA = [
  {
    title: 'Medical Prediction',
    location: 'Our AI-powered system provides accurate medical predictions based on advanced algorithms and data analysis.',
    date: 'Nov 17th, 2020',
    poster:
    require('../assets/undraw_medicine.png'),
    titleColor: '#6C63FF'
  },
  {
    title: 'AI Prompting',
    location: 'Stay informed with real-time prompts and updates from our intelligent AI assistant.',
    date: 'Sept 3rd, 2020',
    poster:
    require('../assets/undraw_Artificial.png'),
    titleColor: '#7DF926'
  },
  {
    title: 'Healthy Living Tips',
    location: 'Discover practical lifestyle habits that can positively impact your health. From nutrition to exercise, we provide personalized advice based on our disease prediction insights. Take charge of your well-being with our expert recommendations!',
    date: 'Oct 11th, 2020',
    poster:
    require('../assets/undraw_fitness.png'),
    titleColor: '#F92688'
  },
//   #F9A826
// #26BBF9
// #F92688
// #7DF926
  {
    title: 'Privacy of Data',
    location: 'Your health data is secure and confidential. We prioritize privacy and comply with industry standards.',
    date: 'Aug 17th, 2020',
    poster:
    require('../assets/undraw_MobileEncryption.png'),
    titleColor: '#F9A826'

  },
  {
    title: 'Medically Approved',
    location: 'Our system has been reviewed and approved by medical experts.',
    date: 'Sept 11th, 2020',
    poster:
    require('../assets/undraw_Doctors_p6aq.png'),
    titleColor: '#6C63FF',
    sign:'Click to Sign In Or SignUp'

  },
];

const OVERFLOW_HEIGHT = 180;
const SPACING = 10;
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated, navigation }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    // captions for onboarding screens
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title, { color: item.titleColor , textAlign: 'center'}]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location,{ textAlign: 'center'}]}>
                  {/* <EvilIcons
                    name='location'
                    size={16}
                    color='black'
                    style={{ marginRight: 5 }}
                  /> */}
                  {item.location}
                </Text>
              </View>
                <View>
                <Text style={[styles.location,{ textAlign: 'center', color: item.titleColor },]}
                 onPress={() => navigation.navigate('SignUp')}
                >
                 {item.sign}
                </Text>
                </View>
                {/* <View style={tw`flex flex-row justify-center items-center gap-x-2`}>
                <FontAwesome name="circle" size={24} color={item.titleColor} />
                <FontAwesome name="circle" size={24} color={item.titleColor} />
                <FontAwesome name="circle" size={24} color={item.titleColor} />
                <FontAwesome name="circle" size={24} color={item.titleColor} />
                </View> */}
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function Onboarding({ navigation }) {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  // const [currentIndex, setCurrentIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
      setIndex(0);
    }
  },[index, data.length, VISIBLE_ITEMS]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <GestureHandlerRootView>
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={ item.poster }
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                      resizeMode: 'contain'
                    }}
                  />
          
                </Animated.View>
              );
            }}
          /> 
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} navigation={navigation} />
          <View style={styles.paginationContainer}>
          {index < 5 && (
    <DotsPagination
      length={DATA.length}
      active={index}
      dotsColor={'#fff'}
      inactiveDotsColor={'#fff222'}
      activeDotColor={'#fff'}
    />
          )}
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,

  },
  location: {
    fontSize: 20,
    marginBottom:10
  },
  date: {
    fontSize: 12,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20, // Adjust positioning as needed
    alignSelf: 'center',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
    marginBottom: 120,
  },
});