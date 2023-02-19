import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [Location, setLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState([]);

    const handleChange = (e) => {
        setLocation(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${Location}&limit=5&appid=3cebe07bba89ebeaa9c71aa068cfa2b4`
          );
          if (response.ok) {
            let data = await response.json();
            setSelectedLocation(data);
            console.log(selectedLocation);
            // dispatch({
            //     type: "COORDINATES",
            //     payload: {
            //       longitude: location.lon,
            //       latitude: location.lat,
            //     },
            // });
          }
        } catch (error) {
          console.log(error);
        }
    };

    return (<div className="w-100 d-flex flex-column align-items-center searchBar">
    <Form onSubmit={handleSubmit} className="mt-5 w-50">
      <Form.Control
        type="search"
        onChange={handleChange}
        placeholder="Search City"
      />
    </Form>
    <div className="mt-4 text-center">
        {selectedLocation.map((location, i) => (
          <Button
          style={{background: "#ec6e4c", border: "none"}}
            className="m-2"
            key={i}
            onClick={() => {
                console.log("selectedLocation",selectedLocation);
              dispatch({
                type: "COORDINATES",
                payload: {
                  longitude: location.lon,
                  latitude: location.lat,
                },
              });
            }}
          >
            {location.name} {location.state}
          </Button>
        ))}

      </div>
  </div>)
}