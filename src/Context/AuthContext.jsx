
import { createContext, useContext, useEffect, useState } from "react";

import { useJwt } from "react-jwt";
import sessionStorage from "redux-persist/es/storage/session";

export const AuthContext = createContext(null);


export default function ProtectedProvider({children}) {

    const [isChecked, setChecked] = useState(false)
    const [user,setUser] = useState(null);
    const [verify,setVerify] = useState(false);

    let token = sessionStorage.getItem('token');

  useEffect(() => {
    if(token){
        setVerify(true)
    }
  }, [token])
  


    return <AuthContext.Provider value={{isChecked,setChecked,user,setUser,verify,setVerify}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}