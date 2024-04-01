import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import Navi from "../components/Navi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";


const FeedPage = () => {
    const [user, setUser]=useState(null)

    //kullanıcı bilgilerine abone ol
    useEffect(()=>{

        //kullanıcı oturumunu izle
        const unsub = onAuthStateChanged(auth, (currUser)=>setUser(currUser));

        //sayfadan ayrılırsa oturumu sonlandır
        return()=>unsub();
    }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Navi user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;
