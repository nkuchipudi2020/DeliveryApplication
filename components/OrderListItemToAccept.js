import React from 'react';
import {firestore} from '../Setup';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {updateOrderStatusDeliverer} from '../firebase/apiService';
import {Auth} from '../Setup';

function OrderListItemToAccept({
  confirmationNo,
  pickupLocation,
  deliveryLocation,
  ordererName,
  navigation,
}) {
  const acceptOrder = () => {
    updateOrderStatusDeliverer(
      confirmationNo,
      'accepted',
      Auth().currentUser.uid,
    )
      .then(() => {
        alert('order: ' + confirmationNo + ' accepted');
        navigation.navigate('DelivererStatus1');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#F5F5F5',
          borderColor: '#E9E9E9',
          borderWidth: 2,
          height: 100,
          marginTop: 10,
          paddingTop: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            height: 130,
          }}>
          <View style={styles.detailsOrientation}>
            <View>
              <View style={styles.detailsOrientation}>
                <Text style={styles.flatListTitles}>{ordererName}</Text>
                <Text style={styles.flatListDetails}>Order</Text>
              </View>
              <View style={styles.detailsOrientation}>
                <Text style={styles.flatListTitles}>{pickupLocation}</Text>
                <Text style={styles.flatListDetails}>→</Text>
                <Text style={styles.flatListDetails}>{deliveryLocation}</Text>
              </View>
              <View style={styles.detailsOrientation}>
                <Text style={styles.flatListTitles}>$3.00 pay </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.accept} onPress={acceptOrder}>
              <Text style={styles.titlesButton}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  accept: {
    backgroundColor: '#34BE42',
    height: 50,
    width: 100,
    marginLeft: 15,

    marginRight: 15,
    marginTop: 13,
    borderRadius: 10,
  },
  orientation: {
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'white',
    height: 80,
    width: 400,
    marginTop: 60,

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
  addIcon: {
    marginLeft: 20,
  },
  editIcon: {
    marginLeft: 20,
    marginTop: 10,
  },
  feeDetails: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 24,
    marginTop: 15,
    marginLeft: 20,
  },
  feeCost: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 24,
    marginTop: 15,
    marginLeft: 140,
  },
  totalDetails: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 26,
    marginTop: 10,
    marginLeft: 20,
  },
  totalCost: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 26,
    marginTop: 10,
    marginLeft: 215,
  },

  removeIcon: {
    marginLeft: 20,
    marginTop: 10,
  },
  container: {
    flex: 9,
    backgroundColor: 'white',
    marginBottom: 100,
  },
  flatListDetails: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 20,
    marginLeft: 6,
  },
  detailsOrientation: {
    flexDirection: 'row',
  },
  flatListTitles: {
    color: '#4A4949',
    fontFamily: 'Mark-Bold',
    fontSize: 20,
    marginLeft: 15,
  },
  addAnother: {
    color: '#FF0000',
    fontFamily: 'Mark-Bold',
    fontSize: 25,
    marginLeft: 15,
  },

  addAnotherDetails: {
    color: '#8E8E8E',
    fontFamily: 'Mark-Medium',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  titlesTitle: {
    fontFamily: 'Mark-Bold',
    fontSize: 21,
    color: '#4A4949',
    marginTop: 12,

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
    fontFamily: 'Mark-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 10,
    marginLeft: 10,
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
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#FF2A2A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
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
    height: 60,
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
  picker: {
    backgroundColor: '#E9E9E9',
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    width: 355,
    height: 60,
    borderRadius: 10,
  },
});

export default OrderListItemToAccept;
