import {createContext, useContext, useState} from "react";
import {Navigate, Route} from "react-router-dom";

const AuthContext=createContext(null);
export const AuthProvider = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> : <Navigate to={redirectTo}/>
};

export const useAuth= ()=> useContext(AuthContext);