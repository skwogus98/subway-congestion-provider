import React, { useEffect, useState } from "react";

function callRoute(route) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
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

function RouteCongestion(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [congestions, setCongestions] = useState([]);
    const [avg, setAvg] = useState([]);
    useEffect(() => {
        if (props.route) {
            callRoute(props.route).then((res) => {
                if (res) {
                    res.json().then((json) => {
                        if (res.status === 500) {
                            alert(json.err);
                        } else {
                            setIsLoading(false);
                            setCongestions(json);
                        }
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        let sum = 0;
        for (let temp of congestions) {
            sum += temp.congestion;
        }
        setAvg(sum / congestions.length);
    }, [congestions]);

    const getCongestionColorClass = (congestion) => {
        if (congestion >= 130) {
          return 'text-red-500';
        } else if (congestion >= 80) {
          return 'text-yellow-500';
        } else {
          return 'text-green-500';
        }
      };

    return (
        <div
            onClick={() => {
                console.log(props.route.route);
            }}
        >
            {isLoading ? (
                <div>
                    <div className="flex flex-col items-center justify-center animate-spin">
                        <div className="loader ease-linear rounded-full border-t-8 border-blue-500 border-solid h-16 w-16 mb-4"></div>
                    </div>
                    <h2 className="text-center text-xl font-semibold text-gray-700">Loading...</h2>
                </div>
            ) : (
                <ul className="list-none list-inside">
                    <li className="text-lg mb-2 border-b-2 pb-4">
                    <span className="font-semibold">평균 혼잡도: </span>
                            <span className={`font-semibold ${getCongestionColorClass(avg)}`}>
                                {avg}%
                            </span>
                    </li>
                    {props.route.route.map((station, index) => (
                        <li key={station.station_cd} className="text-lg mb-2">
                            <span className="font-semibold">{station.station_nm}: </span>
                            <span className={`font-semibold ${getCongestionColorClass(congestions[index].congestion)}`}>
                                {congestions[index].congestion}%
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RouteCongestion;
