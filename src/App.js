import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FetchFromCoordinates from './components/FetchFromCoordinates';
import SearchBar from './components/SearchBar';
import SingleWeather from './components/SingleWeather';

const deBug = false

if (deBug){
  console.log = (x) => {return x}
}
function App() {
  return (
    <div className='main'>
      <SearchBar/>
      <FetchFromCoordinates/>
      <div className='display-flex text-center m-0'><SingleWeather/></div>
    </div>
  );
}

export default App;
