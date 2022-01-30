import * as React from 'react';
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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Order from './components/Order';
import Status from './components/Status';
import Signup from './components/Signup';
import SignupDeliverer from './components/SignupDeliverer';
import Home from './components/Home';
import Review from './components/Review';
import Checkout from './components/Checkout';
import OrdererStatus1 from './components/OrdererStatus1';
import OrdererStatus2 from './components/OrdererStatus2';
import OrdererStatus3 from './components/OrdererStatus3';
import DelivererStatus1 from './components/DelivererStatus1';
import DelivererStatus2 from './components/DelivererStatus2';
import DelivererStatus3 from './components/DelivererStatus3';
import DelivererHome from './components/DelivererHome';
import LoginDeliverer from './components/LoginDeliverer';
import Settings from './components/Settings';
import DelivererSettings from './components/DelivererSettings';
import {Auth} from './Setup';
import {SignInUser, SignOutUser} from './firebase/apiService';

function Login({navigation}) {
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
  });
  const [user, setUser] = React.useState();
  const signIn = () => {
    SignInUser(state.emailAddress, state.password)
      .then(data => {
        alert(data);
        navigation.navigate('Home');
      })
      .catch(error => {
        alert(error);
      });
  };
  const signOut = () => {
    SignOutUser()
      .then(data => {
        alert(data);
      })
      .catch(error => {
        alert(error);
      });
  };

  const onAuthStateChanged = user => {
    setUser(user);
  };
  React.useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titlesTitle}>Choose account type</Text>
      <View style={styles.buttonDirection}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('./assets/images/takeout.png')}
            style={styles.takeout}></Image>
          <Text style={styles.titlesSub}>Orderer</Text>
          <Text style={styles.titlesDesc}>Ordering delivery for food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginDeliverer')}
          style={styles.button3}
          marginTop={-200}>
          <Image
            source={require('./assets/images/delivered.png')}
            style={styles.takeout}></Image>
          <Text style={styles.titlesSub}>Deliverer</Text>
          <Text style={styles.titlesDesc}>Delivering food orders</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titlesTitle}>Login to account</Text>
      <TextInput
        style={styles.textBox}
        placeholder="WPI Email"
        placeholderTextColor="#7D7D7D"
        value={state.emailAddress}
        onChangeText={text => setState({...state, emailAddress: text})}
      />
      <TextInput
        style={styles.textBox}
        placeholder="Password"
        placeholderTextColor="#7D7D7D"
        value={state.password}
        onChangeText={text => setState({...state, password: text})}
      />
      <View style={styles.orientation}>
        <Text style={styles.noAcc}>No account?</Text>
        <TouchableOpacity>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4} onPress={signIn}>
          <Text style={styles.titlesButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  takeout: {
    marginLeft: 30,
    marginTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button2: {
    backgroundColor: '#FF2A2A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginLeft: 240,
    marginRight: 20,
    marginTop: 25,
    borderRadius: 10,
  },
  buttonDirection: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  orientation: {
    flexDirection: 'row',
  },
  noAcc: {
    fontFamily: 'Mark-Medium',
    color: '#4A4949',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 25,
  },
  signup: {
    fontFamily: 'Mark-Bold',
    color: '#FF0000',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 25,
  },
  button: {
    borderColor: 'red',
    width: 165,
    height: 165,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 3,
  },
  button3: {
    borderColor: '#C7C7C7',
    width: 165,
    height: 165,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 3,
  },
  button4: {
    backgroundColor: '#FF2A2A',
    height: 50,
    width: 150,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 30,
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
    marginTop: 20,
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
  titlesDesc: {
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

  titlesSub: {
    fontFamily: 'Mark-Bold',
    fontSize: 20,
    marginTop: 6,
    color: '#4A4949',
    textAlign: 'center',
  },
  titlesSubtitle: {
    fontFamily: 'Mark-Bold',
    fontSize: 18,
    marginTop: -40,
    marginLeft: 20,
  },
  titlesSubtitle2: {
    fontFamily: 'Mark-Bold',
    fontSize: 18,
    marginTop: -23,
    marginLeft: 50,
    fontColor: 'red',
  },
  titlesSub2: {
    fontFamily: 'Mark-Bold',
    fontSize: 20,
    marginTop: -30,
    color: '#4A4949',
    textAlign: 'left',
  },
  textBox: {
    color: '#7D7D7D',
    fontFamily: 'Mark-Medium',
    fontSize: 18,
    backgroundColor: '#E9E9E9',
    marginLeft: 20,
    marginTop: 11,
    marginRight: 20,
    width: 355,
    height: 48,
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
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupDeliverer"
          component={SignupDeliverer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="OrdererStatus1" component={OrdererStatus1} />
        <Stack.Screen name="OrdererStatus2" component={OrdererStatus2} />
        <Stack.Screen name="OrdererStatus3" component={OrdererStatus3} />
        <Stack.Screen name="DelivererStatus1" component={DelivererStatus1} />
        <Stack.Screen name="DelivererStatus2" component={DelivererStatus2} />
        <Stack.Screen name="DelivererStatus3" component={DelivererStatus3} />
        <Stack.Screen name="DelivererHome" component={DelivererHome} />
        <Stack.Screen name="LoginDeliverer" component={LoginDeliverer} />
        <Stack.Screen name="DelivererSettings" component={DelivererSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//<Stack.Screen name="Home" component={HomeScreen} />

export default App;
