import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AuthPage = () => {
  //ihtiyaca göre giriş yap kaydol butonu değişecek
  const [isSignUp, setIsSignUp] = useState(false);

  //createUserWithEmailAndPassword için gerekli olan email ve şifre
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //şifrenizi mi unuttunuz yazısı için
  const [isError, setIsError] = useState(false)

   //griş işleminin neden başarısız olduğunu gösterir
   const navigate = useNavigate();

  //formun gönderilmesi
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      //eğer kaydolma modundaysa
      createUserWithEmailAndPassword(auth, email, pass) //firebase dökümantasyonundan alındı bu kod
        .then(() => {
            toast.info("Hesabınız başarılı bir şekilde oluşturuldu.")
        navigate("/home")
        }) //başarılı olursa
        .catch((err) => 
          toast.error(err.code)); //başarısız olursa
    } else {
      //eğer giriş yap modundaysa
      signInWithEmailAndPassword(auth, email, pass)
      .then(()=>{
        toast.info("Hesabınıza giriş yapıldı")
        navigate("/home")
      })
      .catch((err)=>{
        // şifre hatası varsa stati güncelle
        if (err.code==="auth/invalid-credential"){
            toast.error(`Üzgünüz bir hata oluştu: ${err.code}`)
            setIsError(true);
        }
    })
    }
  };

  //şifremi unuttum maili gönder
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
    .then(()=> {
        toast.info("E-postanıza şifre sıfırlama bağlantısı gönderildi")
    })
  }

  //google hesabı ile oturum açma
  const loginWithGoogle= ()=>{
    signInWithPopup(auth, provider)
    .then(()=>navigate("/home"))
  }

  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="logo" />
        </div>
        <h1 className="text-center font-bold text-xl">X'e giriş yap</h1>

        {/* googlebutonu */}
        <button onClick={loginWithGoogle} className="flex items-center bg-white py-2 px-10 rounded-full text-black gap-3 transition hover:bg-gray-300">
          <img className="h-[20px]" src="/google-logo.svg" alt="GoogleLogo" />
          <span>Google ile Giriş Yap</span>
        </button>

        {/* giriş Formu  */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label> Email </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
          />

          <label className="mt-5">Şifre </label>
          <input
            onChange={(e) => setPass(e.target.value)}
            required
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className="mt-5 flex gap-3">
            <span className="text-gray-500">
              {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer"
            >
              {isSignUp ? "Giriş Yap" : "Kaydolun"}
            </span>
          </p>
        </form>
        {isError && ( <p onClick={sendMail} className="text-center text-red-500 cursor-pointer">
          Şifrenizi mi unuttunuz?
        </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
