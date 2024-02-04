import { useContext, useState } from "react";
import { auth, db } from "../../config/fireBaseConfig";
import { setDoc, doc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";
import { UserContext } from "../../components/context/User";
import "./Auth.css";


function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  
  const handleToggle = () =>{
      setIsLoginMode(!isLoginMode);
  }
  const changeHandler = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const addUserToDB = async (user) =>{
      try{
          const newUserRef = doc(db, "users", user.uid);
          await setDoc(newUserRef, {email: user.email, id: user.uid, nickname: formData.nickname});
          console.log("User added to the db successfully!");
      } catch(error){
          console.error("Error adding document: ", error);
      }
  };

  const submitHandler = async(e) =>{
      e.preventDefault();
      setIsLoading(true);
      try{
          let userCard;
          if(isLoginMode) {
              userCard = await signInWithEmailAndPassword(auth, formData.email, formData.password);
              console.log("Logged in successfully");
          } else {
              userCard = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
              console.log("Registered successfully");
              await addUserToDB(userCard.user);
          }
          setUser(userCard.user);
           window.location.href = '/';
           } catch (error) {
            console.error("Error: ", error.message);
           } finally{
              setIsLoading(false);
           }
      }
   
   return (
      <div className="authCont">
          {isLoading && 
                  <div className="loading">
                      <img src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" alt="loading" />
                  </div>
          }
          {
              isLoginMode ?
                  <Login submitHandler={submitHandler} changeHandler={changeHandler} />
                  :
                  <SignUp submitHandler={submitHandler} changeHandler={changeHandler} />
          }
          <p className="toggleLog" onClick={handleToggle} >
              {isLoginMode ? "Don't have an account? Register" : "Have an account? Login"}
          </p>
      </div>
  )
}

export default Auth