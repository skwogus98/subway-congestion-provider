import React, { useEffect, useState } from "react";

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

function RouteCongestion(props) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (props.route) {
            callRoute(props.route.route)
                .then((res) => {
                    if (res) {
                        res.json().then((json) => {
                            if(res.status === 500){
                                alert(json.err)
                            }
                            else{
                                setIsLoading(false);
                            }
                        });
                    }
                })
        }
    }, []);

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
                <div></div>
            )}
        </div>
    );
}

export default RouteCongestion;
