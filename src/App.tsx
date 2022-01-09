import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.module.css";
import Auth from "./components/Auth";
import Feed from "./components/Feed";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return <>{user.uid ? <Feed /> : <Auth />}</>;
};

export default App;
