import { useGlobalContext } from "./useGlobalContext";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export function useLogin() {
  const { dispatch } = useGlobalContext();

  // login with email and password
  const login = (email, password) => {
    dispatch({ type: "IS_PENDING", error: true });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Welcome comeback !");
        dispatch({ type: "LOGIN", payload: userCredential.user });
        dispatch({ type: "ERROR", error: null });
        dispatch({ type: "IS_PENDING", error: false });
      })
      .catch((error) => {
        const match = error.message.match(/\/([^)]+)/);
        if (match) {
          const extracted_text = match[1];
          toast.error(extracted_text);
          console.log(extracted_text);
        }
        dispatch({ type: "ERROR", error: error.message });
        dispatch({ type: "IS_PENDING", error: false });
      });
  };

  return { login };
}
