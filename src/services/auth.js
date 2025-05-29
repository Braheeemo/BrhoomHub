import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Function to sign up a new user
const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user document in Firestore with default values
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      isAdmin: false,
      isApproved: false,
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
};

// Function to log in an existing user
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get the user document from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { success: true, user: { ...user, ...userData } };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
};

// Function to log out the current user
const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
};

export { signup, login, logout };