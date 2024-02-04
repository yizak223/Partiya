import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../config/fireBaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";

export const UserContext = createContext({});

export default function UserProvider({children}){
    const [user, setUser] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [submitedResume, setSubmitedResume] = useState(false)

    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
          setUser({ email: userCredential.email, id: userCredential.uid });
        } else {
          setUser(null);
          setCurrentUser(null); 
        }
      });

      return () => unsubscribe();
    }, []);
          
      useEffect(() =>{
        const fetchCurrentUser = async (userID) =>{
          const currentUserRef = doc(db, "users", userID);
          try{
            const docSnap = await getDoc(currentUserRef);
            setCurrentUser(docSnap.data());
            console.log({currentUser});
          }catch (error){
            console.error("Error retreving current user:", error);
          }
        }
        if (user && user.id) {
          fetchCurrentUser(user.id);
        }
        console.log({user});
      }, [user]);

      const userAuth = getAuth();
    
    const userSignOut = () => {
        signOut(userAuth)
            .then(() => {
              console.log("Signed out");
            })
            .catch((error) => {
              console.error("Error signing out: ", error);
            })
            .finally(() => {
              setUser(null); 
            });
        };
    return(
       <UserContext.Provider value={{user, setUser, userSignOut, currentUser, submitedResume, setSubmitedResume}}>
        {children}
       </UserContext.Provider>
    )
}
