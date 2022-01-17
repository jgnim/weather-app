import {useState, useEffect, useMemo, useCallback} from 'react';
import config from '../../config/index';
import CurrentWeather from '../CurrentWeather';
import FutureWeather from '../FutureWeather';
import styled, {createGlobalStyle} from 'styled-components'
//import Cities from '../../assets/city.json'

const GlobalStyle = createGlobalStyle`
  body {
    /* background-image: url("https://images.unsplash.com/photo-1503198515498-d0bd9ed16902?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBjbG91ZHxlbnwwfHwwfHw%3D&w=1000&q=80"); */
    background-size: 100vmax;
    background-position: center top;
    background-color: #121212;
    color: white;
    width: 100vmin;
    margin: auto;
    box-shadow: 0 0 10px 1px white;
    border-radius: 10px;
    @media only screen and (max-width: 500px) {
      width: 100%;
    }
  }
`

const WeatherApp = () => {
  const [lat, setLat] = useState(43.6509);
  const [lon, setLon] = useState(-79.3799);
  const [unit, setUnit] = useState("metric");
  const [view, setView] = useState("daily");
  const [filteredCity, setFilteredCity] = useState();
  const [searchText, setSearchText] = useState();
  const [currentForecast, setCurrentForecast] = useState();
  const [futureForecast, setFutureForecast] = useState();
  
  useEffect(()=>{  
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);    
    }) 
  },[])

  const SearchCity = useCallback(()=>{    
    console.log(`Use callback.`)
    if (searchText && searchText.length >=3) {
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchText.replace(" ","+")}&limit=5&appid=${config.openWeather}`)
        .then(res=>res.json())
        .then((data)=>{setFilteredCity(data)})
        .catch(error=>console.log(error))
    }
    else {
      setFilteredCity()
    }
  },[searchText])

  useEffect(()=>{    
    const dailyFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.openWeather}&units=${unit}`);
    const futureFetch = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${config.openWeather}&units=${unit}`);
    Promise.all([dailyFetch,futureFetch])
      .then(values => {
        return Promise.all(values.map(r=>r.json()))})
      .then(res => {
        setCurrentForecast(res[0]);
        setFutureForecast(res[1]);})
      .catch((err) => console.log(err));
  },[lat,lon,unit]);

  const changeView = (e) => {
    if (e.target.value === "daily") {
      setView("daily")
    }
    else {
      setView("weekly")
    }
  }

 const handleChange = (e) => {
  setSearchText(e.target.value); 
 }

 const cityChange = ({lat,lon}) =>{   
   console.log(`City change`);
   setFilteredCity();
   setLat(lat);
   setLon(lon);
 }

  return (
    <div> 
    <GlobalStyle />
      <SearchBar>
        <input type="text" onChange={handleChange} placeholder="Enter City"/>
        <input type="submit" value="Search" onClick={SearchCity}/>
        <div style={{position: "relative"}}>
          <SearchResults>
            {filteredCity ? 
              filteredCity.map((value,index)=>{
                return (
                  <div key={value.lat+value.lon+index} onClick={()=>{cityChange(value)}}>
                    <City >
                    {value.name}, {value.state ? `${value.state}, ` : null} {value.country}
                    </City>
                  </div>                  
                )
              }) :
              null}
          </SearchResults>  
        </div>
      </SearchBar>
      <Selector>
        <button type="button" value="daily" onClick={changeView}>
          Daily Forecast
        </button>
        <button type="button" value="weekly" onClick={changeView}>
          Weekly Forecast
        </button>
        <button type="button" onClick={()=>{unit === "metric" ? setUnit("imperial") : setUnit("metric")}}>
          {unit === "metric" ? "°C" : "°F"}
        </button>
      </Selector>    
        {view === "daily" ? 
          <CurrentWeather currentData={currentForecast} hourlyData={futureForecast} units={unit}/> :
          <FutureWeather currentData={currentForecast} data={futureForecast} units={unit} />
        }
    
    </div>
  )
}

export default WeatherApp;

const SearchBar = styled.div`    
  display: grid;    
  margin-top: 10px;
  grid-template-columns: 75% 25%;
  grid-template-rows: auto auto;
  input {
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 10px;
  }
  div {
    opacity: 0;
    z-index: 1;
  }
  &:focus-within{
    div {      
      opacity: 1;
    }
  }
`
const Selector = styled.div`
  position: relative;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 40% 40% 20%;
  button {
    color: white;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid black;
    background-color: #333;
    &:hover {
      cursor: pointer;
      background-color: #212121
    }
  }  
`
const SearchResults = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`

const City = styled.div`
  background-color: white;
  color: black;   
  padding: 5px;
  &:hover{
    color: red;
    cursor: pointer;
  }
`
