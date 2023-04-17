import React, { useEffect, useState } from "react";
import stationsByLine from "../json/SelectStation.json";
import stationRoute from "./StationRoute";

export default function SelectStaion(props) {
    const [selectedLine, setSelectedLine] = useState("");
    const [selectedStation, setSelectedStation] = useState("");

    const handleLineChange = (e) => {
        setSelectedLine(e.target.value);
        setSelectedStation("");
    };
    return (
        <div className="flex h-screen rounded-md bg-gray-100">
            <div className="w-1/3 bg-gray-200 p-8 rounded-md">
                <div className="min-h-1/6">
                    <h2 className="text-2xl font-bold mb-4">호선 선택</h2>
                    <select
                        value={selectedLine}
                        onChange={handleLineChange}
                        className="w-full px-4 py-2 my-4 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">선택하세요</option>
                        {Object.keys(stationsByLine).map((line, index) => (
                            <option key={index} value={line}>
                                {line}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="h-5/6">
                    {selectedLine && (
                        <div className="h-5/6 overflow-y-auto">
                            <table className="w-full border-collapse">
                                <tbody>
                                    {stationsByLine[selectedLine].map((station, index) => (
                                        <tr key={index} className="cursor-pointer hover:bg-gray-100">
                                            <td className="py-2 px-4 border border-gray-300 flex justify-between">
                                                <div>{station}</div>
                                                <div className="flex">
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-l-lg"
                                                        onClick={() => {
                                                            props.setStationFrom({ line: index, stationName: station });
                                                        }}
                                                    >
                                                        출발
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-r-lg"
                                                        onClick={() => {
                                                            props.setStationTo({ line: index, stationName: station });
                                                        }}
                                                    >
                                                        도착
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-2/3 p-4">
                <div className="w-full mt-2 flex justify-center space-x-4">
                    <div className="p-2 bg-white rounded-lg flex">
                        <div className="py-2 px-4 border-r-2 gray-500">출발역</div>
                        <div className="py-2 px-4">{props.stationFrom.stationName}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg flex">
                        <div className="py-2 px-4 border-r-2 gray-500">도착역</div>
                        <div className="py-2 px-4">{props.stationTo.stationName}</div>
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={props.getRoute}>
                        검색
                    </button>
                </div>
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
            </div>
        </div>
    );
}
