import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../components/Auth";

export const authContext = createContext();

const AuthContext = (props) => {
  const [user, setUser] = useState({});
  // const [apiKey, setApiKey] = useState(null);

  const getApiKeyHandler = async () => {
    return await getDoc(doc(db, "api", "api_key")).data();
  };

  const signupUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), { savedMovies: [] });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const authChanged = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      authChanged();
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        signupUser,
        loginUser,
        logoutUser,
        getApiKeyHandler,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthContext;
