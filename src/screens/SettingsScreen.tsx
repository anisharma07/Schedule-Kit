import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {signIn, signOut, signUp} from '../utils/auth-services';
// interface User {
//   uid: string;
//   displayName: string;
//   photoURL: string;
// }

const SettingsScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      Alert.alert('Sign up successful!');
    } catch (error) {
      Alert.alert('Error:');
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      Alert.alert('Sign in successful!');
    } catch (error) {
      Alert.alert('Error:');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  signInButton: {
    width: 192,
    height: 48,
  },
});

export default SettingsScreen;
