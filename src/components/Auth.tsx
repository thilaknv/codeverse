import {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { AuthProps } from "../../helpers/types";
import { auth, googleProvider } from "../database/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addUser, getUser } from "../database/store";

const AuthContext = createContext<AuthProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [USER, setUSER] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setCurrentUser(currUser);
    });
  }, []);

  useEffect(() => {
    const setUSERHelper = async () => {
      try {
        const user = await getUser("email", currentUser.email);
        setUSER(user);
      } catch (error) {
        console.log(error);
      }
    };

    currentUser && currentUser.email && setUSERHelper();
  }, [currentUser]);

  // register
  const signUpWithEmail = async (
    username: string,
    email: string,
    password: string,
    setErrorMessage: (errorMessage: string) => void
  ) => {
    try {
      const user = await getUser("username", username);
      if (user) {
        throw new Error("username-exists");
      }
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const { email, uid } = userCredentials.user;
          addUser(String(username), String(email), uid);
        }
      );
      return true;
    } catch (error: any) {
      const errorMsg = error.code ? error.code.split("/")[1] : error.message;
      setErrorMessage(errorMsg);
      return false;
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
      return false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredentials) => {
        // adduser to database
        const { email, uid, photoURL } = userCredentials.user;
        if (!email) return;
        const username = email?.split("@")[0];
        addUser(String(username), String(email), uid, photoURL);
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => await signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        USER,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logout,
        setUSER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
