import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { useState, useEffect } from "react";
import axios from "axios";

let num1 = 0;



function Hi() {


  const [data, setData] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>

    <h1><u>
      Weather App:
      </u></h1>

    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='Enter your city name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />
      <br  />
      <button type="submit">Get Weather</button>

    </form>

    <br />

    {(weather?.name)?

      <div className='basit'>
        <div>Weather of <u>{weather?.name}</u></div>
        <div>Current Temperature : <u>{weather?.main?.temp}°C</u></div>
        <div>Humidity : <u>{weather?.main?.humidity} %</u></div>
        <div>Feels Like : <u>{weather?.main?.feels_like}°C </u></div>
        <div>Pressure : <u>{weather?.main?.pressure} N/m^2 </u></div>
        <div>Speed of Wind : <u>{weather?.wind?.speed} m/s </u></div>
      </div>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));