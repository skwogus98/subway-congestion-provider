import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            if (error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

export function getLoginLog() {
    return call("/log", "GET", null)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function getSearchRank() {
    return call("/searchLog", "GET", null)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function addSearchLog(station) {
    return call("/searchLog", "POST", { station: station })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
}
