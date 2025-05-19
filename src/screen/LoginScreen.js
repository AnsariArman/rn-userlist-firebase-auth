// ✅ Responsive Login Screen with your utils
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { USERLISTSCREEN } from '../navigation/routes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils/ResponsiveScreen';
import { ResponsiveFontValue as RFV } from '../utils/ResponsiveFonts';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import { signIn } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Email Required', 'Please enter your email address.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Password Required', 'Please enter your password.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'The email address you entered is not valid.');
      return;
    }

    setLoading(true);
    signIn(email, password)
      .then(async () => {
        await AsyncStorage.setItem('isUserLoggedIn', 'true'); // Save login flag
        navigation.replace(USERLISTSCREEN);
      })
      .catch(() => Alert.alert('Login Failed', 'Invalid credentials. Please try again.'))
      .finally(() => setLoading(false));
  };


  return (

    <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.gradientBackground}>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoiding}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome 👋</Text>
            <CustomInput
              icon={require('../assets/mail.png')}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <CustomInput
              icon={require('../assets/padlock.png')}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity
              style={styles.gradientButton}

              onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: RFV(24),
    marginBottom: hp(2),
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },


  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: RFV(16),
  },
  gradientButton: {
    paddingVertical: hp(2),
    borderRadius: wp(3),
    alignItems: 'center',
    marginTop: hp(3),
    backgroundColor: '#667eea'
  },

});
