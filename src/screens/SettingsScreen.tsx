import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import useStore from '../store/store';
import {TextInput} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

// ...existing code...
const cardy = [
  {
    limitType: 'with-absent',
    title: 'Software Eng',
    days: {
      mon: [
        {
          end: '10:0',
          start: '9:0',
        },
      ],
      sun: [],
      sat: [],
      thu: [
        {
          end: '12:0',
          start: '11:0',
        },
      ],
      fri: [
        {
          end: '12:0',
          start: '11:0',
        },
        {
          end: '13:0',
          start: '12:0',
        },
      ],
      wed: [],
      tue: [],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: true,
        date: 'Fri Jan 10 2025 11:47:00 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Thu Jan 09 2025 10:47:00 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Thu Jan 16 2025 11:16:49 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Fri Jan 17 2025 11:51:00 GMT+0530',
      },
      {
        id: 5,
        isPresent: false,
        date: 'Mon Jan 20 2025 14:37:47 GMT+0530',
      },
      {
        id: 6,
        isPresent: false,
        date: 'Thu Jan 23 2025 08:54:57 GMT+0530',
      },
      {
        id: 7,
        isPresent: true,
        date: 'Fri Jan 24 2025 13:15:56 GMT+0530',
      },
      {
        id: 8,
        isPresent: true,
        date: 'Mon Jan 27 2025 15:39:40 GMT+0530',
      },
      {
        id: 9,
        isPresent: true,
        date: 'Thu Jan 30 2025 13:54:27 GMT+0530',
      },
      {
        id: 10,
        isPresent: true,
        date: 'Mon Feb 03 2025 15:12:22 GMT+0530',
      },
      {
        id: 11,
        isPresent: true,
        date: 'Mon Feb 10 2025 16:03:00 GMT+0530',
      },
      {
        id: 12,
        isPresent: false,
        date: 'Thu Feb 13 2025 12:59:00 GMT+0530',
      },
      {
        id: 13,
        isPresent: true,
        date: 'Mon Feb 17 2025 11:31:03 GMT+0530',
      },
      {
        id: 14,
        isPresent: true,
        date: 'Fri Feb 14 2025 12:06:00 GMT+0530',
      },
      {
        id: 15,
        isPresent: true,
        date: 'Fri Jan 10 2025 12:06:00 GMT+0530',
      },
      {
        id: 16,
        isPresent: true,
        date: 'Fri Jan 17 2025 12:06:00 GMT+0530',
      },
      {
        id: 17,
        isPresent: true,
        date: 'Fri Jan 24 2025 12:06:00 GMT+0530',
      },
      {
        id: 18,
        isPresent: false,
        date: 'Mon Mar 03 2025 21:11:03 GMT+0530',
      },
      {
        id: 19,
        isPresent: true,
        date: 'Thu Mar 06 2025 22:06:00 GMT+0530',
      },
      {
        id: 20,
        isPresent: true,
        date: 'Fri Mar 07 2025 23:16:00 GMT+0530',
      },
    ],
    tagColor: '#FF9D23',
    target_percentage: 75,
    hasLimit: false,
    present: 16,
    id: 0,
    total: 20,
  },
  {
    limitType: 'with-absent',
    title: 'Comp Networks',
    days: {
      sun: [],
      mon: [
        {
          end: '11:0',
          start: '10:0',
        },
      ],
      sat: [],
      thu: [],
      fri: [],
      wed: [
        {
          end: '12:0',
          start: '11:0',
        },
      ],
      tue: [
        {
          end: '12:0',
          start: '11:0',
        },
      ],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: false,
        date: 'Mon Jan 20 2025 14:37:45 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Tue Jan 21 2025 11:50:57 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Mon Jan 27 2025 10:57:11 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Tue Jan 28 2025 11:49:11 GMT+0530',
      },
      {
        id: 5,
        isPresent: false,
        date: 'Mon Jan 20 2025 10:03:00 GMT+0530',
      },
      {
        id: 6,
        isPresent: false,
        date: 'Mon Jan 20 2025 10:03:00 GMT+0530',
      },
      {
        id: 7,
        isPresent: true,
        date: 'Tue Feb 04 2025 11:32:38 GMT+0530',
      },
      {
        id: 8,
        isPresent: true,
        date: 'Tue Feb 04 2025 13:06:00 GMT+0530',
      },
      {
        id: 9,
        isPresent: true,
        date: 'Mon Feb 10 2025 11:04:00 GMT+0530',
      },
      {
        id: 10,
        isPresent: true,
        date: 'Tue Feb 18 2025 11:32:54 GMT+0530',
      },
      {
        id: 11,
        isPresent: true,
        date: 'Tue Mar 04 2025 11:47:11 GMT+0530',
      },
    ],
    tagColor: '#8FD14F',
    target_percentage: 75,
    hasLimit: false,
    present: 8,
    id: 1,
    total: 11,
  },
  {
    limitType: 'with-absent',
    title: 'Distributed',
    days: {
      sun: [],
      mon: [],
      thu: [
        {
          end: '17:0',
          start: '16:0',
        },
      ],
      fri: [],
      wed: [
        {
          end: '11:0',
          start: '10:0',
        },
      ],
      sat: [],
      tue: [
        {
          end: '11:0',
          start: '10:0',
        },
      ],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: false,
        date: 'Tue Jan 14 2025 09:23:52 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Wed Jan 15 2025 02:08:00 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Wed Jan 22 2025 02:18:08 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Thu Jan 23 2025 16:39:59 GMT+0530',
      },
      {
        id: 5,
        isPresent: true,
        date: 'Thu Jan 23 2025 16:48:13 GMT+0530',
      },
      {
        id: 6,
        isPresent: true,
        date: 'Tue Feb 04 2025 14:35:50 GMT+0530',
      },
      {
        id: 7,
        isPresent: true,
        date: 'Wed Feb 05 2025 03:31:00 GMT+0530',
      },
      {
        id: 8,
        isPresent: true,
        date: 'Wed Jan 29 2025 03:32:00 GMT+0530',
      },
      {
        id: 9,
        isPresent: false,
        date: 'Tue Feb 18 2025 12:45:00 GMT+0530',
      },
      {
        id: 10,
        isPresent: true,
        date: 'Wed Feb 19 2025 00:17:00 GMT+0530',
      },
      {
        id: 11,
        isPresent: true,
        date: 'Wed Mar 05 2025 19:50:00 GMT+0530',
      },
    ],
    tagColor: '#80C4E9',
    target_percentage: 75,
    hasLimit: false,
    present: 9,
    id: 2,
    total: 11,
  },
  {
    limitType: 'with-absent',
    title: 'Image [DIP]',
    days: {
      mon: [
        {
          end: '16:0',
          start: '15:0',
        },
      ],
      sun: [],
      thu: [
        {
          end: '11:0',
          start: '10:0',
        },
      ],
      fri: [],
      wed: [
        {
          end: '10:0',
          start: '9:0',
        },
      ],
      sat: [],
      tue: [
        {
          end: '15:0',
          start: '14:0',
        },
      ],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: true,
        date: 'Thu Jan 09 2025 01:48:00 GMT+0530',
      },
      {
        id: 2,
        isPresent: false,
        date: 'Tue Jan 14 2025 16:08:00 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Wed Jan 15 2025 09:38:33 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Thu Jan 16 2025 10:51:41 GMT+0530',
      },
      {
        id: 5,
        isPresent: true,
        date: 'Mon Jan 20 2025 15:55:20 GMT+0530',
      },
      {
        id: 6,
        isPresent: true,
        date: 'Tue Jan 21 2025 14:24:34 GMT+0530',
      },
      {
        id: 7,
        isPresent: true,
        date: 'Wed Jan 22 2025 03:53:00 GMT+0530',
      },
      {
        id: 8,
        isPresent: false,
        date: 'Thu Jan 23 2025 08:54:59 GMT+0530',
      },
      {
        id: 9,
        isPresent: true,
        date: 'Mon Jan 27 2025 15:39:49 GMT+0530',
      },
      {
        id: 10,
        isPresent: true,
        date: 'Tue Jan 28 2025 14:26:44 GMT+0530',
      },
      {
        id: 11,
        isPresent: true,
        date: 'Mon Feb 03 2025 15:47:52 GMT+0530',
      },
      {
        id: 12,
        isPresent: true,
        date: 'Mon Feb 10 2025 16:02:43 GMT+0530',
      },
      {
        id: 13,
        isPresent: true,
        date: 'Wed Feb 12 2025 16:04:46 GMT+0530',
      },
      {
        id: 14,
        isPresent: false,
        date: 'Thu Feb 13 2025 12:59:00 GMT+0530',
      },
      {
        id: 15,
        isPresent: true,
        date: 'Mon Feb 17 2025 23:51:00 GMT+0530',
      },
      {
        id: 16,
        isPresent: true,
        date: 'Fri Feb 07 2025 01:48:00 GMT+0530',
      },
      {
        id: 17,
        isPresent: false,
        date: 'Tue Feb 18 2025 14:24:00 GMT+0530',
      },
      {
        id: 18,
        isPresent: false,
        date: 'Mon Mar 03 2025 21:11:00 GMT+0530',
      },
      {
        id: 19,
        isPresent: true,
        date: 'Tue Mar 04 2025 01:12:00 GMT+0530',
      },
      {
        id: 20,
        isPresent: true,
        date: 'Thu Mar 06 2025 22:06:00 GMT+0530',
      },
    ],
    tagColor: '#8FD14F',
    target_percentage: 75,
    hasLimit: false,
    present: 15,
    id: 3,
    total: 20,
  },
  {
    limitType: 'with-absent',
    title: 'BIONANO CY-306',
    days: {
      mon: [],
      sun: [],
      sat: [],
      thu: [
        {
          end: '14:0',
          start: '13:0',
        },
      ],
      fri: [],
      wed: [
        {
          end: '14:0',
          start: '13:0',
        },
      ],
      tue: [
        {
          end: '14:0',
          start: '13:0',
        },
      ],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: false,
        date: 'Tue Jan 14 2025 16:08:04 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Wed Jan 15 2025 13:18:52 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Thu Jan 09 2025 13:18:00 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Thu Jan 16 2025 23:15:32 GMT+0530',
      },
      {
        id: 5,
        isPresent: true,
        date: 'Tue Jan 21 2025 14:24:36 GMT+0530',
      },
      {
        id: 6,
        isPresent: true,
        date: 'Wed Jan 22 2025 03:53:00 GMT+0530',
      },
      {
        id: 7,
        isPresent: false,
        date: 'Thu Jan 23 2025 08:55:01 GMT+0530',
      },
      {
        id: 8,
        isPresent: true,
        date: 'Tue Jan 28 2025 12:39:08 GMT+0530',
      },
      {
        id: 9,
        isPresent: false,
        date: 'Wed Jan 29 2025 17:43:51 GMT+0530',
      },
      {
        id: 10,
        isPresent: true,
        date: 'Thu Jan 30 2025 13:54:30 GMT+0530',
      },
      {
        id: 11,
        isPresent: true,
        date: 'Tue Feb 04 2025 14:35:40 GMT+0530',
      },
      {
        id: 12,
        isPresent: true,
        date: 'Wed Feb 05 2025 14:05:08 GMT+0530',
      },
      {
        id: 13,
        isPresent: false,
        date: 'Thu Feb 06 2025 21:22:00 GMT+0530',
      },
      {
        id: 14,
        isPresent: true,
        date: 'Wed Feb 12 2025 16:04:00 GMT+0530',
      },
      {
        id: 15,
        isPresent: true,
        date: 'Tue Feb 11 2025 16:04:00 GMT+0530',
      },
      {
        id: 16,
        isPresent: true,
        date: 'Thu Feb 13 2025 17:49:00 GMT+0530',
      },
      {
        id: 17,
        isPresent: true,
        date: 'Wed Feb 19 2025 18:20:00 GMT+0530',
      },
      {
        id: 18,
        isPresent: true,
        date: 'Tue Feb 18 2025 18:20:00 GMT+0530',
      },
      {
        id: 19,
        isPresent: true,
        date: 'Tue Mar 04 2025 01:12:00 GMT+0530',
      },
      {
        id: 20,
        isPresent: true,
        date: 'Wed Mar 05 2025 14:20:20 GMT+0530',
      },
      {
        id: 21,
        isPresent: true,
        date: 'Thu Mar 06 2025 13:26:00 GMT+0530',
      },
    ],
    tagColor: '#2ECC71',
    target_percentage: 75,
    hasLimit: false,
    present: 17,
    id: 4,
    total: 21,
  },
  {
    limitType: 'with-absent',
    title: 'Seminar',
    days: {
      sun: [],
      mon: [
        {
          end: '17:0',
          start: '16:0',
        },
      ],
      sat: [],
      thu: [],
      fri: [
        {
          end: '17:0',
          start: '16:0',
        },
      ],
      wed: [],
      tue: [],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: true,
        date: 'Wed Jan 29 2025 17:44:00 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Wed Feb 05 2025 13:21:28 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Mon Feb 03 2025 16:06:00 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Mon Feb 10 2025 17:08:31 GMT+0530',
      },
      {
        id: 5,
        isPresent: true,
        date: 'Wed Feb 12 2025 16:03:13 GMT+0530',
      },
      {
        id: 6,
        isPresent: true,
        date: 'Mon Mar 03 2025 21:10:57 GMT+0530',
      },
      {
        id: 7,
        isPresent: true,
        date: 'Wed Mar 05 2025 19:50:00 GMT+0530',
      },
    ],
    tagColor: '#FFFFFF',
    target_percentage: 75,
    hasLimit: false,
    present: 7,
    id: 5,
    total: 7,
  },
  {
    limitType: 'with-absent',
    title: 'Image LAB',
    days: {
      sun: [],
      mon: [],
      sat: [],
      thu: [
        {
          end: '16:0',
          start: '14:0',
        },
      ],
      fri: [],
      wed: [],
      tue: [],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: true,
        date: 'Thu Jan 16 2025 23:15:10 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Thu Jan 23 2025 16:40:07 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Thu Feb 13 2025 17:49:33 GMT+0530',
      },
      {
        id: 4,
        isPresent: true,
        date: 'Thu Mar 06 2025 22:07:39 GMT+0530',
      },
    ],
    tagColor: '#FFFFFF',
    target_percentage: 75,
    hasLimit: false,
    present: 4,
    id: 6,
    total: 4,
  },
  {
    limitType: 'with-absent',
    title: 'Networks LAB',
    days: {
      sun: [],
      mon: [],
      sat: [],
      thu: [],
      fri: [
        {
          end: '16:0',
          start: '14:0',
        },
      ],
      wed: [],
      tue: [],
    },
    limit: 10,
    markedAt: [
      {
        id: 1,
        isPresent: true,
        date: 'Fri Jan 17 2025 00:50:00 GMT+0530',
      },
      {
        id: 2,
        isPresent: true,
        date: 'Fri Jan 24 2025 18:30:32 GMT+0530',
      },
      {
        id: 3,
        isPresent: true,
        date: 'Fri Feb 14 2025 01:49:00 GMT+0530',
      },
    ],
    tagColor: '#FFFFFF',
    target_percentage: 75,
    hasLimit: false,
    present: 3,
    id: 7,
    total: 3,
  },
];

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
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
      setGoogleUser(userCredential.user);
      Alert.alert('Signed in with Google!');
      sendUserDataToFirestore(userCredential.user);
    } catch (error) {
      console.log('Google Sign-In Error', JSON.stringify(error, null, 2));
      Alert.alert('Google Sign-In Error: ' + error);
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
          cards: cardy,
        });
        Alert.alert('Data synced successfully!');
      } catch (error) {
        console.error('Error syncing data: ', error);
        Alert.alert('Error syncing data: ' + error);
      }
    }
  };
  const handleSyncDownload = async (uid: string, register_num: number) => {
    if (googleUser) {
      try {
        const userDoc = await firestore()
          .collection('registers')
          .doc(uid)
          .get();
        const cardData = userDoc.data()?.cards || [];
        console.log('Card data: ', cardData);

        setRegisters(register_num, cardData);
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
      <View style={styles.contentContainer2}>
        <View style={styles.settingsBox}>
          <Image
            source={require('../assets/icons/navigation/settings.png')}
            style={styles.iconsStyle}
          />

          <Text style={styles.settingsText}>Settings</Text>
        </View>
      </View>

      {/* ...existing code... */}
      {googleUser ? (
        <View>
          <Text style={styles.inputStyles}>
            Welcome, {googleUser.displayName}!
          </Text>
          <TouchableOpacity onPress={() => copyToClipboard(googleUser.uid)}>
            <Text style={styles.inputStyles}>User Id, {googleUser.uid}</Text>
          </TouchableOpacity>
          <Button title="Sign Out from Google" onPress={handleSignOut} />
          <Button title="Sync Data" onPress={handleSyncData} />

          <Text style={styles.inputStyles}>Copy From user,</Text>
          <TextInput
            placeholder="User Id"
            value={userID}
            onChangeText={text => setUserID(text)}
            style={styles.inputStyles}
          />
          <TextInput
            placeholder="Register No"
            value={register_no.toString()}
            keyboardType="numeric"
            onChangeText={text => handleInputChange(parseFloat(text) || 0)}
            style={styles.inputStyles}
          />

          <Button
            title="Sync Data"
            onPress={() => handleSyncDownload(userID, register_no)}
          />
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...existing code...
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#18181B',
  },
  contentContainer2: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignContent: 'center',
  },
  inputStyles: {
    color: '#fff',
  },
  settingsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flex: 1,
    gap: 10,
  },
  iconsStyle: {width: 25, height: 25},
  settingsText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
