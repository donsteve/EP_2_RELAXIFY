import React, {useState} from "react";
import { ToastContainer } from "react-toastify";
import firebase from "./utils/Firebase";
import 'firebase/auth';
import Auth from "./pages/Auth";
import LoggedLayout from "./Layouts/LoggedLayout";

function App() {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);


 firebase.auth().onAuthStateChanged(currentUser => {
    
  if(!currentUser?.emailVerified) {
    firebase.auth().signOut();
    setUser(null);
  } else {
    setUser(currentUser);
  }
  setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }
  
  

return (
  <>
    {!user ? <Auth /> : <LoggedLayout user={user} />}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      puaseOnVisibilityChange
      draggable
      pauseOnHover={false}
    />
  </>
);
}





export default App;
