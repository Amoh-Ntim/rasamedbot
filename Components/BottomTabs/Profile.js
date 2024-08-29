import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert, // Import Alert from React Native
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../Mode/ThemeContext';
import * as SystemUI from 'expo-system-ui';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

// ...
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig';

const auth = FIREBASE_AUTH;

const handleDarkModeToggle = async (darkMode) => {
  setForm({ ...form, darkMode });

  // Set the background color based on dark mode
  const backgroundColor = darkMode ? 'black' : 'white';
  await SystemUI.setBackgroundColorAsync(backgroundColor);
};

export default function Profile() {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  }; 

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.replace('SignIn'); // Navigate back to the SignIn screen
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleWhatsAppLink = () => {
    const whatsappUrl = 'https://wa.me/+233206750494';
  
    Linking.openURL(whatsappUrl)
      .then(data => {
        console.log('WhatsApp opened successfully:', data);
      })
      .catch((error) => {
        console.error('Error opening WhatsApp:', error);
      });
  };

  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer}/>

              <Switch
                onValueChange={toggleTheme}
                value={form.darkMode} />
            </View>

            <TouchableOpacity
              onPress={() => handleNavigation('ChangePassword')}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="navigation"
                  size={20} />
              </View>

              <Text style={styles.rowLabel}>Change Password</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon
                  color="#fff"
                  name="at-sign"
                  size={20} />
              </View>

              <Text style={styles.rowLabel}>Email Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={emailNotifications =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications} />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>

              <Text style={styles.rowLabel}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={pushNotifications =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications} />
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                <FeatherIcon color="#fff" name="log-out" size={20} />
              </View>

              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => handleNavigation('Privacy')}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>

              <Text style={styles.rowLabel}>Privacy Policy</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleWhatsAppLink()}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="phone" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us (via whatsapp)</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon color="#fff" name="star" size={20} />
              </View>

              <Text style={styles.rowLabel}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3d3d3d',
    paddingHorizontal: 12,
  },
  rowSpacer: {
    flex: 1,
  },
});
