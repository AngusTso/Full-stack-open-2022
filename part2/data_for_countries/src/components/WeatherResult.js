import React from 'react'
const WeatherResult = (props) => {
    console.log(props)
    
    if(props.weather[0]){
        const weather = props.weather[0]
        console.log(weather.weather[0].icon)
        const icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
        return (
            <div>
            <h1>Weather in {props.capital}</h1>
            temperature: {Math.floor(weather.main.temp - 273)} Celcius <br/>
            <img src={icon_url} alt="Weather icon"></img><br/>
            <p>wind: {weather.wind.speed} m/s</p>
            </div>
        )
    }
    else{
        <div>
            No reading currently avaliable
        </div>
    }
}

export default WeatherResult