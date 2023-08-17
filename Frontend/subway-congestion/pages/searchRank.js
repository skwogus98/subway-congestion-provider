import { getSearchRank } from "@/js/Log";
import React from "react";
import { useEffect, useState } from "react";

const LoginHistory = () => {
    // 예시 데이터
    const [searchRank, setSearchRank] = useState({data:[]})
    useEffect(()=>{
        alert("현재 데이터를 받아올 수 없습니다.")
        // 통계 데이터를 받아오는 코드, 백엔드 서버 사용시 주석 해제 바람
        // getSearchRank().then((res)=>{
        //     setSearchRank(res)
        // })
    },[])

    console.log(searchRank)

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-4">검색 순위</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-200 text-left">rank</th>
                            <th className="px-4 py-2 bg-gray-200 text-left">역</th>
                            <th className="px-4 py-2 bg-gray-200 text-left">검색 횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchRank.data ?
                            (
                                searchRank.data.map((val, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{val[0]}</td>
                                        <td className="px-4 py-2">{val[1]}</td>
                                    </tr>
                                ))
                            ) : ""

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoginHistory;
