import React from "react";
import { useRef } from "react";

function StationNode() {
    let canvasRef = useRef(null)

    const canvas = canvasRef.current;
    //canvas.strokeStyle = "red"
    //canvas.lineWidth = "20"
    canvas.rect(20,20,0,0)
    return (
        <div>
            <canvas width={"100px"} height={"100px"} ref={canvasRef}></canvas>
        </div>
    );
}

export default StationNode;
