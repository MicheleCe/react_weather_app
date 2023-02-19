import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FetchFromCoordinates() {
  const dispatch = useDispatch();
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const myCoordinates = useSelector((state) => state.weather.coordinates);

  useEffect(() => {
    myCoordinates.forEach((el) => {
      setLongitude(el.longitude);
      setLatitude(el.latitude);
    });
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3cebe07bba89ebeaa9c71aa068cfa2b4&units=metric`
        );
        if (response.ok) {
          let data = await response.json();
          console.log("fetchWeather", data);
          dispatch({
            type: "WEATHER",
            payload: {
              latitude: latitude,
              longitude: longitude,
              id: data.id,
              location: data.name,
              weather: data.weather[0].description,
              icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              humidity: data.main.humidity,
              temperature: data.main.temp,
              windSpeed: data.wind.speed,
              date: data.dt,
              timezone: data.timezone,
              feelsLike: data.main.feels_like,
              country: data.sys.country,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              list: null,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (latitude) {
      fetchWeather();
    }
  });
}
