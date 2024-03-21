import { useState } from "react"
import './App.css'


const App = () => {
  const api = {
    key:"81c3ed23bedff06a11122417636bb85f",
    base:"https://api.openweathermap.org/data/2.5/weather"
  }
  const[weather,setWeather]=useState({})
  const[search,setSearch]=useState("")
  const[notFound,setNotFound]=useState(false)

  function handle(){
    fetch (`${api.base}?q=${search}&appid=${api.key}`)
    .then(res=>res.json())
    .then(d=>{setWeather(d)
      if(d.cod === "404") {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    console.log(d);
  })
  }

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
  }

  return (
    <div className="Weather">
      <nav className="navi2">
        
        <section className="card">
          <input type="text" placeholder="Search city here..." onChange={(e)=>setSearch(e.target.value)}/>
          <button onClick={handle}>Search</button>
        </section>
        {(typeof weather.main != "undefined" && !notFound)?(
          <div>
            
            <div className="loc">
            <div className="datetime">
              <p>{getCurrentDateTime()}</p>
            </div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            </div>
            <div className="cur">
              <div className="weather-icon">
              <div className="disc">
                <h3>{`Weather:${weather.weather[0].description.toUpperCase()}`}</h3>
              
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
              </div>
              </div>
              <div className="temp">
                <h3>Temperature:<span>{`${(weather.main.temp - 273.15).toFixed(0)}°C`}</span></h3>
              </div>
              
              <div className="wind-speed">
                <h3>{`Wind Speed: ${weather.wind.speed} mph`}</h3>
              </div>
            </div>
            
          </div>
          ):(
            notFound && <p id="p1">Entered Wrong Place</p>
          )

        }
      </nav>
    </div>
  )
}

export default App

