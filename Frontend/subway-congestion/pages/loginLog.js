import { getLoginLog } from "@/js/Log";
import React from "react";
import { useEffect, useState } from "react";

const LoginHistory = () => {
    // 예시 데이터
    const [loginLog, setLoginLog] = useState({data:[]})
    useEffect(()=>{
        getLoginLog().then((res)=>{
            setLoginLog(res)
        })
    },[])

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-4">Login History</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-200 text-left">id</th>
                            <th className="px-4 py-2 bg-gray-200 text-left">Email</th>
                            <th className="px-4 py-2 bg-gray-200 text-left">Login Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginLog.data.map((login, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{login.email}</td>
                                <td className="px-4 py-2">{login.loginTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoginHistory;
