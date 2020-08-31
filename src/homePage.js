import React from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const homePage = ({navigation}) => {
  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');
      navigation.navigate('SignInScreen');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello World</Text>
      <View>
        <Button
          title="SignOut"
          onPress={() => {
            signOut();
          }}></Button>
      </View>
    </View>
  );
};
export default homePage;
