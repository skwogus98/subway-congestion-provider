import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signout } from "@/js/SignUp";
import { getBookmark, deleteBookmark } from "@/js/Bookmark";

const getJwtFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const serializedJwt = localStorage.getItem("ACCESS_TOKEN");
        return serializedJwt;
    }
};

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [bookmarks, setBookmarks] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //isLoggedIn = true;
    function handleDropdownToggle() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        if (getJwtFromLocalStorage() === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            getBookmark({email:localStorage.getItem("EMAIL")}).then((res)=>{
                setBookmarks(res)
                console.log(res)
            })
        }
    }, []);

    return (
        <header className="flex items-center justify-between py-4 px-6 bg-gray-800 text-white">
            <div></div>
            <div>
                <Link href={"/"} className="text-2xl font-bold">
                    지하철 혼잡도
                </Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <div className="relative inline-block text-right">
                        <div className="flex items-center cursor-pointer" onClick={handleDropdownToggle}>
                            <p className="text-sm mr-4">안녕하세요, {localStorage.getItem("USER_NAME")}님</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 11l-6-6h12l-6 6z" />
                            </svg>
                        </div>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg text-left">
                                <li className="px-4 py-2">북마크</li>
                                <div className={"border-b-2"}></div>
                                {/* 추가적인 드롭다운 메뉴 아이템들을 여기에 추가할 수 있습니다 */}
                                {
                                    bookmarks.map((val,key)=>{
                                        return(
                                            <li key={key} className="px-4 py-2">
                                                <Link href={"/?stationFrom="+val.stationFrom+"&stationTo="+val.stationTo}>{val.stationFrom}{"->"}{val.stationTo}</Link>
                                                <button className="bg-red-500 hover:bg-red-600 text-white w-6 ml-4 rounded" onClick={()=>deleteBookmark({id:val.id})}>x</button>
                                            </li>
                                            
                                        )
                                    })
                                }
                                <div className={"border-b-2"}></div>
                                <li className="px-4 py-2">
                                    <Link href={"/editprofile"}>
                                        회원정보 수정
                                    </Link>
                                </li>
                                <div className={"border-b-2"}></div>
                                <li className="px-4 py-2">
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={signout}>
                                        로그아웃
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link href={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        로그인
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
