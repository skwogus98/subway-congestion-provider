import React, { useState } from "react";

const Header = ({ isLoggedIn, userName }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    isLoggedIn = true
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="flex items-center justify-between py-4 px-6 bg-gray-800 text-white">
            <div>
                <h1 className="text-2xl font-bold">지하철 혼잡도</h1>
            </div>
            <div>
                {isLoggedIn ? (
                    <div className="relative inline-block text-right">
                        <div className="flex items-center cursor-pointer" onClick={handleDropdownToggle}>
                            <p className="text-sm mr-4">안녕하세요, {userName}님</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 11l-6-6h12l-6 6z" />
                            </svg>
                        </div>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg">
                                <li className="px-4 py-2">북마크</li>
                                {/* 추가적인 드롭다운 메뉴 아이템들을 여기에 추가할 수 있습니다 */}
                            </ul>
                        )}
                    </div>
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">로그인</button>
                )}
            </div>
        </header>
    );
};

export default Header;
