import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/AuthProvider";

//Hooks are reusable functions that provide access to state in React
export const useAuth = () => {
  const auth = useContext(AuthContext); //auth variable available in auth context
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out")); //React Hook that lets you add a label to a custom Hook
  return auth; //return auth variable
};

export default useAuth;
