import React, {useEffect, useState} from 'react';
import Plot from "../components/Plot";
import '../styles/homepage.css'
import '../styles/table.css'
import Form from "../components/Form";
import api from '../PostProcess'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const HomePages = (onLogout) => {
    const [lastR, setLastR] = useState(1)
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            console.log(onLogout);
            window.location.href = "/login";
            onLogout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        const fetchPoints = async () => {
            const points = await api.fetchPoints();
            console.log(typeof points, points)
            const mappedPoints = []
            points.forEach(res => mappedPoints.push(({
                x: res.coordinate.x,
                y: res.coordinate.y,
                r: res.coordinate.r,
                isHit: res.hit,
                createDateTime: res.createDateTime,
                processDateTime: res.processDateTime
            })));
            setResults(mappedPoints);
        };

        fetchPoints();
    }, []);

    const handleClickPlot = async (coordinate) => {
        const point = await api.sendPoint(coordinate)

        console.log(point)
        const res = {
            x: coordinate.X,
            y: coordinate.Y,
            r: coordinate.radius,
            isHit: point.hit,
            createDateTime: point.createDateTime,
            processDateTime: point.processDateTime
        }
        setResults(prevResults => [...prevResults, res]);
    };

    const onClick = async () => {
        await api.deletePoints()
        setResults([])
    }

    const onSubmit = async (coordinate) => {
        const point = await api.sendPoint(coordinate)
        const res = {
            x: coordinate.X,
            y: coordinate.Y,
            r: coordinate.radius,
            isHit: point.hit,
            createDateTime: point.createDateTime,
            processDateTime: point.processDateTime
        }
        console.log(res)
        setResults(prevResults => [...prevResults, res]);
    }

    const changeR = (r) => {
        setLastR(r)
    }


    return (
        <div className="trash">
            <header className="header">
                <h2>Главная страница</h2>
                <p>Елизаров Владислав Павлович | ИСУ: 412938 | Вариант: 42345</p>
            </header>
            <main className="main">
                <div className="inputAndPlot">
                    <Plot
                        height={500} width={500}
                        minX = {-4} maxX={4}
                        minY={-5} maxY={5}
                        radius={lastR}
                        points={results}
                        onClickChart={handleClickPlot}
                    />
                    <Form onSubmit={onSubmit} changeR={changeR} onClick={onClick} handleLogout={handleLogout}/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Результат</th>
                        <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((result) => {
                        return <tr key={result.id}>
                            <td>{result.x.toString().replace('.', ',')}</td>
                            <td>{result.y.toString().replace('.', ',')}</td>
                            <td>{result.r.toString().replace('.', ',')}</td>
                            <td style={{ color: result.isHit ? "green" : "red" }}>
                                {result.isHit ? "hit" : "miss"}
                            </td>
                            <td>{result.createDateTime}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default HomePages;