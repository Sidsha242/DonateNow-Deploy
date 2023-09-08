import { createContext , useState} from 'react';

const initialContextState = {
    email : '',
    password : '',
    role : 0,
    token : ''
}

export const AuthContext = createContext(initialContextState); //json


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext;
