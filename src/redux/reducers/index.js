const initialState = {
    weather: {
        coordinates: [],
        weatherState: [],
        fiveDays: []
    }
}

const mainReducer = (state = initialState, action) => {

    switch(action.type){
        case "COORDINATES" :
            return {
                ...state,
                weather :{
                    ...state.weather,
                    coordinates : [...state.weather.coordinates, action.payload]
                }
            }
        case "WEATHER" :
            /* every time i try to upload the payload it renders two objects, in order to 
            avoid this behavior i filtered the results in order to render only objects with different id*/ 
            const dataId = action.payload.id
            let weatherLocations = state.weather.weatherState.map(weatherObj => weatherObj.id)
            let newArray = [...state.weather.weatherState]
            if (!weatherLocations.includes(dataId)) {
                newArray.push(action.payload);
            }
            return {
                ...state,
                weather :{
                    ...state.weather,
                    weatherState : newArray
                }
            }
        case "FIVEDAYS" :
            return {
                ...state,
                weather :{
                    ...state.weather,
                    fiveDays : [action.payload]
            }
        }
        default:
            return state;
    }
}

export default mainReducer;