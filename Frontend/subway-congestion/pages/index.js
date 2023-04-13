//import { callApi } from "@/js/CallAPI";
import { useState, useEffect } from "react";

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

    useEffect(() => {
        if (route[0]) {
            callRoute(route[0].route).then((res) => {
                if (res) {
                    res.json().then((json) => {
                        console.log(json);
                    });
                }
            });
        }
    }, [route]);

    useEffect(() => {
        callApi("route")
            .then((response) => {
                if (response != null) {
                    response.json().then((json) => {
                        setRoute(json);
                    });
                } else {
                    alert("경로가 없습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <main>
            {route.map((dat, key) => {
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
            })}
        </main>
    );
}
