import React, {Component, useState, useEffect} from 'react';
import {
  AppRegistry,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import flatListData from '../data/flatListData';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddModal from './AddModal';
import SelectDropdown from 'react-native-select-dropdown';
import {securityRules} from 'firebase-admin';
import {firestore} from '../Setup';
import OrderListItemToAccept from './OrderListItemToAccept';

class FlatListOrders extends Component {
  render() {
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
                  <Text style={styles.flatListTitles}>
                    {this.props.item.name}
                  </Text>
                  <Text style={styles.flatListDetails}>Order</Text>
                </View>
                <View style={styles.detailsOrientation}>
                  <Text style={styles.flatListTitles}>
                    {this.props.item.pickupLocation}
                  </Text>
                  <Text style={styles.flatListDetails}>→</Text>
                  <Text style={styles.flatListDetails}>
                    {this.props.item.deliveryLocation}
                  </Text>
                </View>
                <View style={styles.detailsOrientation}>
                  <Text style={styles.flatListTitles}>$3.00 pay </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.accept}
                onPress={() =>
                  this.props.navigation.navigate('DelivererStatus1')
                }>
                <Text style={styles.titlesButton}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//home screen
function DelivererHome({navigation}) {
  const usersCollectionRef = firestore().collection('Allorder');
  const [orderList, setOrderList] = useState([]);
  const fetchData = OrderStatus => {
    usersCollectionRef
      .where('OrdereStatus', '==', OrderStatus)
      .get()
      .then(snapshot => {
        snapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data());
          flatListData.push(documentSnapshot);
        });
      });
  };

  const renderItem = ({item}) => (
    <OrderListItemToAccept
      confirmationNo={item.ConfirmationNo}
      pickupLocation={item.PickupLocation}
      deliveryLocation={item.DeliveryLocation}
      ordererName={item.OrdererName}
      navigation={navigation}
    />
  );

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
          if (OrderStatus == 'placed') {
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
      <View style={{flex: 1, marginTop: 20, backgroundColor: '#FFFFFF'}}>
        <FlatList
          //ref={flatList}
          data={orderList}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={renderItem}></FlatList>
      </View>
      <View style={styles.footer}>
        <View style={styles.orientation}>
          <TouchableOpacity>
            <Image
              style={styles.shopIcon}
              source={require('../assets/images/shopicon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
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

export default DelivererHome;
