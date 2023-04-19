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

// 로그인을 위한 API 서비스 메소드 signin
export function getBookmark(userDTO) {
    return call("/bookmark", "POST", userDTO)
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err);
        });
}

export function addBookmark(bookmarkDTO) {
    return call("/bookmark/add", "POST", bookmarkDTO)
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err);
        });
}

export function deleteBookmark(bookmarkDTO) {
    return call("/bookmark", "DELETE", bookmarkDTO)
        .then((response) => {
            window.location.href = "/";
            return response
        })
        .catch((err) => {
            console.log(err);
        });
}

