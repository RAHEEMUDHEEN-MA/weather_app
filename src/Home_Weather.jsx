import "../src/Home_weather.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import searchicon from "./Assets/icons8-search-48.png";
import dayIMG from "./Assets/day.jpg";
import nightIMg from "./Assets/night.jpg";
import windIMG from "./Assets/icons8-wind-48.png";
import rainIMG from "./Assets/icons8-umbrella-52.png";
import humidityIMG from "./Assets/icons8-water-drop-50.png";
import clearSky from "./Assets/Clear_sky.png";

const Home_Weather = () => {
  //   const API_KEY = '9d988ae74f104cb19ffdc60a930b1e1a';
  // const BASE_URL = 'https://api.weatherbit.io/v2.0/current';

  // // Specify the parameters (e.g., latitude, longitude) for your request
  // const params = {
  //     lat: 40.7128,
  //     lon: -74.0060,
  //     key: API_KEY
  // };

  // // Construct the URL with query parameters
  // const url = new URL(BASE_URL);
  // url.search = new URLSearchParams(params).toString();

  // // Make the API request using fetch
  // fetch(url)
  //     .then(response => {
  //         // Check if the request was successful (status code 200)
  //         if (!response.ok) {
  //             throw new Error('Failed to retrieve data');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         // Handle the response data as needed
  //         console.log("weather bit: ",data);
  //     })
  //     .catch(error => {
  //         console.error('Error:', error);
  //     });

  // ------------------------------------------------------
  const [data, setdata] = useState({});

  const [location, setlocation] = useState("kerala");
  // console.log(location);
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  const [data_time, setdata_time] = useState("");
  const [day, setday] = useState("day");
  // console.log("api key",process.env.API_KEY)

  const search = async (event) => {
    console.log("searached");
    if (event.key === "Enter") {
      await axios
        .get(
          // `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c0d290eeee9dd399b017a6d2ba64be7e`
          // `https://api.weatherbit.io/v2.0/current,`
        )
        .then((demo) => {
          setdata(demo.data);

          console.log("weather!!:", location,data);
          setlongitude(demo.data.coord.lon);
          setlatitude(demo.data.coord.lat);
          // console.log(longitude, latitude);
        })
        .catch((error) => {
          alert("Location not found");
          console.error("Error weather data:", error);
        });
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=JYS1MQ3Z26B1&format=json&by=position&lat=${latitude}&lng=${longitude}`
        )
        .then((demo) => {
          const timeZoneData = demo.data;
          // console.log("timeZoneData",timeZoneData);

          const CurTime = timeZoneData.formatted.slice(11, -3);
          setdata_time(CurTime);
          // console.log(CurTime);

          if (CurTime.slice(0, -3) <= 19) {
            setday("day");
          } else {
            setday("night");
          }
          console.log(day);
        })
        .catch((error) => {
          console.error("Error fetching time zone:", error);
        });
    }
  }, [search]);

  const googleMapUrl = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&zoom=13&key=AIzaSyAq15HbfCRMW7RqNb5LUNyOLyfzpYI0wl4`;
  let mainBarStyle = {};
  if (day == "day") {
    mainBarStyle = {
      backgroundImage: `url(${dayIMG})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      color: "white",

      // filter: 'brightness(70%)'
    };
  } else {
    mainBarStyle = {
      backgroundImage: `url(${nightIMg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // filter: 'brightness(70%)',
      color: "white",
    };
  }

  return (
    <div>
      <div className="main_body">
        <div className="sub_body">
          <div className="header">
            <p>Weather</p>
          </div>
          <div className="main_container">
            <div className="inputContainer">
              <input
                value={location}
                placeholder="Search a City"
                id="locationInput"
                type="text"
                onKeyPress={search}
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
              />
              <button onClick={search}>
                <img src={searchicon} alt="" />
              </button>
            </div>
            <div className="head_container">
              <p>Right now in <p>{location}</p> its clear.</p>
            </div>

            <div className="weather_container">
              <div>
                <img src={clearSky} alt="weather" height={100} />
                {/* <img src="https://openweathermap.org/img/wn/01d.gif" alt="Clear sky (day)"/> */}
              </div>
              <div>
                <p id="main_temp">{data.main&& Math.round(data.main.temp -273.15)}°C</p>
                <p>61/100</p>
              </div>
              <div>
                <div className="property_div">
                  <img src={windIMG} alt="wind" /> <h5>{data.main&& data.wind.speed}</h5> <p>mph</p>
                </div>
                <div className="property_div">
                  <img src={rainIMG} alt="rain" /> <h5>0</h5> <p>%</p>
                </div>
                <div className="property_div">
                  <img src={humidityIMG} alt="humidity" /> <h5>{data.main&& data.main.humidity}</h5> <p>%</p>
                </div>
              </div>
            </div>

            <div className="map_container">
              <iframe
                title="Google Map"
                width="100%"
                // height="320"
                allowFullScreen
                src={googleMapUrl}
              />
            </div>
          </div>
        </div>
      </div>
      ////////////////////////////////////////////////////////////////////////////
      {/* <div className="TopBar">
        <div className="TopBarContaniner">
         
          <div className="searchBar">
            <input
              type="text"
              placeholder="search a city"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              onKeyPress={search}
            />
            <button onClick={search}>
              <img src={searchicon} alt="" />
            </button>
          </div>
         
        </div>
      </div>

    

      <div className="mainBar" style={mainBarStyle}>
        {data.map((demo) => (
          <div className="mainBarContainer" key={demo.id}>
            <h1>{demo.name}</h1>
            <h1>{demo.main && Math.round(demo.main.temp - 273.15)}°C</h1>
            {data.map((demo) => (
              <div key={demo.id}>
                {demo.weather.map((weather) => (
                  <div key={weather.id}>
                    <h2>{weather.description}</h2>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

  
      <div className="thirdBar">
        <div className="mapContainer">
          <div className="locationMap">
            <iframe
              title="Google Map"
              width="100%"
              height="320"
              allowFullScreen
              src={googleMapUrl}
            />
          </div>
        </div>
        <div className="thirdBarContainer"></div>
        <div className="thirdContent">
          {data.map((demo) => (
            <div key={demo.id}>
              {demo.weather.map((weather) => (
                <div key={weather.id}>
                  <p>{weather.description}</p>
                  <img
                    src={getWeatherIconUrl(weather.icon)}
                    alt={weather.description}
                    height={70}
                  />
                </div>
              ))}
            </div>
          ))}
          {data.map((demo) => (
            <div key={demo.id} className="">
              <p>
                Humidity
                <WiHumidity />:{demo.main.humidity}%
              </p>
              <p id="wind">
                Wind
                <WiStrongWind />:{demo.wind.speed}m/s
              </p>
              <p>
                cordinates:{demo.coord.lat},{demo.coord.lon}
              </p>
              <p>time:{data_time}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home_Weather;
