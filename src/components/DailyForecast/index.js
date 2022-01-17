import {useState} from 'react'
import styled from 'styled-components'
import DegreeConversion from '../DegreeConversion'

const DailyForecast = ({value,units}) => {
  const [visibility, setVisibility] = useState(false);
  const thisDate = new Date(value.dt * 1000);
  const weatherIcon = value.weather[0].icon;

  return (
    <Daily>
      <div>
        {new Intl.DateTimeFormat('default', {month: "long", weekday: "long", day: "numeric"}).format(thisDate)}
      </div>
      <MainInformation onClick={()=>{visibility ? setVisibility(false) : setVisibility(true)}}>
        <div>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/> <br />
          {value.weather[0].main}
        </div>
        <div styled={{margin: "auto"}}>
          High {Math.floor(value.temp.max * 10) / 10} {units === "metric" ? "°C" : "°F" }<br />
          Low {Math.floor(value.temp.min * 10) / 10} {units === "metric" ? "°C" : "°F" }
        </div>
        <div>
          {visibility ? "▲" : "▼"}
        </div>            
      </MainInformation>
      {visibility ? 
        <MiscInformation>
          <div>
            Humidity: {value.humidity}% <br />
            Pressure: {value.pressure} hPA <br />
            Wind: {value.wind_speed}{units === "metric" ? "m/s" : "mph"} {DegreeConversion(value.wind_deg)}
          </div>
          <div>
            Morning: {Math.floor(value.temp.morn * 10) / 10} {units === "metric" ? "°C" : "°F" }<br />
            Day: {Math.floor(value.temp.day* 10) / 10} {units === "metric" ? "°C" : "°F" }<br/>
            Evening: {Math.floor(value.temp.eve * 10) / 10} {units === "metric" ? "°C" : "°F" }<br />
            Night: {Math.floor(value.temp.night * 10) / 10} {units === "metric" ? "°C" : "°F" }
          </div>
        </MiscInformation> : 
        null 
      }          
    </Daily>
  )
}

export default DailyForecast

const Daily = styled.div`
  padding: 10px;
`
const MainInformation = styled.div`
  display: grid;
  grid-template-columns: 45% 45% 10%;
  align-items: center;
`
const MiscInformation = styled(MainInformation)`
  padding-bottom: 15px;
  border-bottom: 2px solid white;
`