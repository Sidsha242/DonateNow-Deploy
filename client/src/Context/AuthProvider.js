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
    return (
       
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext;
