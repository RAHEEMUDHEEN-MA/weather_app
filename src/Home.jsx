import "../src/Home_weather.css";
import axios from "axios";
import React, {  useState } from "react";
import searchicon from "./Assets/icons8-search-48.png";
import windIMG from "./Assets/icons8-wind-48.png";
import rainIMG from "./Assets/icons8-umbrella-52.png";
import humidityIMG from "./Assets/icons8-water-drop-50.png";
import clearSky from "./Assets/Clear_sky.png";

const Home = () => {

  const [data, setdata] = useState({});

  const [location, setlocation] = useState("world");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  // const [data_time, setdata_time] = useState("");
  // const [day, setday] = useState("day");

  const search = async (event) => {
    console.log("searached");
    if (event.key === "Enter") {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c0d290eeee9dd399b017a6d2ba64be7e`
        )
        .then((demo) => {
          setdata(demo.data);

          console.log("weather!!:", location, data);
          setlongitude(demo.data.coord.lon);
          setlatitude(demo.data.coord.lat);
        })
        .catch((error) => {
          alert("Location not found");
          console.error("Error weather data:", error);
        });
    }
  };


  // ------------------------------setting day or night state
  // useEffect(() => {
  //   if (latitude && longitude) {
  //     axios
  //       .get(
  //         `http://api.timezonedb.com/v2.1/get-time-zone?key=JYS1MQ3Z26B1&format=json&by=position&lat=${latitude}&lng=${longitude}`
  //       )
  //       .then((demo) => {
  //         const timeZoneData = demo.data;
  //         // console.log("timeZoneData",timeZoneData);

  //         const CurTime = timeZoneData.formatted.slice(11, -3);
  //         setdata_time(CurTime);
  //         // console.log(CurTime);

  //         if (CurTime.slice(0, -3) <= 19) {
  //           setday("day");
  //         } else {
  //           setday("night");
  //         }
  //         console.log(day);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching time zone:", error);
  //       });
  //   }
  // }, [search]);

   // let mainBarStyle = {};
  // if (day == "day") {
  //   mainBarStyle = {
  //     backgroundImage: `url(${dayIMG})`,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //     color: "white",

  //     // filter: 'brightness(70%)'
  //   };
  // } else {
  //   mainBarStyle = {
  //     backgroundImage: `url(${nightIMg})`,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //     // filter: 'brightness(70%)',
  //     color: "white",
  //   };
  // }
  // ------------------------------------------------------------

  const googleMapUrl = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&zoom=13&key=AIzaSyAq15HbfCRMW7RqNb5LUNyOLyfzpYI0wl4&maptype=satellite`;

 

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
              <button id="searchBTN" onClick={search}>
                <img src={searchicon} alt="" height={25} />
              </button>
            </div>
            <div className="head_container">
              <p>
                Right now in{" "}
                <span style={{ fontWeight: "600", color: "black" }}>
                  {location}
                </span>
                ,{" "}
              </p>{" "}
              <p>
                its{" "}
                <span style={{ fontWeight: "600", color: "black" }}>
                  {data.weather && data.weather[0].description}
                </span>
              </p>
              
            </div>

            <div className="weather_container">
              <div>
            
                <img src={clearSky} alt="weather" height={100} />
                
              </div>
              <div>
                <p id="main_temp">
                  {data.main && Math.round(data.main.temp - 273.15)}°C
                </p>
                <p style={{ color: "black" }}>
                  {data.clouds && data.clouds.all}/100
                </p>
              </div>
              <div>
                <div className="property_div">
                  <img src={windIMG} alt="wind" />{" "}
                  <h5>{data.main && data.wind.speed}</h5> <p>mph</p>
                </div>
                <div className="property_div">
                  <img src={rainIMG} alt="rain" />{" "}
                  <h5>{data.main && data.wind.gust}</h5> <p>%</p>
                </div>
                <div className="property_div">
                  <img src={humidityIMG} alt="humidity" />{" "}
                  <h5>{data.main && data.main.humidity}</h5> <p>%</p>
                </div>
              </div>
            </div>

            <div className="map_container">
              <iframe title="map" width="100%" allowFullScreen src={googleMapUrl} />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
