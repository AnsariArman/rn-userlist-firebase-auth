import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utils/ResponsiveScreen';
import { ResponsiveFontValue as RFV } from '../utils/ResponsiveFonts';
import LogoutModal from '../components/LogoutModal';
import Colors from '../utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGINSCREEN } from '../navigation/routes';

const UserListScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api/?results=1000');
      setUsers(res.data.results);
    } catch (err) {
      console.log('Error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    auth().signOut();
    await AsyncStorage.setItem('isUserLoggedIn', 'false');
    setLogoutModalVisible(false);
    props.navigation.replace(LOGINSCREEN);
  };

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={['#a18cd1', '#fbc2eb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardWrapper}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.picture.large }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text numberOfLines={1} style={styles.name}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.detail}>🎂 Age: {item.dob.age}</Text>
          <Text style={styles.detail}>📞 {item.phone}</Text>
          <Text numberOfLines={1} style={styles.detail}>✉️ {item.email}</Text>
          <Text numberOfLines={1} style={styles.detail}>📍 {item.location.city}, {item.location.state}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity
  onPress={() => setLogoutModalVisible(true)}
  activeOpacity={0.8}
  style={styles.logoutWrapper}>
  
    <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(2) }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchUsers();
            }}
          />
        }
      />

      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutWrapper: {
    paddingVertical: hp(2),
    borderRadius: wp(3),
    alignItems: 'center',
    backgroundColor: '#667eea',
    marginHorizontal:wp(5),
    marginVertical:hp(1)
  },
  logoutButton: {
    borderRadius: wp(3),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: RFV(16),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardWrapper: {
    borderRadius: wp(4),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    overflow: 'hidden',
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
    padding: wp(4),
  },
  avatar: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    marginRight: wp(4),
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: RFV(18),
    color: Colors.white,
    marginBottom: hp(0.5),
  },
  detail: {
    color: Colors.white,
    fontSize: RFV(13),
    marginBottom: hp(0.2),
  },
});