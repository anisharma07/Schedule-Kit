import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import firestore from '@react-native-firebase/firestore';
import useStore from '../store/store';
import {TextInput} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

// ...existing code...

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const SettingsScreen: React.FC = () => {
  // ...existing code...
  const {registers, setRegisters} = useStore();
  const [userID, setUserID] = useState<string>('');
  const [register_no, setRegisterNo] = useState<number>(0);

  const [googleUser, setGoogleUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const sendUserDataToFirestore = async (user: FirebaseAuthTypes.User) => {
    try {
      await firestore().collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error('Error sending user data to Firestore: ', error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log(userCredential.user);
      setGoogleUser(userCredential.user);
      Alert.alert('Signed in with Google!');
      sendUserDataToFirestore(userCredential.user);
    } catch (error) {
      console.log('Google Sign-In Error: ' + error);
    }
  };

  const handleInputChange = (value: number) => {
    setRegisterNo(Math.min(Object.keys(registers).length - 1, value));
  };

  const handleSyncData = async () => {
    if (googleUser) {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(googleUser.uid)
          .get();
        const userData = userDoc.data();
        console.log('User data: ', userData);
        const cardsData = registers[0].cards.slice(0, 8);
        cardsData.forEach(card => {
          console.log('Card: ', card.title);
        });
        await firestore().collection('registers').doc(googleUser.uid).set({
          cards: cardsData,
        });
        Alert.alert('Data synced successfully!');
      } catch (error) {
        console.error('Error syncing data: ', error);
        Alert.alert('Error syncing data: ' + error);
      }
    }
  };
  const handleSyncDownload = async (uid: string, register_no: number) => {
    if (googleUser) {
      try {
        const userDoc = await firestore()
          .collection('registers')
          .doc(uid)
          .get();
        const cardData = userDoc.data()?.cards || [];
        console.log('Card data: ', cardData);

        setRegisters(register_no, cardData);
        Alert.alert('Data synced successfully!');
      } catch (error) {
        console.error('Error syncing data: ', error);
        Alert.alert('Error syncing data: ' + error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      setGoogleUser(null);
      Alert.alert('Signed out successfully!');
    } catch (error) {
      Alert.alert('Sign-Out Error: ' + error);
    }
  };
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard!');
  };
  return (
    <View style={styles.container}>
      {/* ...existing code... */}
      {googleUser ? (
        <View>
          <Text style={{color: '#fff'}}>
            Welcome, {googleUser.displayName}!
          </Text>
          <TouchableOpacity onPress={() => copyToClipboard(googleUser.uid)}>
            <Text style={{color: '#fff'}}>User Id, {googleUser.uid}</Text>
          </TouchableOpacity>
          <Button title="Sign Out from Google" onPress={handleSignOut} />
          <Button title="Sync Data" onPress={handleSyncData} />

          <Text style={{color: '#fff'}}>Copy From user,</Text>
          <TextInput
            placeholder="User Id"
            value={userID}
            onChangeText={text => setUserID(text)}
            style={{color: '#fff'}}
          />
          <TextInput
            placeholder="Register No"
            value={register_no.toString()}
            keyboardType="numeric"
            onChangeText={text => handleInputChange(parseInt(text) || 0)}
            style={{color: '#fff'}}
          />

          <Button
            title="Sync Data"
            onPress={() => handleSyncDownload(userID, register_no)}
          />
        </View>
      ) : (
        <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...existing code...
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181B',
  },
});

export default SettingsScreen;
