import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils/ResponsiveScreen';
import { ResponsiveFontValue as RFV } from '../utils/ResponsiveFonts';

const CustomInput = ({ value, onChangeText, placeholder, icon, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: wp(3),
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  icon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: RFV(16),
    paddingVertical: hp(1.5),
    color: '#000',
  },
});
