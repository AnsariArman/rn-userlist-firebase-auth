import auth from '@react-native-firebase/auth';

export const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return auth().signOut();
};
