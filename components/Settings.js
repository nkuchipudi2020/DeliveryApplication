import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Settings({ navigation }) {

    return(
        <View style={styles.container}>
            <Text style={styles.titlesSubtitle}>
                You can edit your personal details here.
                </Text>
                <TextInput  style={styles.textBox} 
                          placeholder="WPI Email" 
                          placeholderTextColor='#7D7D7D'                      
                />
            <TextInput  style={styles.textBox} 
                          placeholder="Password" 
                          placeholderTextColor='#7D7D7D'                      
            />
            <TextInput  style={styles.textBox} 
                          placeholder="Name" 
                          placeholderTextColor='#7D7D7D'                      
            />
            <TextInput  style={styles.textBox} 
                          placeholder="WPI Student ID" 
                          placeholderTextColor='#7D7D7D'                      
            />
          
          <View style={styles.footer}>
          <View style={styles.orientation}>
          
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image style={styles.shopIcon} source={require('../assets/images/shopicondeselect.png')}>
                  </Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.personIcon} source={require('../assets/images/personiconselect.png')}>
                  </Image>
                </TouchableOpacity>
                
          </View>
        
                
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    takeout:{
      marginLeft: 30,
      marginTop: 12,
    },
    container:{
        flex: 1,
      backgroundColor: '#FFFFFF',
    },
    orientation:{
      flexDirection: 'row',
    },
    or:{
      fontFamily: 'Mark-Medium',
      color: '#4A4949',
      fontSize: 18,
      marginLeft: 20,
      marginTop: 25,
    },
    login:{
      fontFamily: 'Mark-Bold',
      color: '#FF0000',
      fontSize: 18,
      marginLeft: 5,
      marginTop: 25,
    },
    button2:{
        backgroundColor: '#FF2A2A',
        height: 40,
        width: 50,
        borderRadius:10,
    },
    signup:{
      backgroundColor: '#FF2A2A',
      height: 50,
    width: 150,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 20,
  },
    buttonDirection:{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      },
    button:{
      borderColor: 'red',
      width: 165,
      height: 165,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 15,
      borderRadius:10,
      borderWidth: 3,
    },
    orientation: {
        flexDirection: 'row',
      },
      footer: {
        backgroundColor: 'white',
        height: 90,
        width: 400,
        marginTop: 310,
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
    button3:{
        borderColor: '#C7C7C7',
        width: 165,
        height: 165,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        borderRadius:10,
        borderWidth: 3,
      },
    button2:{
        backgroundColor: '#FF2A2A',
    height: 50,
    width: 150,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 225,
    marginTop: 15,
    },
    images: {
      width: 40,
      height: 40,
      paddingTop: 20,
    },
    titlesTitle: {
      fontFamily: 'Mark-Bold',
      fontSize: 20,
      color: '#4A4949',
      marginTop:20,
      marginLeft: 20,
      marginRight: 10,
      textAlign: 'center',
    },
    titlesTitle2: {
        fontFamily: 'Mark-Bold',
        fontSize: 23,
        color: '#4A4949',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 10,
        textAlign: 'center',
      },
    titlesDesc:{
        fontFamily: 'Mark-Medium',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
    },
    titlesButton: {
      fontFamily: 'Mark-Bold',
      fontSize: 22,
      color: '#FFFFFF',
        marginTop: 10,
        textAlign: 'center',
      
    },
    
    titlesSub:{
      fontFamily: 'Mark-Bold',
      fontSize: 20,
        marginTop: 6,
      color: '#4A4949',
      textAlign: 'center',
      
    },
    titlesSubtitle:{
        fontFamily: 'Mark-Bold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 20,
        
      },
      titlesSubtitle2:{
        fontFamily: 'Mark-Bold',
        fontSize: 18,
        marginTop: -23,
        marginLeft:50,
        fontColor: 'red'
        
      },
    titlesSub2:{
        fontFamily: 'Mark-Bold',
        fontSize: 20,
        marginTop: -30,
        color: '#4A4949',
        textAlign: 'left',
      },
    textBox:{
        color: '#7D7D7D',
      fontFamily: 'Mark-Medium',
      fontSize: 18,
      backgroundColor: '#E9E9E9',
      marginLeft: 20,
        marginTop: 11,
        marginRight: 20,
        width: 355,
        height: 48,
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
  });

  