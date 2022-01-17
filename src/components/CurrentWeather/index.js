import styled from 'styled-components'
import DegreeConversion from '../DegreeConversion'

const CurrentWeather = ({currentData, hourlyData, units}) => {   
  if (currentData && hourlyData) {    
    const currentDate = new Date();

    const hourlyInfo = hourlyData.hourly.map((value) => {
      let thisTime = new Date(value.dt * 1000);
      return (
        <div key={value.dt} style={{textAlign: "center", borderRight: "solid", paddingRight: "10px"}}>
          <div>
            {new Intl.DateTimeFormat('default', {weekday: "long", month: "long", day: "numeric"}).format(thisTime) } <br />
            {new Intl.DateTimeFormat('default', {hour: "numeric"}).format(thisTime) }
          </div>
          <div>
            <img src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} /> <br />
            {value.weather[0].main} <br />
            {Math.round(value.temp * 10) / 10} {units === "metric" ? "°C" : "°F"}
          </div>          
        </div>
      )
    });

    return (
      <div>
        <Wrapper>
          <Heading>
            {currentData.name}, {currentData.sys.country} 
            <span> as of </span> 
            {Intl.DateTimeFormat('default', {hour: "numeric", minute: "numeric"}).format(currentDate)}
          </Heading>
          <TemperatureInformation>
            <div style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
              <div>
                <img src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`} /><br/>
                {currentData.weather[0].description.charAt(0).toUpperCase() + currentData.weather[0].description.slice(1)}
              </div>
              <div>
                <div style={{fontSize: "4em"}}>
                  {Math.round(currentData.main.temp * 10) / 10} {units === "metric" ? "°C" : "°F"} 
                </div>
                Feels Like: {Math.round(currentData.main.feels_like * 10) / 10} {units === "metric" ? "°C" : "°F"} 
              </div>
            </div>            
            <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "10px"}}>
              <div>
                Humidity: {currentData.main.humidity}% 
              </div>
              <div>
                Pressure: {currentData.main.pressure} hPa 
              </div>
              <div>
                Wind: {currentData.wind.speed}{units === "metric" ? "m/s" : "mph"} {DegreeConversion(currentData.wind.deg)}
              </div>
            </div>            
          </TemperatureInformation>
        </Wrapper>
        <Wrapper>
          <Heading>
            Hourly Forecast
          </Heading>
          <HourlyForecast>
            {hourlyInfo}
          </HourlyForecast>
        </Wrapper>
      </div>      
    )
  }
  else{
    return null
  }
}

export default CurrentWeather;

const Wrapper = styled.div`
  margin-top: 20px;
`
const Heading = styled.div`    
  font-size: 1.1em;
  background-color: #333;
  padding: 10px;
  border: 1px solid black;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`
const TemperatureInformation = styled.div`
  background-color: #1c1c1c;
  display: grid;
  grid-template-rows: auto auto;
  padding: 10px;  
  text-align: center;
`
const HourlyForecast = styled.div`
  background-color: #1c1c1c;
  display: flex;
  overflow-x: auto;
  div {
    padding: 10px;
  }
`

