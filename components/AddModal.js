import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput, Button, Modal
} from 'react-native';

import flatListData from '../data/flatListData';

const pickups = ["Goats Head"];
const dropoffs = ["East Hall", "Daniels Hall", "Morgans Hall"];

export default class AddModal extends Component {



    constructor(props) {
        super(props);
        this.state = {
            newConfirmationNo: '',
            newDeliveryLocation: '',
            newPickupLocation: '',
            newName: '',
        };
    }

    
   
    render(){
        return(
            <Modal style={styles.modalDim}
            onDismiss={() => {
                //alert ("Modal closed");
            }}>
            <Text style = {styles.titlesDesc}>Use the information for your order from
            the Dine on Campus app.</Text>
            <Text style = {styles.titlesTitle}>Confirmation Number</Text>
            <TextInput  style={styles.textBox} 
                            placeholder="Enter confirmation number" 
                            placeholderTextColor='#7D7D7D'
                            onChangeText={(text) => this.setState({newConfirmationNo : text})}
                            value={this.state.newConfirmationNo}                
            />

        <Text style = {styles.titlesTitle}>Pickup Location</Text>
             <SelectDropdown data={pickups} 
                 buttonStyle={styles.picker} 
                defaultButtonText={"Select a location"}  
                buttonTextStyle={styles.boxText}
                onSelect={(selectedItem, index)=> setState({newPickupLocation : selectedItem})}
                value={this.state.newPickupLocation}
                buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                rowTextForSelection={(item, index) => {
            return item
            }} 
 >
        </SelectDropdown>

        <Text style = {styles.titlesTitle}>Delivery Location</Text>
        <SelectDropdown data={dropoffs} 
        buttonStyle={styles.picker}
        defaultButtonText={"Select a location"}
        buttonTextStyle={styles.boxText}
        onSelect={(selectedItem, index)=> setState({newDeliveryLocation : selectedItem})}
        value={this.state.newDeliveryLocation}
        buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
        rowTextForSelection={(item, index) => {
            return item
        }} >
        </SelectDropdown>

        <Text style = {styles.titlesTitle}>Your Name</Text>
        <TextInput  style={styles.textBox}
                            placeholder="Enter name" 
                            placeholderTextColor='#7D7D7D'
                            onChangeText={text => setState({newName : text})}
                            value={this.state.newName}
                             
        />

        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Status')}
       
        >
          <Text style={styles.titlesButton} >
            Next
          </Text>
        </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalDim:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button:{
        backgroundColor: '#FF2A2A',
        paddingHorizontal:30,
        paddingVertical:15,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 50,
        borderRadius:10,
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
      titlesDirections:{
        fontFamily: 'Mark-Medium',
        fontSize: 20,
        color: '#7D7D7D',
        textAlign: 'left',
        paddingTop: 20,
        marginLeft: 5,
        marginRight: 5,
      },
      titlesSubtitle:{
        fontFamily: 'Mark-Bold',
        fontSize: 24,
        color: '#4A4949',
        textAlign: 'left',
      },
      textBox:{
          color: '#7D7D7D',
        fontFamily: 'Mark-Medium',
        fontSize: 21,
        backgroundColor: '#E9E9E9',
        marginLeft: 20,
          marginTop: 10,
          marginRight: 20,
          width: 355,
          height: 60,
          borderRadius:10,
          textAlign: 'left',
          paddingHorizontal: 25,
          
      },
      boxText:{
        color: '#7D7D7D',
        fontFamily: 'Mark-Medium',
        fontSize: 21,
        textAlign: 'left',
        marginLeft: 20,
          marginRight: 20,
      },
      textInput:{
          fontFamily: 'Mark-Medium',
          fontSize: 19,
          backgroundColor: '#E9E9E9',
          paddingHorizontal: 30,
          paddingVertical:15,
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          borderRadius:10,
      },
      picker:{
          backgroundColor: '#E9E9E9',
          marginLeft: 20,
          marginTop: 10,
          marginRight: 20,
          width: 355,
          height: 60,
          borderRadius:10,
         
      },
    
});
