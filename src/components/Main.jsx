import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, "tweets");

  //tweet koleksiyonundaki verileri anlık olarak al
  useEffect(() => {

    //filtreleme ayarı tanımla
    const q=query(tweetsCol, orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      //geçici dizi
      const tempTweets = [];

      //tüm dökümanları dön
      snapshot.forEach((doc) => {
        tempTweets.push({ id: doc.id, ...doc.data() }); //objelerde bu şekilde yapılır
      });

      //veriyi state aktarma
      setTweets(tempTweets);
    });

    //sayfadan çıkınca aboneliği bitir
    return () => unsub();
  }, []);
  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      <Form user={user} />
      {!tweets ? (
        <Spinner style={"w-6 h-6 mx-auto my-10"}/>
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet}/>)
      )}
    </main>
  );
};

export default Main;
