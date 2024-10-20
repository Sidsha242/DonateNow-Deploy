import { createContext, useState } from "react";

const initialContextState = {
  id: 0,
  donor_id: "",
  email: "",
  password: "",
  role: 0,
  token: "", //to store accessToken
};

export const AuthContext = createContext(initialContextState); //created context with initial state ...this data can be accessed only using custom hook

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
