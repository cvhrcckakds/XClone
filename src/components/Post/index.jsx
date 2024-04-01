import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import "moment/locale/tr";
import {
  arrayRemove,
  arrayUnion,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import { useState } from "react";
import EdiitMode from "./EdiitMode";

const Post = ({ tweet }) => {
  //Düzenleme modu
  const [isEditMode, setIsEditMode] = useState(false);

  //aktif kullanıcı bu tweetin like dizisi içinde var mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //tweetin atılma zamanı şimdiden ne kadar önce atılmış hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  //Like işlemleri
  const handLike = async () => {
    //gönderi dökümanın likes dizisine oturumu açık olan kullanıcının id'sini ekle
    //dökümanın referansını al
    const ref = doc(db, "tweets", tweet.id);

    //dökümanın bir değerini güncelle
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) //like varsa kaldır
        : arrayUnion(auth.currentUser.uid), //like yoksa ekle
    });
  };

  //Tweeti kaldır
  const handleDelete = async () => {
    if (confirm("Gönderiyi silmeyi onaylıyor musunuz?")) {
      //kaldıracağımız dökümanın referansını al, kullanıcı onayı al
      const tweetRef = doc(db, "tweets", tweet.id);

      //dökümanı kaldır
      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 py-6 px-3 border-b-[1px] border-gray-700">
      <img className="w-12 h-12 rounded-full" src={tweet.user.photo} alt="" />
      <div className="w-full">
        {/* üst kısım kullanıcı bilgileri */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">{tweet.user.name}</p>
            <p className="text-gray-400">{date}</p>
            {tweet.isEdited && <p className="text-gray-400 text-[10px]">düzenlendi</p> }
            
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* orta kısım tweet içeriği*/}
        <div className="my-4">
          {/* Düzenleme modundaysa editMode bileşenini ekrana bas */}
          {isEditMode && (
            <EdiitMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}

          {tweet.textContent && !isEditMode && <p>{tweet.textContent}</p>}

          {tweet.textContent && !isEditMode && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* alt kısım etkileşim butonları */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <FaRetweet />
          </div>

          <div
            onClick={handLike}
            className="flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
