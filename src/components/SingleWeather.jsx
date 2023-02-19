import { useSelector } from "react-redux";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import FiveDays from "./FiveDays";
import { useState } from "react";

export default function SingleWeather() {

  const myCoordinates = useSelector((state) => state.weather.weatherState);

  console.log("weatherState", myCoordinates);
    
  function timeConverter(UNIX_timestamp, timezone){
    let localDate = ((UNIX_timestamp -3600) + timezone)
    const a = new Date(localDate * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }

  function timeConverterHours(UNIX_timestamp, timezone){
    let localDate = ((UNIX_timestamp -3600) + timezone)
    const a = new Date(localDate * 1000);
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = hour + ':' + min;
    return time;
  }

//   useEffect(() => {
//     setLoading(false);
//     myCoordinates.map((el) => (
//       <>
//         <Card className="bg-danger" style={{ width: "18rem" }}>
//           <Card.Title>{el.location}</Card.Title>
//           <Card.Img variant="top" src={el.icon} />
//           <Card.Body>
//             <Card.Text>{el.weather}</Card.Text>
//           </Card.Body>
//           <ListGroup className="list-group-flush">
//             <ListGroup.Item>Temperature {el.temperature} °C </ListGroup.Item>
//             <ListGroup.Item>Humidity {el.humidity}</ListGroup.Item>
//             <ListGroup.Item>WindSpeed {el.windSpeed}</ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </>

//       // setLocation(el.location),
//       // setIcon(el.icon),
//       // setWeather(el.weather),
//       // setTemperature(el.temperature),
//       // setHumidity(el.humidity),
//       // setWindSpeed(el.windSpeed)
//     ));
//   }, [myCoordinates]);

  return (
    <>
      {myCoordinates.map((el, i) => {
      return (
        <Container className="w-100 text-capitalize d-flex flex-wrap my-5" style={{ width: "18rem", color: "black", borderRadius: "40px"}} key={i}>
          <Col className="d-flex " lg={4} m={12} style={{ border: "2px solid #ec6e4c", color: "black", borderRadius: "40px"}}>
            <Col className="d-flex flex-column m-4 align-items-center" sm={6}>
              <p style={{color: "#ec6e4c"}}>{timeConverter(el.date, el.timezone)}</p>
              <h3 className="me-5">{el.location}, {el.country}</h3>
              <Col className="d-flex rounded-5 m-2 align-items-center">
                  <img variant="top" src={el.icon} alt="wheatherpic"/>
                  <h1>{el.temperature}°C </h1>
              </Col>
                <Row>
                  <p><b>{el.weather}</b> , Feels like <b>{el.feelsLike}</b>°C </p>
                </Row>
            </Col>
            <Row className="p-3 mt-5" sm={6}>
                <ListGroup className="list-group-flush rounded-3 bg-none fs-5 border-left-1 w-100">
                    <ListGroup.Item>Humidity: <b>{el.humidity} %</b> </ListGroup.Item>
                    <ListGroup.Item>WindSpeed: <b>{el.windSpeed} km/h</b></ListGroup.Item>
                    <ListGroup.Item>Sunset: <b>{timeConverterHours(el.sunset, el.timezone)}</b></ListGroup.Item>
                    <ListGroup.Item>Sunrise: <b>{timeConverterHours(el.sunrise, el.timezone)}</b></ListGroup.Item>
                </ListGroup>
            </Row>
          </Col>
          <Col lg={8} m={12} className="flex-column flex-wrap"><h1 style={{color: "#ec6e4c"}}>NEXT DAYS</h1>{<FiveDays id={i} timezone={el.timezone} longitude={el.longitude} latitude={el.latitude}/>}</Col>
        </Container>
      )})}
    </>
  );
}
