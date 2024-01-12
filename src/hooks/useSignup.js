import { useGlobalContext } from "./useGlobalContext";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

export function useSignup() {
  const { dispatch } = useGlobalContext();

  // login with email and password
  const signup = (displayName, email, password) => {
    dispatch({ type: "IS_PENDING", error: true });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName
        });
        toast.success("Welcome !")
        dispatch({ type: "LOGIN", payload: userCredential.user });
        dispatch({ type: "ERROR", error: null });
        dispatch({ type: "IS_PENDING", error: false });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
        dispatch({ type: "ERROR", error: error.message });
        dispatch({ type: "IS_PENDING", error: false });
      });
  };

  // login with gmail with popup
  const signUpWithGoogleProvider = () => {
    dispatch({ type: "IS_PENDING", payload: true });

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Welcome back !");
        dispatch({ type: "IS_PENDING", payload: false });
        dispatch({ type: "ERROR", payload: null });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
        dispatch({ type: "IS_PENDING", payload: false });
        dispatch({ type: "ERROR", payload: errorMessage });
      });
  };

  return { signUpWithGoogleProvider, signup };
}
