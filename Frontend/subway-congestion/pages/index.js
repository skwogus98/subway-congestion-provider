//import { callApi } from "@/js/CallAPI";
import SelectStaion from "@/components/SelectStation";
import StationNode from "@/components/StationNode";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const getJwtFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const serializedJwt = localStorage.getItem("ACCESS_TOKEN");
        return serializedJwt;
    }
};

function callApi(addr) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    var url = "http://localhost:3000/api/";
    let options = {
        headers: headers,
        url: url + addr,
        method: "GET",
    };
    return fetch(options.url, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return Promise.reject(null);
        });
}

function callRoute(route) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    //console.log(route);
    var url = "http://localhost:3000/api/congestion";
    let options = {
        headers: headers,
        url: url,
        method: "POST",
        body: JSON.stringify(route),
    };
    return fetch(options.url, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return Promise.reject(null);
        });
}

export default function Home() {
    const [route, setRoute] = useState([]);

    const router = useRouter();

    // 서버 사이드 렌더링 시 로그인 데이터를 체크하여 /login 페이지로 리다이렉션
    useEffect(() => {
        if (getJwtFromLocalStorage() === null) {
            // 서버 사이드 렌더링에서 리다이렉션을 위해 res.writeHead() 등을 사용하여 리다이렉션 처리
            if (typeof window !== "undefined") {
                alert("로그인이 필요합니다.");
                // 클라이언트 사이드 렌더링에서 리다이렉션을 위해 useRouter()의 push() 함수를 사용
                router.push("/login");
            }
        }
    }, []);

    // useEffect(() => {
    //     if (route[0]) {
    //         callRoute(route[0].route).then((res) => {
    //             if (res) {
    //                 res.json().then((json) => {
    //                     console.log(json);
    //                 });
    //             }
    //         });
    //     }
    // }, [route]);

    // useEffect(() => {
    //     callApi("route")
    //         .then((response) => {
    //             if (response != null) {
    //                 response.json().then((json) => {
    //                     setRoute(json);
    //                 });
    //             } else {
    //                 alert("경로가 없습니다.");
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    return (
        <main>
            <SelectStaion></SelectStaion>
            {/* {route.map((dat, key) => {
                if (dat != null) {
                    return (
                        <div key={key}>
                            <div>{dat.fee}원</div>
                            {dat.route.map((station, k) => {
                                return (
                                    <div key={k}>
                                        {station.station_nm}, {station.line_num}호선
                                    </div>
                                );
                            })}
                            <br />
                        </div>
                    );
                } else {
                    return "";
                }
            })} */}
        </main>
    );
}
