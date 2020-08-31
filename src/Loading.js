import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';

const Loading = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const userdata = await AsyncStorage.getItem('username');
      const userpassword = await AsyncStorage.getItem('password');

      if (userdata !== null) {
        console.log(userdata);
        console.log(userpassword);
        navigation.navigate('homePage');
        setLoading(false);
      } else {
        navigation.navigate('newLayout');
        setLoading(false);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Spinner color={'#000'} isVisible={true} size={50} type="ThreeBounce" />
      </View>
    );
  }
  return null;
};
export default Loading;
