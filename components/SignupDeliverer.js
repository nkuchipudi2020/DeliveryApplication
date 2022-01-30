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
import {Auth} from '../Setup';
import {SignUpUser, submitUser} from '../firebase/apiService';

function SignupDeliverer({navigation}) {
  const [Id, setId] = React.useState();
  const [SchoolId, setSchoolId] = React.useState('');
  const [Name, setName] = React.useState('');
  const [BankAccountNumber, setBankAccountNumber] = React.useState('');
  const [BankAccountName, setBankAccountName] = React.useState('');
  const [user, setUser] = React.useState();
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
  });

  const signUp = () => {
    SignUpUser(state.emailAddress, state.password)
      .then(data => {
        alert(data);
        navigation.navigate('DelivererHome');
      })
      .catch(error => {
        alert(error);
      });
  };

  const saveDeliverer = () => {
    submitUser(Id, SchoolId, Name, state)
      .then(result => {
        setId(null);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.button3}>
          <Image
            source={require('../assets/images/takeout.png')}
            style={styles.takeout}></Image>
          <Text style={styles.titlesSub}>Orderer</Text>
          <Text style={styles.titlesDesc}>Ordering delivery for food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignupDeliverer')}
          style={styles.button}
          marginTop={-200}>
          <Image
            source={require('../assets/images/delivered.png')}
            style={styles.takeout}></Image>
          <Text style={styles.titlesSub}>Deliverer</Text>
          <Text style={styles.titlesDesc}>Delivering food orders</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.titlesTitle2}>Sign up</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Email"
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
        <TextInput
          style={styles.textBox}
          placeholder="Name"
          placeholderTextColor="#7D7D7D"
        />
        <TextInput
          style={styles.textBox}
          placeholder="WPI Student ID"
          placeholderTextColor="#7D7D7D"
        />
        <TextInput
          style={styles.textBox}
          placeholder="Bank Account Number"
          placeholderTextColor="#7D7D7D"
        />
        <TextInput
          style={styles.textBox}
          placeholder="Bank Account Name"
          placeholderTextColor="#7D7D7D"
        />
      </View>

      <View style={styles.orientation}>
        <Text style={styles.or}>Have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginDeliverer')}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={signUp}>
          <Text style={styles.titlesButton}>Sign up</Text>
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
  orientation: {
    flexDirection: 'row',
  },
  signup: {
    backgroundColor: '#FF2A2A',
    height: 50,
    width: 150,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 20,
  },
  or: {
    fontFamily: 'Mark-Medium',
    color: '#4A4949',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 25,
  },
  login: {
    fontFamily: 'Mark-Bold',
    color: '#FF0000',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 25,
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

export default SignupDeliverer;
