import React, { useState, useEffect } from "react";
import { deleteProfile, editProfile } from "@/js/SignUp";

export default function EditProfile() {
    // localStorage에서 이메일과 사용자 이름 가져오기
    useEffect(() => {
        if (typeof window !== "undefined") {
            setEmail(localStorage.getItem("EMAIL"));
            setUsername(localStorage.getItem("USER_NAME"));
        }
    }, []);

    // useState를 이용하여 현재 비밀번호와 새 비밀번호 상태 관리
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // 현재 비밀번호 변경 이벤트 핸들러
    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    // 새 비밀번호 변경 이벤트 핸들러
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    // 유저이름 변경 이벤트 핸들러
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    // 회원 탈퇴 이벤트 핸들러
    const handleDeleteAccount = () => {
        // 원하는 로직을 추가하시면 됩니다.
        if (confirm("정말 탈퇴하시겠습니까?")) {
            //이벤트
            deleteProfile({ email: email });
        }
    };

    // 회원 정보 수정 이벤트 핸들러
    const handleUserProfileEdit = (e) => {
        e.preventDefault();
        // 원하는 로직을 추가하시면 됩니다.
        console.log("회원 정보 수정 버튼 클릭됨");
        editProfile({ email: localStorage.getItem("EMAIL"), password: currentPassword, newPassword: newPassword, username: username });
    };
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">회원 정보 수정</h1>
            <form onSubmit={handleUserProfileEdit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        이메일
                    </label>
                    <input className="w-full border-gray-300 rounded-md px-4 py-2" type="email" id="email" name="email" value={email} readOnly />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                        사용자 이름
                    </label>
                    <input className="w-full border-gray-300 rounded-md px-4 py-2" type="text" id="username" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                        현재 비밀번호
                    </label>
                    <input
                        className="w-full border-gray-300 rounded-md px-4 py-2"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                        새 비밀번호
                    </label>
                    <input
                        className="w-full border-gray-300 rounded-md px-4 py-2"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between ">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 w-24 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        수정
                    </button>
                </div>
            </form>
            <div className="flex items-center justify-between my-4">
                <button
                    className="bg-red-500 hover:bg-red-700 w-24 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDeleteAccount}
                >
                    회원탈퇴
                </button>
            </div>
        </div>
    );
}
