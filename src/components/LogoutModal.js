// components/LogoutModal.js

import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils/ResponsiveScreen';
import { ResponsiveFontValue as RFV } from '../utils/ResponsiveFonts';

const LogoutModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Are you sure you want to logout?</Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalNoButton} onPress={onClose}>
              <Text style={styles.noText}>No</Text>
            </Pressable>
            <Pressable style={styles.modalYesButton} onPress={onConfirm}>
              <Text style={styles.yesText}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: wp(6),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: RFV(16),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(2),
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  modalNoButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: hp(1.5),
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalYesButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: hp(1.5),
    marginLeft: wp(2),
    borderRadius: 10,
    alignItems: 'center',
  },
  noText: {
    color: '#333',
    fontWeight: '600',
  },
  yesText: {
    color: '#fff',
    fontWeight: '600',
  },
});
