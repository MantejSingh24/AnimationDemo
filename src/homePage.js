import React, {component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {Transition, Transitioning} from 'react-native-reanimated';
import data from './data';

const images = [
  {id: 1, uri: require('../asserts/1.jpg')},
  {id: 2, uri: require('../asserts/2.jpg')},
  {id: 3, uri: require('../asserts/bg.jpg')},
  ,
  {id: 4, uri: require('../asserts/bgg.jpg')},
];

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const Header_Height = 70 + StatusBar.currentHeight;

function HomeScreen({navigation}) {
  const ScrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(ScrollY, 0, Header_Height);
  const headerY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, Header_Height],
    outputRange: [0, -Header_Height],
  });
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: Header_Height,
          backgroundColor: 'pink',
          zIndex: 1000,
          elevation: 1000,
          transform: [{translateY: headerY}],
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 45,
        }}>
        <Text style={{fontSize: 20}}>Animated Header</Text>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        style={{paddingTop: Header_Height}}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: ScrollY}}},
        ])}>
        {images.map((image) => (
          <View style={{height: 400, margin: 20}}>
            <Image
              source={image.uri}
              key={image.id}
              style={{
                flex: 1,
                height: null,
                width: null,
                borderRadius: 10,
              }}
            />
          </View>
        ))}
      </Animated.ScrollView>
      <Button
        title="SignOut"
        onPress={() => {
          signOut();
        }}></Button>
    </View>
  );
}

function SettingsScreen({navigation}) {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
      <StatusBar hidden />
      {data.map(({bg, color, category, subCategories}, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}>
            <View style={[styles.card, {backgroundColor: bg}]}>
              <Text style={[styles.heading, {color}]}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={[styles.body, {color}]}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}
const signOut = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
    navigation.navigate('SignInScreen');
  } catch (e) {
    console.log('Failed to clear the async storage.');
  }
};
const homePage = ({navigation}) => {
  return null;
};
export {homePage, SecondComponent};

const Tab = createBottomTabNavigator();
function SecondComponent() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: '#b5b5b5',
        labelStyle: {
          fontSize: 20,
          padding: 10,
        },
        style: {
          backgroundColor: '#000',
          height: 50,
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
