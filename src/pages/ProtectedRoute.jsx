import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom" //Korumalı sayfanın hangi sayfa olduğunu göstermek için kullanılır. bu kullanılımayınca gidilen her sayfada korumalı route yazısı çıkıyordu.
import { auth } from "../firebase/config"

const ProtectedRoute = () => {

const [isAuth, setIsAuth]=useState(null)
//kullanıcının yetkisi var mı
  useEffect(()=>{
    //anlık olarak kullanıcının oturumunu izle

    //herhangi değişimde stati güncelle
    const unsub= onAuthStateChanged(auth, (user)=>{
      if(user){
        setIsAuth(true);
      }else{
        setIsAuth(false)
      }
    });

    //kullanıcı sayfadan ayrılırsa izleyiciyi kaldır
    return()=>unsub();
  },[])

  // yetkisi yoksa logine yönlendir
  if (isAuth===false) return <Navigate to={"/"} />;

  //yetkisi varsa sayfayı göster
  return (
      <Outlet/> 
  )
}

export default ProtectedRoute
