import { resolve } from "styled-jsx/css";
import CongestionStation from "../json/CongestionStation.json";

const serviceKey = "4PSLEPOR1r96MsphjEEtF5lD7GT8Aj2c7GESt5Dm";

export async function congestion(stationName, stationNum, day, time, updnLine) {
    stationName = stationName === "서울역" ? stationName : stationName + "역";
    stationNum = stationNum + "호선";
    day = "THU";
    //time = 172000;
    var stationCode = 0;
    updnLine = 0;
    var congestion = { congestion: 0 };
    for (let station of CongestionStation) {
        if (station.subwayLine === stationNum && station.stationName === stationName) {
            stationCode = station.stationCode;
        }
    }
    await callCongestion(stationCode, day, parseInt(time / 10000)).then((res) => {
        congestion.congestion = findCongestion(res, updnLine, time);
    });
    return congestion;
}

function callCongestion(stationCode, day, hour) {
    let headers = new Headers({
        "Content-Type": "application/json",
        appkey: serviceKey,
    });
    var url = "https://apis.openapi.sk.com/puzzle/congestion-train/stat/stations/" + stationCode + "?"; /*URL*/
    url += "&" + encodeURIComponent("dow") + "=" + encodeURIComponent(day); /**/
    url += "&" + encodeURIComponent("hh") + "=" + encodeURIComponent(hour); /**/
    let options = {
        headers: headers,
        url: url,
        method: "GET",
    };
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    console.log("err");
                    return Promise.reject(json);
                }
                //console.log(json);
                return Promise.resolve(json.contents.stat);
            })
        )
        .catch((error) => {
            return Promise.resolve(null);
        });
}

function findCongestion(congestionData, updnLine, time) {
    console.log(congestionData)
    for (let data of congestionData) {
        if (data.updnLine === updnLine && data.data[parseInt(time / 1000) % 10].congestionTrain != 0) {
            return data.data[parseInt(time / 1000) % 10].congestionTrain;
        }
    }
}
