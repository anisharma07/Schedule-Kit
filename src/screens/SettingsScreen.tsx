import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import useStore from '../store/store';
import {TextInput} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

const SettingsScreen: React.FC = () => {
  const {registers, setRegisters} = useStore();
  const [userID, setUserID] = useState<string>('');
  const [register_no, setRegisterNo] = useState<number>(0);
  const [googleUser, setGoogleUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [syncLoading, setSyncLoading] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setGoogleUser(user);
    });
    return unsubscribe;
  }, []);

  const sendUserDataToFirestore = async (user: FirebaseAuthTypes.User) => {
    try {
      await firestore().collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSync: firestore.FieldValue.serverTimestamp(),
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
      Alert.alert('Success', 'Signed in with Google successfully!');
      await sendUserDataToFirestore(userCredential.user);
    } catch (error) {
      console.log('Google Sign-In Error', JSON.stringify(error, null, 2));
      Alert.alert(
        'Sign-In Error',
        'Failed to sign in with Google. Please try again.',
      );
    }
  };

  const handleInputChange = (value: number) => {
    setRegisterNo(Math.min(Object.keys(registers).length - 1, value));
  };

  const confirmSyncData = () => {
    setShowSyncModal(true);
  };

  const handleSyncData = async () => {
    if (!googleUser) {
      return;
    }

    setSyncLoading(true);
    setShowSyncModal(false);

    try {
      const cardsData = registers[0]?.cards || [];
      await firestore().collection('registers').doc(googleUser.uid).set({
        cards: cardsData,
        lastSync: firestore.FieldValue.serverTimestamp(),
        totalCards: cardsData.length,
      });

      Alert.alert(
        'Success',
        'Your data has been synced to the cloud successfully!',
      );
    } catch (error) {
      console.error('Error syncing data: ', error);
      Alert.alert('Sync Error', 'Failed to sync data. Please try again.');
    } finally {
      setSyncLoading(false);
    }
  };

  const handleSyncDownload = async (uid: string, register_num: number) => {
    if (!googleUser || !uid.trim()) {
      Alert.alert('Error', 'Please enter a valid User ID');
      return;
    }

    setDownloadLoading(true);

    try {
      const userDoc = await firestore()
        .collection('registers')
        .doc(uid.trim())
        .get();

      if (!userDoc.exists) {
        Alert.alert('Error', 'No data found for this User ID');
        return;
      }

      const cardData = userDoc.data()?.cards || [];
      setRegisters(register_num, cardData);
      Alert.alert(
        'Success',
        `Downloaded ${cardData.length} cards successfully!`,
      );
    } catch (error) {
      console.error('Error downloading data: ', error);
      Alert.alert(
        'Download Error',
        'Failed to download data. Please try again.',
      );
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setGoogleUser(null);
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error) {
      Alert.alert('Sign-Out Error', 'Failed to sign out. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'User ID copied to clipboard!');
  };

  const renderSyncModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSyncModal}
      onRequestClose={() => setShowSyncModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Image
              source={require('../assets/icons/navigation/settings.png')}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Sync Data to Cloud</Text>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.warningText}>
              ⚠️ This action will replace all your cloud data with current local
              data.
            </Text>
            <Text style={styles.confirmationText}>
              Are you sure you want to sync your current data to the cloud? All
              previous cloud data will be permanently deleted.
            </Text>

            <View style={styles.dataPreview}>
              <Text style={styles.previewTitle}>Data to be synced:</Text>
              <Text style={styles.previewText}>
                📊 {registers[0]?.cards?.length || 0} cards will be uploaded
              </Text>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSyncModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSyncData}>
              <Text style={styles.confirmButtonText}>Sync to Cloud</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderSyncModal()}

      <View style={styles.header}>
        <View style={styles.settingsBox}>
          <Image
            source={require('../assets/icons/navigation/settings.png')}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      {googleUser ? (
        <View style={styles.userSection}>
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                {googleUser.photoURL ? (
                  <Image
                    source={{uri: googleUser.photoURL}}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {googleUser.displayName?.charAt(0) || 'U'}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{googleUser.displayName}</Text>
                <Text style={styles.userEmail}>{googleUser.email}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.userIdContainer}
              onPress={() => copyToClipboard(googleUser.uid)}>
              <Text style={styles.userIdLabel}>User ID (Tap to copy)</Text>
              <Text style={styles.userId} numberOfLines={1}>
                {googleUser.uid}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cloud Sync Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>☁️ Cloud Sync</Text>

            <TouchableOpacity
              style={[styles.syncButton, syncLoading && styles.disabledButton]}
              onPress={confirmSyncData}
              disabled={syncLoading}>
              {syncLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.syncButtonText}>📤 Sync Data to Cloud</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.syncDescription}>
              Upload your current data to cloud storage. This will replace any
              existing cloud data.
            </Text>
          </View>

          {/* Download from User Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📥 Import Data</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>User ID</Text>
              <TextInput
                placeholder="Enter User ID to import data from"
                value={userID}
                onChangeText={setUserID}
                style={styles.textInput}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Register Number</Text>
              <TextInput
                placeholder="0"
                value={register_no.toString()}
                keyboardType="numeric"
                onChangeText={text => handleInputChange(Number(text) || 0)}
                style={styles.textInput}
                placeholderTextColor="#666"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.downloadButton,
                downloadLoading && styles.disabledButton,
              ]}
              onPress={() => handleSyncDownload(userID, register_no)}
              disabled={downloadLoading || !userID.trim()}>
              {downloadLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.downloadButtonText}>Download Data</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign Out Section */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>🚪 Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.signInSection}>
          <View style={styles.signInCard}>
            <Text style={styles.signInTitle}>Connect to Cloud</Text>
            <Text style={styles.signInDescription}>
              Sign in with Google to sync your data across devices and keep your
              information safe in the cloud.
            </Text>

            <TouchableOpacity
              style={styles.googleSignInButton}
              onPress={handleGoogleSignIn}>
              <Text style={styles.googleSignInText}>
                🔐 Sign In with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
    tintColor: '#4F46E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#4F46E5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContent: {
    marginBottom: 24,
  },
  warningText: {
    fontSize: 16,
    color: '#F59E0B',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 20,
    marginBottom: 16,
  },
  dataPreview: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#404040',
  },
  previewTitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  previewText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // User Section Styles
  userSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  userIdContainer: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#404040',
  },
  userIdLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#4F46E5',
    fontFamily: 'monospace',
  },

  // Section Card Styles
  sectionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },

  // Button Styles
  syncButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  googleSignInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  googleSignInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },

  // Input Styles
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#262626',
    borderColor: '#404040',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#FFFFFF',
  },
  syncDescription: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Sign In Section
  signInSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  signInCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  signInDescription: {
    fontSize: 16,
    color: '#B3B3B3',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});

export default SettingsScreen;
