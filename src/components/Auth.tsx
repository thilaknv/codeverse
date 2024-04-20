import {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { AuthProps } from "../../helpers/types";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext<AuthProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<object | null>(
    auth.currentUser
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currUser) => {
      setCurrentUser(currUser);
    });
    return unsubscribe;
  }, []);

  // register
  const signUpWithEmail = async (
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code.split("/")[1];
      setErrorMessage(errorCode);
    }
    //
  };

  // login
  const signInWithEmail = async (
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      const errorCode = error.code.split("/")[1];
      setErrorMessage(errorCode);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error) {
      // console.error(error);
    }
  };

  const logout = async () => await signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
