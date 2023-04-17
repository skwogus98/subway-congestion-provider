import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

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
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                // local 스토리지에 토큰 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                // token이 존재하는 경우 todo 화면으로 리디렉트
                window.location.href = "/";
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.error === "login failed") {
                alert("이메일과 비밀번호가 일치하지 않습니다.");
            }
        });
}

// 회원 가입 요청
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
        .then((response) => {
            if (response.id) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
// 로그아웃
export function signout() {
    // local 스토리지에 토큰 삭제
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/";
}
