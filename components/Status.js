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
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddModal from './AddModal';
import SelectDropdown from 'react-native-select-dropdown';
import {deleteOrder, updateOrderStatus} from '../firebase/apiService';
import {Auth, firestore} from '../Setup';
import {orderDisplayData} from '../data/orderData';
import OrderListItem from './OrderListItem';
import Order from './Order';

const pickups = ['Goats Head'];
const dropoffs = ['East Hall', 'Daniels Hall', 'Morgans Hall'];
const user = Auth().currentUser;
//const data = getOrderbyOrderer(user.id);

//props
// class FlatListItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeRowKey: null,
//       arrayHolder: [],
//       newConfirmationNo: '',
//       newPickupLocation: '',
//       newDeliveryLocation: '',
//       newName: '',
//     };
//   }

//   onDelete = () => {
//     const deletingRow = this.state.activeRowKey;
//     flatListData.splice(this.props.index, 1);

//     this.props.parentFlatList.refreshFlatList(deletingRow);
//     deleteOrder(this.state.newConfirmationNo)
//       .then(data => {
//         alert(
//           'Order: ' + this.props.parentFlatList.newConfirmationNo + 'deleted',
//         );
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

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
//               height: 180,
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

//             <View style={styles.detailsOrientation}>
//               <TouchableOpacity onPress={this.onDelete}>
//                 <Image
//                   style={styles.removeIcon}
//                   source={require('../assets/images/remove.png')}></Image>
//               </TouchableOpacity>
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
//         <View
//           style={{
//             height: 1,
//             backgroundColor: 'white',
//           }}></View>
//       </View>
//     );
//   }
// }

// export default class Status extends Component {
//   //props
//   constructor(props) {
//     super(props);
//     this.state = {
//       deletedRowKey: null,
//       show: false,
//       arrayHolder: [],
//       newConfirmationNo: '',
//       newPickupLocation: '',
//       newDeliveryLocation: '',
//       newName: '',
//     };
//   }

//   refreshFlatList = deletedKey => {
//     this.setState(prevState => {
//       return {
//         deletedRowKey: deletedKey,
//       };
//     });
//   };

//   //helper fcn
//   componentDidMount() {
//     this.setState({arrayHolder: [...flatListData]});
//   }

//   //joining data / refresh / push data
//   joinData = () => {
//     const newFood = {
//       confirmationNo: this.state.newConfirmationNo,
//       pickupLocation: this.state.newPickupLocation,
//       deliveryLocation: this.state.newDeliveryLocation,
//       name: this.state.newName,
//     };

//     flatListData.push(newFood);
//     this.setState({arrayHolder: [...flatListData]});
//     this.setState({show: false});
//   };

//   //footer at bottom of flat list to bundle order
//   footer = () => {
//     return (
//       //adding new order
//       <View>
//         <View style={styles.container}>
//           <ScrollView>
//             <TouchableOpacity
//               onPress={() => {
//                 //this.setState({show: true});
//                 this.props.navigation.navigate('Order');
//               }}>
//               <View style={styles.detailsOrientation}>
//                 <Image
//                   style={styles.addIcon}
//                   source={require('../assets/images/add.png')}></Image>
//                 <Text style={styles.addAnother}>Add another order</Text>

//                 <Modal transparent={true} visible={this.state.show}>
//                   <View style={{backgroundColor: 'white', flex: 1}}>
//                     <Text style={styles.titlesDesc}>
//                       Use the information for your order from the Dine on Campus
//                       app.
//                     </Text>
//                     <Text style={styles.titlesTitle}>Confirmation Number</Text>
//                     <TextInput
//                       style={styles.textBox}
//                       placeholder="Enter confirmation number"
//                       placeholderTextColor="#7D7D7D"
//                       onChangeText={text =>
//                         this.setState({newConfirmationNo: text})
//                       }
//                       value={this.state.newConfirmationNo}
//                     />

//                     <Text style={styles.titlesTitle}>Pickup Location</Text>
//                     <SelectDropdown
//                       data={pickups}
//                       buttonStyle={styles.picker}
//                       defaultButtonText={'Select a location'}
//                       buttonTextStyle={styles.boxText}
//                       onSelect={(selectedItem, index) =>
//                         this.setState({newPickupLocation: selectedItem})
//                       }
//                       value={this.state.newPickupLocation}
//                       buttonTextAfterSelection={(selectedItem, index) => {
//                         return selectedItem;
//                       }}
//                       rowTextForSelection={(item, index) => {
//                         return item;
//                       }}></SelectDropdown>

//                     <Text style={styles.titlesTitle}>Delivery Location</Text>
//                     <SelectDropdown
//                       data={dropoffs}
//                       buttonStyle={styles.picker}
//                       defaultButtonText={'Select a location'}
//                       buttonTextStyle={styles.boxText}
//                       onSelect={(selectedItem, index) =>
//                         this.setState({newDeliveryLocation: selectedItem})
//                       }
//                       value={this.state.newDeliveryLocation}
//                       buttonTextAfterSelection={(selectedItem, index) => {
//                         return selectedItem;
//                       }}
//                       rowTextForSelection={(item, index) => {
//                         return item;
//                       }}></SelectDropdown>

//                     <Text style={styles.titlesTitle}>Your Name</Text>
//                     <TextInput
//                       style={styles.textBox}
//                       placeholder="Enter name"
//                       placeholderTextColor="#7D7D7D"
//                       onChangeText={text => this.setState({newName: text})}
//                       value={this.state.newName}
//                     />

//                     <TouchableOpacity
//                       style={styles.button}
//                       onPress={this.joinData}>
//                       <Text style={styles.titlesButton}>Next</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </Modal>
//               </View>
//             </TouchableOpacity>
//             <Text style={styles.addAnotherDetails}>
//               Bundle orders for the same pickup and delivery locations.
//             </Text>
//           </ScrollView>
//         </View>
//       </View>
//     );
//   };

//   render() {
//     return (
//       <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
//         <View style={{flex: 1, marginTop: 20, backgroundColor: '#FFFFFF'}}>
//           <FlatList
//             ref={'flatList'}
//             data={orderDisplayData}
//             extraData={this.state}
//             keyExtractor={item => item.id}
//             renderItem={({item, index}) => {
//               //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
//               return (
//                 <FlatListItem
//                   item={item}
//                   index={index}
//                   parentFlatList={this}></FlatListItem>
//               );
//             }}
//             ListFooterComponent={this.footer}></FlatList>
//         </View>
//         <View style={styles.footer}>
//           <TouchableOpacity
//             style={styles.checkoutButton}
//             onPress={() => this.props.navigation.navigate('Review')}>
//             <Text style={styles.titlesButton}>Review Order</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

function Status({navigation}) {
  const ref = firestore().collection('Allorder');
  const user = Auth().currentUser;
  //const [order, setOrder] = useState('');
  const [orderID, setOrderID] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderer, setOrderer] = useState('');
  const [confirmationNo, setConfirmationNo] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [ordererName, setOrdererName] = useState('');
  const [deliverer, setDeliverer] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  const updateAll = () => {
    orderList.forEach(order => {
      const conNo = order.ConfirmationNo;
      console.log(conNo);
      updateOrderStatus(conNo, 'not checkout');
    });
    navigation.navigate('Review');
  };

  const renderItem = ({item}) => (
    <OrderListItem
      phoneNumber = {item.PhoneNumber}
      //confirmationNo={item.ConfirmationNo}
      pickupLocation={item.PickupLocation}
      deliveryLocation={item.DeliveryLocation}
      ordererName={item.OrdererName}
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
            PhoneNumber,
          } = doc.data();
          if (
            Orderer == Auth().currentUser.uid &&
            OrderStatus == 'not reviewed'
          ) {
            list.push({
              ConfirmationNo,
              PickupLocation,
              DeliveryLocation,
              OrdererName,
              PhoneNumber,
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
          renderItem={renderItem}
          //ListFooterComponent={this.footer}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={updateAll}>
          <Text style={styles.titlesButton}>Review Order</Text>
        </TouchableOpacity>
      </View>
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Status;
