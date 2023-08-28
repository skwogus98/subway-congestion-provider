export async function callApi(addr) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    var url = "https://subway-congestion-provider.vercel.app/api/";
    let options = {
        headers: headers,
        url: url + addr,
        method: "GET",
    };
    return await fetch(options.url, options)
        .then((response) => {
            console.log(response);
            response.json().then((json) => {
                if (!response.ok) {
                    console.log("err");
                    return Promise.reject(json);
                }
                console.log(json)
                return json;
            });
        })
        .catch((error) => {
            return Promise.resolve(null);
        });
}
