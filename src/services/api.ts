import auth from '@react-native-firebase/auth';

export const authenticate = async (email: string, password: string) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return {error: null, data: response};
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return await login(email, password);
    }

    if (error.code === 'auth/invalid-email') {
      return {error: 'That email address is invalid!', data: null};
    }
    return {error, data: null};
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return {error: null, data: response};
  } catch (error: any) {
    if (error.code === 'auth/invalid-email')
      return {error: 'That email address is invalid!', data: null};
    else if (error.code === 'auth/wrong-password')
      return {error: 'The entered password is wrong!', data: null};
    return {error, data: null};
  }
};
