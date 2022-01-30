import React from 'react';
import {firestore} from '../Setup';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {deleteOrder} from '../firebase/apiService';

function OrderListItem({
  confirmationNo,
  pickupLocation,
  deliveryLocation,
  ordererName,
}) {
  const deleteOrderfromList = () => {
    deleteOrder(confirmationNo)
      .then(alert('Order: ' + confirmationNo + ' is successfully deleted'))
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            height: 180,
          }}>
          <View style={styles.detailsOrientation}>
            <Text style={styles.flatListTitles}>Confirmation Number:</Text>
            <Text style={styles.flatListDetails}>{confirmationNo}</Text>
          </View>

          <View style={styles.detailsOrientation}>
            <Text style={styles.flatListTitles}>Pickup Location:</Text>
            <Text style={styles.flatListDetails}>{pickupLocation}</Text>
          </View>

          <View style={styles.detailsOrientation}>
            <Text style={styles.flatListTitles}>Delivery Location:</Text>
            <Text style={styles.flatListDetails}>{deliveryLocation}</Text>
          </View>

          <View style={styles.detailsOrientation}>
            <Text style={styles.flatListTitles}>Name:</Text>
            <Text style={styles.flatListDetails}>{ordererName}</Text>
          </View>

          <View style={styles.detailsOrientation}>
            <TouchableOpacity onPress={deleteOrderfromList}>
              <Image
                style={styles.removeIcon}
                source={require('../assets/images/remove.png')}></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 1,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 15,
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'white',
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    marginLeft: 20,
  },
  editIcon: {
    marginLeft: 20,
    marginTop: 10,
  },
  footer: {
    width: 400,
    marginRight: -1,
    height: 100,
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 1,
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
    fontFamily: 'Mark-Medium',
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
    marginLeft: 25,
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
    marginLeft: 20,
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

export default OrderListItem;
