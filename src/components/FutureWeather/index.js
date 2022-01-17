import styled from 'styled-components'
import {useState} from 'react'
import DegreeConversion from '../DegreeConversion'
import DailyForecast from '../DailyForecast'

const FutureWeather = ({currentData, data, units}) => {
  if (data) {
    const currentDate = new Date();     
    return (
      <Wrapper>
        <Heading>
          {currentData.name}, {currentData.sys.country} 
          <span> as of </span> 
          {Intl.DateTimeFormat('default', {hour: "numeric", minute: "numeric"}).format(currentDate)}
        </Heading>        
        {data.daily.map((info)=>{
          return <DailyForecast key={info.dt} value={info} units={units} />
        })
        }
      </Wrapper>
    )
  }
  else {
    return null
  }
}

export default FutureWeather

const Wrapper = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 10px;
  border-radius: 10px;  
  text-align: center;
`
const Heading = styled.div`  
  font-size: 1.1em;
  padding: 10px;
`
