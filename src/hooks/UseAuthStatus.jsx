import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const UseAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, []);

  return { loggedIn, checkingStatus };
};

export default UseAuthStatus;
