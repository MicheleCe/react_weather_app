import { useEffect, useState } from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

export default function FiveDays(props) {
  const [dayList, setdayList] = useState([]);

  function timeConverter(UNIX_timestamp, timezone){
    let localDate = ((UNIX_timestamp -3600) + timezone)
    const a = new Date(localDate * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + ' ' + month;
    return time;
  }


  useEffect(() => {
    const fetch5Days = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${props.latitude}&lon=${props.longitude}&appid=3cebe07bba89ebeaa9c71aa068cfa2b4&units=metric`
        );
        if (response.ok) {
          let data = await response.json();
          let arr = [...data.list];
          setdayList(arr);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch5Days();
  }, []);
  console.log("dsadasdas", dayList);
  return (
    <Col className="d-flex" col-sm={12}>
      {dayList.map((el, i) => {
        if (i % 8 === 0) {
          return (
            <Col className="d-flex flex-column" key={i} style={{ borderRight: "1px solid #ec6e4c"}}>
              <Col>
              <h3>{(timeConverter(el.dt, props.timezone))}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                ></img>
                <p>
                  <b>{el.weather[0].description}</b>
                </p>
              </Col>
              <Col>
                <p>
                  Feels Like <b>{el.main.feels_like}</b> °C
                </p>
                <p>
                  Humidity: <b>{el.main.humidity} %</b>
                </p>
                <p>
                  Wind Speed: <b>{el.wind.speed} km/h</b>
                </p>
              </Col>
            </Col>
          );
        }
      })}
    </Col>
  );
}
