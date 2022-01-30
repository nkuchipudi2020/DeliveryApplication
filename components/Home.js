import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

//home screen
export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/deliver.png')}></Image>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesTitle}>Get Food Delivered</Text>
        <Text style={styles.titlesDesc}>
          Order food using the Dine on Campus app and use your order information
          to get it delivered here.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Order')}
          style={styles.button}>
          <Text style={styles.titlesButton}>Order Delivery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.orientation}>
          <TouchableOpacity>
            <Image
              style={styles.shopIcon}
              source={require('../assets/images/shopicon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image
              style={styles.personIcon}
              source={require('../assets/images/personicon.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orientation: {
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'white',
    height: 90,
    width: 400,
    marginTop: 50,
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  shopIcon: {
    marginLeft: 90,
    marginTop: 24,
  },
  personIcon: {
    marginLeft: 140,
    marginTop: 24,
  },
  image: {
    alignSelf: 'center',
    aspectRatio: 1.6,
    marginTop: 100,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#FF2A2A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
    borderRadius: 10,
  },
  images: {
    width: 40,
    height: 40,
    paddingTop: 20,
  },
  titlesTitle: {
    fontFamily: 'Mark-Bold',
    fontSize: 32,
    color: '#4A4949',
    marginTop: 20,
    textAlign: 'center',
  },
  titlesDesc: {
    fontFamily: 'Mark-Medium',
    fontSize: 20,
    color: '#7D7D7D',
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  titlesButton: {
    fontFamily: 'Mark-Medium',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  titlesDirections: {
    fontFamily: 'Mark-Medium',
    fontSize: 20,
    color: '#7D7D7D',
    textAlign: 'left',
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  titlesSubtitle: {
    fontFamily: 'Mark-Bold',
    fontSize: 24,
    color: '#4A4949',
    textAlign: 'left',
  },
  textBox: {},
  boxText: {
    color: '#4A4949',
    fontFamily: 'Mark-Medium',
    fontSize: 21,
    textAlign: 'left',
  },
});
