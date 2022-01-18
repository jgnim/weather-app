import Weather from './components/WeatherApp';
import {createGlobalStyle} from 'styled-components'

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

function App() {
  
  return (
    <div className="App">
      <GlobalStyle />
      <Weather />
    </div>
  );
}

export default App;
