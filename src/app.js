import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";

export default function App() {
    const [weather, setWeather] = useState();
    const [city, setCity] = useState("toronto");
    const [isSubmit, setIsSubmit] = useState();
    const convert_date = (dt, time_zone) => {
        const date = new Date((dt + time_zone) * 1000);
        return date;
    };
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec" ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        Axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=e013e4132d75399cc4dc5e94826b00db`
        ).then((res) => {
            const data = {
                temperature: res.data.main.temp,
                humidity: res.data.main.humidity,
                wind: res.data.wind.speed,
                pressure: res.data.main.pressure,
                max_temp: res.data.main.temp_max,
                min_temp: res.data.main.temp_min,
                icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
                date: convert_date(res.data.dt, res.data.timezone),
                desc: res.data.weather[0].main,
                city: res.data.name
            };
            console.log(data);
            setWeather(data);
        });
    }, [isSubmit]);
    return (
        weather && (
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <div>
                        <div style={{color: "white", fontSize: "30pt", margin: "1rem 0"}}>Weather <b>Forecast</b></div>
                    </div>
                    <div style={{margin: "1rem 0"}}>
                        <Form onSubmit={(event) => {event.preventDefault()
                        setIsSubmit(!isSubmit)}}>
                            <Form.Control onChange={(event) => {setCity(event.target.value)}} placeholder="Enter the city name"></Form.Control>
                        </Form>
                    </div>
                    <div style={{width: "20%", background: "rgba(256, 256, 256, 0.5)", color: "#333333", borderRadius: "20px", padding: "3rem"}}>
                        <div style={{textAlign: "center"}}>
                            <div style={{fontSize: "18pt", fontWeight: "bold", marginBottom: "1rem"}}>{days[weather.date.getDay()]}</div>
                            <div>{months[weather.date.getMonth()]} {weather.date.getDate()} {weather.date.getFullYear()}, {weather.city}</div>
                            <img src={weather.icon}></img>
                            <div style={{fontSize: "24pt", fontWeight: "bold", margin: "1rem 0"}}>{weather.temperature}°C</div>
                            <div style={{fontSize: "18pt", margin: "1rem 0"}}>{weather.desc}</div>
                            <div style={{backgroundColor: "rgba(51,51,51,0.9)", borderRadius: "20px", padding: "1rem",width: "90%", display: "inline-block"}}>
                                <div style={{margin: "0.5rem 0", color: "white"}}><b>Humidity:</b> {weather.humidity}%</div>
                                <div style={{margin: "0.5rem 0", color: "white"}}><b>Wind:</b> {weather.wind}</div>
                                <div style={{margin: "0.5rem 0", color: "white"}}><b>Max Temp:</b> {weather.max_temp}</div>
                                <div style={{margin: "0.5rem 0", color: "white"}}><b>Min Temp:</b> {weather.min_temp}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
