import * as React from 'react';
import {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updateOrderStatus} from '../firebase/apiService';
import {firestore, Auth} from '../Setup';

function Payment({navigation}) {
    const [orderList, setOrderList] = useState([]);

  const updateAll = () => {
    orderList.forEach(order => {
      const conNo = order.ConfirmationNo;
      console.log(conNo);
      updateOrderStatus(conNo, 'placed');
    });
    navigation.navigate('StaticStatus');
  };

  useEffect(() => {
    return firestore()
      .collection('AllOrder')
      .onSnapshot(querySnapshot => {
        const list = [];
        console.log(querySnapshot.size);
        querySnapshot.forEach(doc => {
          const {
            Orderer,
            ConfirmationNo,
            PickupLocation,
            DeliveryLocation,
            OrdererName,
            Deliverer,
            OrderStatus,
            OrderTime,
          } = doc.data();
          if (
            Orderer == Auth().currentUser.uid &&
            OrderStatus == 'not checkout'
          ) {
            list.push({
              ConfirmationNo,
              PickupLocation,
              DeliveryLocation,
              OrdererName,
            });
          }
        });

        setOrderList(list);
        //console.log(orderList);
        // if (loading) {
        //   setLoading(false);
        // }
      });
    }, []);



  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Text style={styles.titlesTitle}>Payment is not required for the trial version of the app. Place your delivery order for free. </Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={updateAll}>
          <Text style={styles.titlesButton}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: 400,
    marginRight: -1,
    height: 100,
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    marginTop: 470,
  },
  detailsOrientation: {
    flexDirection: 'row',
  },
  image: {
    marginLeft: 20,
    marginTop: 10,
  },
  feeDetails: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 20,
  },
  feeCost: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 140,
  },
  totalDetails: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 26,
    marginTop: 8,
    marginLeft: 20,
  },
  totalCost: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 26,
    marginTop: 8,
    marginLeft: 215,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FF2A2A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 50,
    borderRadius: 10,
  },
  images: {
    width: 40,
    height: 40,
    paddingTop: 20,
  },
  titlesTitle: {
    fontFamily: 'Mark-Bold',
    fontSize: 21,
    color: '#4A4949',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 10,
    textAlign: 'left',
  },
  titlesCVV: {
    fontFamily: 'Mark-Bold',
    fontSize: 21,
    color: '#4A4949',
    marginTop: 12,
    marginLeft: 85,
    marginRight: 10,
    textAlign: 'left',
  },
  titlesDesc: {
    fontFamily: 'Mark-Medium',
    fontSize: 20,
    color: '#7D7D7D',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
    textAlign: 'left',
  },
  titlesButton: {
    fontFamily: 'Mark-Medium',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#FF2A2A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
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
  textBox: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 21,
    backgroundColor: '#E9E9E9',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    width: 355,
    height: 50,
    borderRadius: 10,
    textAlign: 'left',
    paddingHorizontal: 25,
  },
  ExpBox: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 21,
    backgroundColor: '#E9E9E9',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    width: 150,
    height: 50,
    borderRadius: 10,
    textAlign: 'left',
    paddingHorizontal: 25,
  },
  boxText: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 21,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    fontFamily: 'Mark-Medium',
    fontSize: 19,
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: '#E9E9E9',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    width: 355,
    height: 60,
    borderRadius: 10,
  },
  pickerText: {},
});

export default Payment;
