import React, {useEffect, useRef, useState} from 'react';
import '../styles/plot.css'

const Plot = (
    {width, height, minX, maxX, minY, maxY, radius, points, onClickChart}
)=> {
    const canvasRef = useRef(null);

    const isHit = (coordinate) => {
        const x = coordinate.x
        const y = coordinate.y
        const r = Math.abs(radius)

        if(x >= 0 && y <= 0){
            return x <= r / 2 && y >= -r && y - 2*x + r >= 0;
        }
        if(x >= 0 && y >= 0){
            return x <= r && y <= r;
        }
        if(x <= 0 && y >= 0){
            return x >= - r && y <= r && (x * x + y * y) <= (r * r);
        }

        return false;
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        drawPlot(canvas, context)
        drawPoints(canvas, context)
    }, [width, height, minX, maxX, minY, maxY, radius, points])

    const handleClickOnPlot = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const R = (canvas.height - 50) / 2 / (5 / radius);

        const X = (clickX - centerX) / R * radius;
        const Y = (centerY - clickY) / R * radius;

        onClickChart({X, Y, radius})
    }

    const drawPoints = (canvas, ctx) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const R = (canvas.height - 50) / 2 / (5 / radius);
        points.forEach((point) => {
            ctx.fillStyle = (isHit(point)) ? "green" : "red";
            ctx.beginPath();
            ctx.arc(point.x / radius * R + centerX, -(point.y / radius * R - centerY), 5, 0, 2 * Math.PI);
            ctx.fill();
        })
    }


    const drawPlot = (canvas, ctx) => {
        const R = (canvas.height - 50) / 2 / (5 / Math.abs(radius));

        const centerX = (canvas.width) / 2;
        const centerY = (canvas.height) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(35,103,153,0.8)";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        //третий
        ctx.beginPath();
        ctx.rect(centerX, centerY - R, R, R);
        ctx.closePath();
        ctx.fill();

        //второй
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + R / 2, centerY);
        ctx.lineTo(centerX, centerY + R);
        ctx.closePath();
        ctx.fill();

        //четвертый
        ctx.beginPath();
        ctx.arc(centerX, centerY, R, Math.PI, Math.PI * 3 / 2, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height - 0);
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width - 0, centerY);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.font = "bold 16px Arial ";
        ctx.fillStyle = "black";
        ctx.fillText(`${Math.abs(radius)}`, centerX + R - 5, centerY + 15);
        ctx.fillText(`${Math.abs(radius) / 2}`, centerX + R / 2 - 10, centerY + 15);
        ctx.fillText(`${-Math.abs(radius) / 2}`, centerX - R / 2 - 20, centerY + 15);
        ctx.fillText(`${-Math.abs(radius)}`, centerX - R - 15, centerY + 15);
        ctx.fillText(`${Math.abs(radius)}`, centerX + 5, centerY - R + 5);
        ctx.fillText(`${Math.abs(radius) / 2}`, centerX + 5, centerY - R / 2 + 5);
        ctx.fillText(`${-Math.abs(radius) / 2}`, centerX + 5, centerY + R / 2 + 5);
        ctx.fillText(`${-Math.abs(radius)}`, centerX + 5, centerY + R + 5);
    }

    return (
        <div className="plot">
            <h3>График</h3>
            <div className="chart-container">
                <canvas
                    ref={canvasRef}
                    id="chart"
                    width={width}
                    height={height}
                    onClick={handleClickOnPlot}/>
            </div>
        </div>
    );
}


export default Plot;