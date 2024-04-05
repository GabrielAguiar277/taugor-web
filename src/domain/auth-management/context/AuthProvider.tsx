import { useContext, useState, createContext, useEffect, ReactNode } from "react";
import { auth } from "../../../database/firebaseconfig";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    User
} from "firebase/auth";

interface AuthContextType {
    currentUser: User | null;
    signup?: any;
    signin?: any;
    signout?: any;
    fetchUserLoad?: boolean;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null
});

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode}) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [fetchUserLoad, setFetchUserLoad] = useState(true);


    function signin(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(( userCredentials ) => {
                setCurrentUser(userCredentials.user);
                return userCredentials;
            });
    }

    function signout() {
        return signOut(auth);
    }

    function signup(email: string, password: string, firstName: string, lastName: string){
        return createUserWithEmailAndPassword(auth, email, password)
            .then(( userCredential ) => {
                return updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`
                });
            }).catch((error) => {
                let errorMessage;

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este e-mail já está em uso.';
                        break;
                      case 'auth/weak-password':
                        errorMessage = 'A senha é muito fraca.';
                        break;
                      // Adicione outros códigos de erro conforme necessário
                      default:
                        errorMessage = 'Ocorreu um erro desconhecido.';
                    }
                    // Lançar um novo erro com a mensagem de feedback para ser capturado pelo componente
                    throw new Error(errorMessage)
                }
            );
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);

                console.log(user.displayName);
                setFetchUserLoad(false);
            } else {
                setCurrentUser(null);
                setFetchUserLoad(false);
            }
        });

        return unsubscribe;
    }, []);

    return(
        <AuthContext.Provider value={{
            currentUser,
            signup,
            signin,
            signout,
            fetchUserLoad
        }}>
            {children}
        </AuthContext.Provider>
    );
}