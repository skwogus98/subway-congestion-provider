import React, { useState } from "react";

function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // 로그인 처리 로직을 구현한다. (예: API 호출 등)
        // 로그인이 성공하면 isLoggedIn 상태를 true로 설정한다.
        // 실패하면 에러 처리를 한다.
        if (username === "user" && password === "password") {
            setIsLoggedIn(true);
        } else {
            alert("아이디나 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="min-h-fit flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
                </div>
                {isLoggedIn ? (
                    <p className="text-center text-green-500">로그인 되었습니다.</p>
                ) : (
                    <div>
                        <form className="mt-8 mb-4 space-y-6" onSubmit={handleLogin}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="username" className="sr-only">
                                        아이디
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="아이디"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        비밀번호
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="비밀번호"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    로그인
                                </button>
                            </div>
                        </form>

                        <hr/>
                        <br/>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default login;
