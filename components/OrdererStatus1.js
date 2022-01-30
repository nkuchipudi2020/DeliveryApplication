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
import OrderListItemTracker from './OrderListItemTracker';
import {Auth, firestore} from '../Setup';

// class FlatListDisplay extends Component {
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           backgroundColor: '#FFFFFF',
//         }}>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             backgroundColor: '#FFFFFF',
//           }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//               height: 130,
//             }}>
//             <View style={styles.detailsOrientation}>
//               <Text style={styles.flatListTitles}>Confirmation Number:</Text>
//               <Text style={styles.flatListDetails}>
//                 {this.props.item.confirmationNo}
//               </Text>
//             </View>

//             <View style={styles.detailsOrientation}>
//               <Text style={styles.flatListTitles}>Pickup Location:</Text>
//               <Text style={styles.flatListDetails}>
//                 {this.props.item.pickupLocation}
//               </Text>
//             </View>

//             <View style={styles.detailsOrientation}>
//               <Text style={styles.flatListTitles}>Delivery Location:</Text>
//               <Text style={styles.flatListDetails}>
//                 {this.props.item.deliveryLocation}
//               </Text>
//             </View>

//             <View style={styles.detailsOrientation}>
//               <Text style={styles.flatListTitles}>Name:</Text>
//               <Text style={styles.flatListDetails}>{this.props.item.name}</Text>
//             </View>

//             <View
//               style={{
//                 borderBottomColor: '#C4C4C4',
//                 borderBottomWidth: 1,
//                 marginLeft: 20,
//                 marginRight: 20,
//                 marginTop: 15,
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default class OrdererStatus1 extends Component {
//   render() {
//     return (
//       <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
//         <Image
//           style={styles.image}
//           source={require('../assets/images/status1.png')}></Image>
//         <Text style={styles.title}>Order waiting to be picked up</Text>
//         <Text style={styles.subtitle}>
//           Order is waiting to be picked up by deliverer at pickup location.
//         </Text>

//         <View
//           style={{
//             borderBottomColor: '#C4C4C4',
//             borderBottomWidth: 1,
//             marginLeft: 20,
//             marginRight: 20,
//             marginTop: 20,
//           }}
//         />
//         <Text style={styles.title}>Order details</Text>
//         <View style={{flex: 1, marginTop: 12, backgroundColor: '#FFFFFF'}}>
//           <FlatList
//             ref={'flatList'}
//             data={flatListData}
//             extraData={this.state}
//             keyExtractor={item => item.id}
//             renderItem={({item, index}) => {
//               //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
//               return (
//                 <FlatListDisplay
//                   item={item}
//                   index={index}
//                   parentFlatList={this}></FlatListDisplay>
//               );
//             }}
//             ListFooterComponent={this.footer}></FlatList>
//         </View>
//       </View>
//     );
//   }
// }

function OrderStatus1({navigation}) {
  const [orderList, setOrderList] = useState([]);

  const renderItem = ({item}) => (
    <OrderListItemTracker
      confirmationNo={item.ConfirmationNo}
      pickupLocation={item.PickupLocation}
      deliveryLocation={item.DeliveryLocation}
      ordererName={item.OrdererName}
    />
  );

  useEffect(navigation => {
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
          if (Orderer == Auth().currentUser.uid && OrderStatus == 'placed') {
            list.push({
              ConfirmationNo,
              PickupLocation,
              DeliveryLocation,
              OrdererName,
            });
          }
          if (Orderer == Auth().currentUser.uid && OrderStatus == 'picked up') {
            navigation.navitate('OrdererStatus2');
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
      <Image
        style={styles.image}
        source={require('../assets/images/status1.png')}></Image>
      <Text style={styles.title}>Order waiting to be picked up</Text>
      <Text style={styles.subtitle}>
        Order is waiting to be picked up by deliverer at pickup location.
      </Text>

      <View
        style={{
          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      />
      <Text style={styles.title}>Order details</Text>
      <View style={{flex: 1, marginTop: 12, backgroundColor: '#FFFFFF'}}>
        <FlatList
          //ref={'flatList'}
          data={orderList}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={this.footer}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 4.0,
    marginTop: 20,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Mark-Bold',
    color: '#4A4949',
    fontSize: 24,
    marginTop: 22,
    marginLeft: 20,
  },
  footer: {
    width: 400,
    marginRight: -1,
    height: 100,
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  subtitle: {
    fontFamily: 'Mark-Medium',
    color: '#A5A5A5',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
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

export default OrderStatus1;
