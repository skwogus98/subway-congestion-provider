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
    var url = "http://localhost:3000/api/route";
    let options = {
        headers: headers,
        url: url,
        method: "POST",
        body:JSON.stringify(addr),
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
    const [stationFrom, setStationFrom] = useState({ line: "", stationName: "" });
    const [stationTo, setStationTo] = useState({ line: "", stationName: "" });
    const router = useRouter();

    // 서버 사이드 렌더링 시 로그인 데이터를 체크하여 /login 페이지로 리다이렉션
    useEffect(() => {
        //localStorage.setItem("ACCESS_TOKEN", "aasdf");
        if (getJwtFromLocalStorage() === null) {
            // 서버 사이드 렌더링에서 리다이렉션을 위해 res.writeHead() 등을 사용하여 리다이렉션 처리
            if (typeof window !== "undefined") {
                alert("로그인이 필요합니다.");
                // 클라이언트 사이드 렌더링에서 리다이렉션을 위해 useRouter()의 push() 함수를 사용
                router.push("/login");
            }
        }
    }, []);

    useEffect(()=>{
        setRoute([])
    },[stationFrom, stationTo])

    const [selectedDay, setSelectedDay] = useState(getCurrentDay());
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());

    // 현재 요일 가져오기
    function getCurrentDay() {
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        return days[new Date().getDay()];
    }

    // 현재 시간 가져오기
    function getCurrentTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = Math.floor(now.getMinutes() / 10) * 10;
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    }

    // 현재 시간으로 설정 변경
    const handleSetCurrentTime = () => {
        setSelectedDay(getCurrentDay());
        setSelectedTime(getCurrentTime());
    };

    function getRoute(){
        let time = selectedTime.split(":")
        callApi({"stationFrom":stationFrom, "stationTo":stationTo, "time":time[0] * 10000 + time[1] * 100})
            .then((response) => {
                if (response != null) {
                    response.json().then((json) => {
                        if(json.length==0){
                            alert("해당시간의 경로를 찾을 수 없습니다.")
                        }
                        setRoute(json);
                    });
                } else {
                    alert("경로가 없습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <main>
            <SelectStaion 
            setStationFrom={setStationFrom} setStationTo={setStationTo} stationFrom={stationFrom} stationTo={stationTo} 
            getRoute={getRoute} routes={route} 
            selectedDay={selectedDay} selectedTime={selectedTime} setSelectedDay={setSelectedDay} setSelectedTime={setSelectedTime} handleSetCurrentTime={handleSetCurrentTime}/>
        </main>
    );
}
