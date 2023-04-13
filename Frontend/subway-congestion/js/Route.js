import { resolve } from "styled-jsx/css";
import RouteStation from "../json/RouteStation.json";

//env 필요
const serviceKey = "Uv%2FK1UoTGrRYC0Rih%2FYZCegc6QCLg1QoiZTnd37b5GbSXtFk3HX67IzRZzxSXBOoOPMbbegMlLrqpF2sGKvokw%3D%3D";

export async function routeApi(deptStationName, destStationName, time) {
    deptStationName = "서울역";
    destStationName = "한양대";
    time= 172000
    let dept = [];
    let dest = [];
    let routesJson = [];
    for (let station of RouteStation) {
        if (station.station_name == deptStationName) {
            dept.push(station.station_code.length == 3 ? "0" + station.station_code : station.station_code);
        } else if (station.station_name == destStationName) {
            dest.push(station.station_code.length == 3 ? "0" + station.station_code : station.station_code);
        }
    }
    let promises = [];
    for (let deptCode of dept) {
        for (let destCode of dest) {
            promises.push(
                new Promise((resolve, reject) => {
                    resolve(callRoute(deptCode, destCode, time));
                }).then((json)=>{
                    routesJson.push(json)
                })
            );
        }
    }
    await Promise.all(promises).then(() => {
        //console.log(routesJson);
    });
    /*
    {
        "station_cd": "0426",
        "station_nm": "서울역",
        "timestamp": "172230",
        "train_code": "4638K", //parseInt 후 %2 결과로 상행하행 구분
        "line_num": "4",
        "transfer_loc": null
    }
    */
    return routesJson;
}

function callRoute(deptStationNum, destStationNum, time) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    var url = "http://apis.data.go.kr/B553766/smt-path/path"; /*URL*/
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /*Service Key*/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
    queryParams += "&" + encodeURIComponent("dept_station_code") + "=" + encodeURIComponent(deptStationNum); /**/
    queryParams += "&" + encodeURIComponent("dest_station_code") + "=" + encodeURIComponent(destStationNum); /**/
    queryParams += "&" + encodeURIComponent("week") + "=" + encodeURIComponent("DAY"); /**/
    queryParams += "&" + encodeURIComponent("search_type") + "=" + encodeURIComponent("FASTEST"); /**/
    queryParams += "&" + encodeURIComponent("first_last") + "=" + encodeURIComponent(""); /**/
    queryParams += "&" + encodeURIComponent("dept_time") + "=" + encodeURIComponent(time); /**/
    queryParams += "&" + encodeURIComponent("train_seq") + "=" + encodeURIComponent(""); /**/

    let options = {
        headers: headers,
        url: url + queryParams,
        method: "GET",
    };
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    console.log("err");
                    return Promise.reject(json);
                }
                //console.log(json.data)
                return Promise.resolve(json.data);
            })
        )
        .catch((error) => {
            return Promise.resolve(null);
        });
}
