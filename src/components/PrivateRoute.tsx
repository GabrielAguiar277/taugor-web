import { Navigate } from "react-router-dom";
import { useAuth } from "../domain/auth-management/context/AuthProvider";
import { ReactNode } from "react";
import { LoadingPage } from "./LoadingPage";

export function PrivateRoute({ children }: {children: ReactNode}){
    const { currentUser, fetchUserLoad } = useAuth();
    
    if(fetchUserLoad) {
        return <LoadingPage />
    }

    return currentUser ? children : <Navigate to="/login"/>
}