import React, { useEffect } from "react";

export default function StationRoute(props) {
    useEffect(()=>{console.log(props.routes)},[props.routes])
    return (
        <div className="w-full max-w-md mx-auto mt-8">
            {!props.routes ? (
                ""
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Route List</h2>
                    {props.routes.map((route, index) => (
                        <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-bold">도착 시간: </span>
                                    <span>{route.end_st}</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold">소요 시간: </span>
                                <span>{route.time}</span>
                            </div>
                            <div>
                                <span className="font-bold">요금: </span>
                                <span>{route.fee} 원</span>
                            </div>
                            <div>
                                <span className="font-bold">환승 수: </span>
                                <span>{route.transfer}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
