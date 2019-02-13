import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
require('./index.css');

import Header from './src/Header';

const API_KEY = 'b496510926f77f688cf2edfb07084e0f';
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=';

// CITY-NAME&type=accurate&APPID=YOUR-API-KEY&cnt=5';
// =CITY-NAME&type=accurate&APPID=YOUR-API-KEY";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({ cityName: e.target.value });
  }

  getWeather() {
    console.log(this.state.cityName);
    // fetch(`${currentWeatherUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}`)
    const current = `${currentWeatherUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}`;
    const line = `${forecastUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}&cnt=5`;
    console.log(line);

    // fetch(`${forecastUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}&cnt=5`)
    fetch(current)
      .then(response => response.json())
      .then(myJson => {
        console.log(myJson);
      });
  }

  getForecast() {
    console.log(this.state.cityName);
    const forecast = `${forecastUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}&cnt=5`;
    return fetch(forecast)
      .then(response => response.json())
      .then(myJson => myJson);
  }

  render() {
    console.log(this.state)
    const customProps = {
      handleChange: this.handleChange,
      getWeather: this.getWeather,
      getForecast: this.getForecast,
      cityName: this.state.cityName
    };

    return (
      <Router>
        <div className="content">
          <Header />
          <Route exact path="/" render={props => <Home {...props} {...customProps}/>} />
          <Route path="/forecast" render={props => <Forecast {...props} {...customProps}/>} />
        </div>
      </Router>
    );
  }
}


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null,
      city: ''
    }
  }

  componentDidMount() {
    this.props.getForecast().then(data => {
      this.setState({
        city: `${data.city.name}, ${data.city.country}`,
        forecast: data.list
      });
    });
  }

  render() {
    console.log('forecast: ', this.props, this.state);
    const { forecast, city } = this.state;
    if(!forecast) {
      return <Loading />;
    }
    
    return (
      <div>
        <h3>{city}</h3>
        {
          forecast.map(cast => {
            return <Weather details={cast} key={cast.dt} />
          })
        }
      </div>
    );
  }
}


const Loading = () => {
  return (
    <h2 style={{textAlign: 'center'}}>Loading...</h2>
  )
}

var daysMap = { "0":"Sun", "1":"Mon", "2":"Tue", "3":"Wed", "4":"Thu", "5":"Fri", "6":"Sat" };

var monthsMap = { "0":"Jan", "1":"Feb", "2":"Mar", "3":"Apr", "4":"May", "5":"June", "6":"July", "7":"Aug", "8":"Sept", "9":"Oct", "10":"Nov", "11":"Dec" };

function getDate (unixTimestmap) {
  var date = new Date(unixTimestmap * 1000);
  var day = daysMap[date.getDay()];
  var month = monthsMap[date.getMonth()] + ' ' + date.getDate();
  return day + ', ' + month;
}

const Weather = (props) => {
  console.log('props', props);
  const { humidity, pressure, speed, weather, dt } = props.details;
  return (
    <ul style={{display: 'inline-block'}}>
      {/* <img src="" /> */}
      <li>{weather[0].main} (<small><em>{weather[0].description}</em></small>)</li>
      <li>{getDate(dt)}</li>
      <li>Pressure: {pressure}</li>
      <li>Speed: {speed}</li>
      <li>Humidity: {humidity}</li>
    </ul>
  )
}

const Home = (props) => (
  <div className="main">
    <h3>Enter a city and State</h3>
    <input type="text" onChange={props.handleChange} value={props.cityName} /> <br />
    <div>
      <button onClick={props.getWeather} style={{ marginRight: 20 }}>Get Current Weather</button>
      <Link to="/forecast">
        <button type="button">Get Forecast</button>
      </Link>
      {/* <button type="button" onClick={() => props.history.push('/forecast')}>Get Forecast</button> */}
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app-root'));


