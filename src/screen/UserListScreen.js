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
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils/ResponsiveScreen';
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
    await AsyncStorage.setItem('isUserLoggedIn', 'false'); // Save login flag
     setLogoutModalVisible(false)
     props.navigation.replace(LOGINSCREEN);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#a18cd1', '#fbc2eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <Image source={{ uri: item.picture.large }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text numberOfLines={1} style={styles.name}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.detail}>🎂 Age: {item.dob.age}</Text>
          <Text style={styles.detail}>📞 {item.phone}</Text>
          <Text numberOfLines={1} style={styles.detail}>✉️ {item.email}</Text>
          <Text numberOfLines={1} style={styles.detail}>📍 {item.location.city}, {item.location.state}</Text>
        </View>
      </LinearGradient>
    </View>
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
        style={styles.logoutButton}>
        {/* <LinearGradient
          colors={['#ff6a00', '#ee0979']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoutButton}> */}
          <Text style={styles.logoutText}>Logout</Text>
        {/* </LinearGradient> */}
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(2) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            fetchUsers();
          }} />
        }
      />

      {/* Bottom Modal */}
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
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  logoutButton: {
   
      paddingVertical: hp(2),
      borderRadius: wp(3),
      alignItems: 'center',
      marginTop: hp(3),
      backgroundColor: '#667eea',
  marginHorizontal:wp(8)
  },
  logoutText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: RFV(16),
  },
  cardWrapper: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    borderRadius: wp(4),
  },
  card: {
    flexDirection: 'row',
    borderRadius: wp(4),
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
