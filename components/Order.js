import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import flatListData from '../data/flatListData';
import {orderData, orderDisplayData} from '../data/orderData';
import {submitOrder, createOrder} from '../firebase/apiService';
import {Auth, firestore} from '../Setup';
//import {addOrderTo} from '../controller/orderController'

const pickups = ['Goats Head'];
const dropoffs = ['East Hall', 'Daniels Hall', 'Morgans Hall'];

// class Order extends Component {
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

//   /* function addOrder(){
//       var anOrder = {
//         "confirmationNo" : confirmationNo,
//         "pickupLocation" : pickupLocation,
//         "deliveryLocation" : deliveryLocation,
//         "name" : name
//       }
//       addOrderTo(anOrder, addComplete)
//     } */

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
//     this.props.navigation.navigate('Status');
//   };

//   addOrder = () => {
//     const user = Auth().currentUser;
//     const userid = user.uid;
//     const newFood = {
//       confirmationNo: this.state.newConfirmationNo,
//       pickupLocation: this.state.newPickupLocation,
//       deliveryLocation: this.state.newDeliveryLocation,
//       name: this.state.newName,
//     };
//     createOrder(
//       user.uid,
//       this.state.newConfirmationNo,
//       this.state.newPickupLocation,
//       this.state.newDeliveryLocation,
//       this.state.newName,
//       null,
//       'not reviewed',
//       null,
//     )
//       .then(data => {
//         this.joinData();
//         this.props.navigation.navigate('Status');
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.titlesWrapper}>
//           <Text style={styles.titlesDesc}>
//             Use the information for your order from the Dine on Campus app.
//           </Text>
//           <Text style={styles.titlesTitle}>Confirmation Number</Text>
//           <TextInput
//             style={styles.textBox}
//             placeholder="Enter confirmation number"
//             placeholderTextColor="#7D7D7D"
//             onChangeText={text => this.setState({newConfirmationNo: text})}
//             value={this.state.newConfirmationNo}
//           />

//           <Text style={styles.titlesTitle}>Pickup Location</Text>
//           <SelectDropdown
//             data={pickups}
//             buttonStyle={styles.picker}
//             defaultButtonText={'Select a location'}
//             buttonTextStyle={styles.boxText}
//             onSelect={(selectedItem, index) =>
//               this.setState({newPickupLocation: selectedItem})
//             }
//             value={this.state.newPickupLocation}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}></SelectDropdown>

//           <Text style={styles.titlesTitle}>Delivery Location</Text>
//           <SelectDropdown
//             data={dropoffs}
//             buttonStyle={styles.picker}
//             defaultButtonText={'Select a location'}
//             buttonTextStyle={styles.boxText}
//             onSelect={(selectedItem, index) =>
//               this.setState({newDeliveryLocation: selectedItem})
//             }
//             value={this.state.newDeliveryLocation}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}></SelectDropdown>

//           <Text style={styles.titlesTitle}>Your Name</Text>
//           <TextInput
//             style={styles.textBox}
//             placeholder="Enter name"
//             placeholderTextColor="#7D7D7D"
//             onChangeText={text => this.setState({newName: text})}
//             value={this.state.newName}
//           />

//           <TouchableOpacity style={styles.button} onPress={this.addOrder}>
//             <Text style={styles.titlesButton}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

function Order({navigation}) {
  const ref = firestore().collection('Allorder');
  const user = Auth().currentUser;
  const [order, setOrder] = useState('');
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

  //const newFood = {
  //       confirmationNo: this.state.newConfirmationNo,
  //       pickupLocation: this.state.newPickupLocation,
  //       deliveryLocation: this.state.newDeliveryLocation,
  //       name: this.state.newName,
  //     };

  const addOrder = () => {
    createOrder(
      user.uid,
      confirmationNo,
      pickupLocation,
      deliveryLocation,
      ordererName,
      null,
      'not reviewed',
      null,
    )
      .then(data => {
        orderDisplayData.push(orderList);
        //alert(orderList);
        navigation.navigate('Status');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    return firestore()
      .collection('AllOrder')
      .onSnapshot(querySnapshot => {
        const list = [];
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
          list.push({
            ConfirmationNo,
            PickupLocation,
            DeliveryLocation,
            OrdererName,
          });
        });

        setOrderList(list);

        // if (loading) {
        //   setLoading(false);
        // }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesDesc}>
          Use the information for your order from the Dine on Campus app.
        </Text>
        <Text style={styles.titlesTitle}>Confirmation Number</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter confirmation number"
          placeholderTextColor="#7D7D7D"
          //onChangeText={text => this.setState({newConfirmationNo: text})}
          //value={this.state.newConfirmationNo}
          value={confirmationNo}
          onChangeText={setConfirmationNo}
        />

        <Text style={styles.titlesTitle}>Pickup Location</Text>
        <SelectDropdown
          data={pickups}
          buttonStyle={styles.picker}
          defaultButtonText={'Select a location'}
          buttonTextStyle={styles.boxText}
          // onSelect={(selectedItem, index) =>
          //   this.setState({newPickupLocation: selectedItem})
          // }
          // value={this.state.newPickupLocation}
          value={pickupLocation}
          onSelect={setPickupLocation}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}></SelectDropdown>

        <Text style={styles.titlesTitle}>Delivery Location</Text>
        <SelectDropdown
          data={dropoffs}
          buttonStyle={styles.picker}
          defaultButtonText={'Select a location'}
          buttonTextStyle={styles.boxText}
          // onSelect={(selectedItem, index) =>
          //   this.setState({newDeliveryLocation: selectedItem})
          // }
          // value={this.state.newDeliveryLocation}
          value={deliveryLocation}
          onSelect={setDeliveryLocation}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}></SelectDropdown>

        <Text style={styles.titlesTitle}>Your Name</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter name"
          placeholderTextColor="#7D7D7D"
          // onChangeText={text => this.setState({newName: text})}
          // value={this.state.newName}
          value={ordererName}
          onChangeText={setOrdererName}
        />

        <TouchableOpacity style={styles.button} onPress={() => addOrder()}>
          <Text style={styles.titlesButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Order;
