const serviceKey = "Uv%2FK1UoTGrRYC0Rih%2FYZCegc6QCLg1QoiZTnd37b5GbSXtFk3HX67IzRZzxSXBOoOPMbbegMlLrqpF2sGKvokw%3D%3D";

export function routeApi() {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    var url = "http://apis.data.go.kr/B553766/smt-path/path"; /*URL*/
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /*Service Key*/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
    queryParams += "&" + encodeURIComponent("dept_station_code") + "=" + encodeURIComponent("1251"); /**/
    queryParams += "&" + encodeURIComponent("dest_station_code") + "=" + encodeURIComponent("0209"); /**/
    queryParams += "&" + encodeURIComponent("week") + "=" + encodeURIComponent("DAY"); /**/
    queryParams += "&" + encodeURIComponent("search_type") + "=" + encodeURIComponent("FASTEST"); /**/
    queryParams += "&" + encodeURIComponent("first_last") + "=" + encodeURIComponent(""); /**/
    queryParams += "&" + encodeURIComponent("dept_time") + "=" + encodeURIComponent("120001"); /**/
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
                    console.log("err")
                    return Promise.reject(json);
                }
                return json.data;
            })
        )
        .catch((error) => {
            return null
        });
}
