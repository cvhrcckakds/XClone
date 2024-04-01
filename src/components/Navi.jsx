import React from "react";
import { navSections } from "../constants";
import { BiDoorOpen } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navi = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/* Lİnkler */}
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" alt="X-Logo" />

        {navSections.map((section, index) => ( // index değeri key olarak kullanıldı
          <div key={index} className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]">
            {section.icon}
            <span className="max-md:hidden whitespace-nowrap">{section.title}</span>
          </div>
        ))}
      </div>

      {/* Kullanıcı bilgileri */}
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce"></div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center ">
                <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="User" /> {/* alt attribute eklendi */}
                <p className="max-md:hidden">{user.displayName}</p>
            </div>
            <button onClick={()=>signOut(auth)} className="flex justify-center gap-2 p-1 items-center bg-gray-700 text-2xl md:text-[15px] transition hover:bg-gray-800">
            <BiDoorOpen/>
            <span className="max-md:hidden">Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navi;
