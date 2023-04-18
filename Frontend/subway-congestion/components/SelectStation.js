import React, { useEffect, useState } from "react";
import stationsByLine from "../json/SelectStation.json";
import RouteCongestion from "./RouteCongestion";

export default function SelectStaion(props) {
    const [selectedLine, setSelectedLine] = useState("");
    const [selectedStation, setSelectedStation] = useState("");
    const [route, setRoute] = useState([]);

    const handleLineChange = (e) => {
        setSelectedLine(e.target.value);
        setSelectedStation("");
    };
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleToggle = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1);
            setRoute([])
        } else {
            setExpandedIndex(index);
            setRoute(props.routes[expandedIndex])
        }
    };

    // 요일 변경 시
    const handleDayChange = (e) => {
        props.setSelectedDay(e.target.value);
    };

    // 시간 변경 시
    const handleTimeChange = (e) => {
        props.setSelectedTime(e.target.value);
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
                <div className="flex justify-center space-x-4">
                    <select value={props.selectedDay} onChange={handleDayChange} className="w-1/4 p-2 rounded-md">
                        <option value="일요일">일요일</option>
                        <option value="월요일">월요일</option>
                        <option value="화요일">화요일</option>
                        <option value="수요일">수요일</option>
                        <option value="목요일">목요일</option>
                        <option value="금요일">금요일</option>
                        <option value="토요일">토요일</option>
                    </select>

                    <select value={props.selectedTime} onChange={handleTimeChange} className="w-1/4 p-2 rounded-md">
                        {Array.from({ length: 24 * 6 }).map((_, index) => {
                            const hour = Math.floor(index / 6);
                            const minute = (index % 6) * 10;
                            return (
                                <option key={index} value={`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`}>
                                    {`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`}
                                </option>
                            );
                        })}
                    </select>

                    <button onClick={props.handleSetCurrentTime} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        현재 시간
                    </button>
                </div>

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

                <div className="w-full max-w-md mx-auto mt-8 bg-white min-h-96">
                    {!props.routes ? (
                        ""
                    ) : (
                        <div className="bg-white">
                            {props.routes.map((route, index) => (
                                <div key={index} className="border-b-2 p-4 my-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p>
                                                {props.stationFrom.stationName} {"->"} {props.stationTo.stationName}
                                            </p>
                                            <p>시간: {parseInt(route.time / 100) + 1}분</p>
                                            <p>요금: {route.fee}</p>
                                            <p>환승횟수: {route.transfer}</p>
                                        </div>
                                        <button onClick={() => handleToggle(index)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                            상세 정보
                                        </button>
                                    </div>

                                    {expandedIndex == index && (
                                        <div
                                            className="border-t-2 p-4 mt-2"
                                            style={{
                                                maxHeight: expandedIndex > -1 ? "1000px" : "0px",
                                                opacity: expandedIndex > -1 ? "1" : "0",
                                                overflow: "hidden",
                                                transition: "max-height 0.5s ease-out, opacity 0.5s ease-out",
                                            }}
                                        >
                                            <p>역이름: {props.routes[expandedIndex].route.map((station) => station.station_nm).join(", ")}</p>
                                            <p>라인번호: {props.routes[expandedIndex].route.map((station) => station.line_num).join(", ")}</p>
                                            <RouteCongestion route={route} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
