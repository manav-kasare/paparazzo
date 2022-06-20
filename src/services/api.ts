import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {IUser} from '../constants/types';
import {getToken} from './fcm';

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

export const storeUser = async (id: string, payload: any) => {
  try {
    const token = await getToken();
    const finalPayload = {id, private: true, fcm: [token], ...payload};
    await firestore().collection('users').doc(id).set(finalPayload);
    return {data: finalPayload, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getCurrentUser = () => {
  try {
    const data = auth().currentUser;
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const updateDoc = async (
  collection: string,
  docId: string,
  payload: any,
) => {
  try {
    const data = await firestore()
      .collection(collection)
      .doc(docId)
      .update(payload);
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getDoc = async (collection: string, docId: string) => {
  try {
    const doc = await firestore().collection(collection).doc(docId).get();
    const data = doc.data();
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const searchUsers = async (userId: string, query: string) => {
  try {
    const docs = await firestore()
      .collection('users')
      .where('id', '!=', userId)
      .where('username', '==', query)
      .get();
    const data = docs.docs.map(item => item.data());
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getFollowing = async (userId: string) => {
  try {
    const doc = await firestore()
      .collection('users')
      .doc(userId)
      .collection('following')
      .doc(userId)
      .get();
    const data = doc.data();
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getRequests = async (userId: string) => {
  try {
    const doc = await firestore()
      .collection('users')
      .doc(userId)
      .collection('requests')
      .doc('sent')
      .get();
    const data = doc.data();
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const follow = async (user: any, remoteUser: any) => {
  try {
    // my user
    await firestore()
      .collection('following')
      .doc(user.id)
      .set(
        {
          users: firestore.FieldValue
            ? firestore.FieldValue.arrayUnion(remoteUser)
            : [remoteUser],
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('following')
      .doc(user.id)
      .set({[remoteUser.id]: true}, {merge: true});
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({following: firestore.FieldValue.increment(1)});
    // remote user
    await firestore()
      .collection('followers')
      .doc(remoteUser.id)
      .set({
        users: firestore.FieldValue
          ? firestore.FieldValue.arrayUnion(user)
          : [user],
      });
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('followers')
      .doc(remoteUser.id)
      .set({[user.id]: true}, {merge: true});
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .update({followers: firestore.FieldValue.increment(1)});
    return {data: 'Success', error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const unfollow = async (user: any, remoteUser: any) => {
  try {
    // my user
    await firestore()
      .collection('following')
      .doc(user.id)
      .update({
        users: firestore.FieldValue.arrayRemove(remoteUser),
      });
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('following')
      .doc(user.id)
      .update({[remoteUser.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({following: firestore.FieldValue.increment(-1)});
    // remote user
    await firestore()
      .collection('followers')
      .doc(remoteUser.id)
      .update({
        users: firestore.FieldValue.arrayRemove(user),
      });
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('followers')
      .doc(remoteUser.id)
      .update({[user.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .update({followers: firestore.FieldValue.increment(-1)});
    return {data: 'Success', error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const removeFollower = async (user: any, remoteUser: any) => {
  try {
    // my user
    await firestore()
      .collection('followers')
      .doc(user.id)
      .update({
        users: firestore.FieldValue.arrayRemove(remoteUser),
      });
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('followers')
      .doc(user.id)
      .update({[remoteUser.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({followers: firestore.FieldValue.increment(-1)});
    // remote user
    await firestore()
      .collection('following')
      .doc(remoteUser.id)
      .update({
        users: firestore.FieldValue.arrayRemove(user),
      });
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('following')
      .doc(remoteUser.id)
      .update({[user.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .update({following: firestore.FieldValue.increment(-1)});
    return {data: 'Success', error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const sendFriendRequest = async (user: any, remoteUser: any) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('requests')
      .doc('sent')
      .set({[remoteUser.id]: true}, {merge: true});

    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('requests')
      .doc('received')
      .set({[user.id]: true}, {merge: true});
    const payload = {
      from: user,
      to: remoteUser.id,
    };
    await firestore().collection('requests').add(payload);
  } catch (error) {
    return {error, data: null};
  }
};

export const reject = async (user: any, remoteUser: any, requestId: string) => {
  try {
    await firestore().collection('requests').doc(requestId).delete();
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('requests')
      .doc('received')
      .update({[remoteUser.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('requests')
      .doc('sent')
      .update({[user.id]: firestore.FieldValue.delete()});
    await firestore().collection('requests').doc(requestId).delete();
  } catch (error) {
    return {error, data: null};
  }
};

export const accept = async (user: any, remoteUser: any, requestId: string) => {
  try {
    await firestore().collection('requests').doc(requestId).delete();
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('requests')
      .doc('received')
      .update({[remoteUser.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('requests')
      .doc('sent')
      .update({[user.id]: firestore.FieldValue.delete()});
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('friends')
      .doc(user.id)
      .set(
        {
          users: firestore.FieldValue
            ? firestore.FieldValue.arrayUnion(remoteUser)
            : [remoteUser],
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('friends')
      .doc(remoteUser.id)
      .set(
        {
          users: firestore.FieldValue
            ? firestore.FieldValue.arrayUnion(user)
            : [user],
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({
        friends: firestore.FieldValue.increment(1),
      });
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .update({
        friends: firestore.FieldValue.increment(1),
      });
  } catch (error) {
    return {error, data: null};
  }
};

export const removeFriend = async (user: any, remoteUser: any) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('friends')
      .doc(user.id)
      .set(
        {
          users: firestore.FieldValue
            ? firestore.FieldValue.arrayRemove(remoteUser)
            : [remoteUser],
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('friends')
      .doc(remoteUser.id)
      .set(
        {
          users: firestore.FieldValue
            ? firestore.FieldValue.arrayRemove(user)
            : [user],
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({
        friends: firestore.FieldValue.increment(-1),
      });
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .update({
        friends: firestore.FieldValue.increment(-1),
      });
  } catch (error) {
    return {error, data: null};
  }
};

export const removeRequest = async (user: any, remoteUser: any) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.id)
      .collection('requests')
      .doc('sent')
      .set(
        {
          [remoteUser.id]: firestore.FieldValue.delete(),
        },
        {merge: true},
      );
    await firestore()
      .collection('users')
      .doc(remoteUser.id)
      .collection('requests')
      .doc('sent')
      .set(
        {
          [user.id]: firestore.FieldValue.delete(),
        },
        {merge: true},
      );
  } catch (error) {
    return {error, data: null};
  }
};

export const getRequestsWithId = async (userId: string) => {
  try {
    const response = await firestore()
      .collection('requests')
      .where('to', '==', userId)
      .get();
    const data = response.docs.map(item => ({...item.data(), id: item.id}));
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getFriends = async (userId: string) => {
  try {
    const response = await firestore()
      .collection('users')
      .doc(userId)
      .collection('friends')
      .doc(userId)
      .get();
    const data = response.data();
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};
