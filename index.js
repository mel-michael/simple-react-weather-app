import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({ cityName: e.target.value });
  }

  getWeather() {
    console.log(this.state.cityName);
    fetch(`${currentWeatherUrl}${this.state.cityName}&type=accurate&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(myJson => {
        console.log(myJson);
      });
  }

  render() {
    return (
      <Router>
        <div className="content">
          <Header />
          <Home
            handleChange={this.handleChange}
            getWeather={this.getWeather}
            cityName={this.state.cityName}
          />
          <Route
            path="/forecast"
            render={props => <Forecast {...props} extra={this.state.cityName} />}
          />
        </div>
      </Router>
    );
  }
}

// const Forecast = () => (<h3>Forecast Page</h3>);

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecasts: null
    }
  }

  componentDidMount() {
    fetch(`${forecastUrl}${this.props.extra}&type=accurate&APPID=${API_KEY}&cnt=5`)
      .then(response => response.json())
      .then(myJson => {
        console.log(myJson);
        this.setState({forecasts: myJson})
      });
  }

  render() {
    const { forecasts } = this.state;
    if (!forecasts) {
      return <h2>Loading...</h2>
    } else {
      return (
        <h3>Forecast Page for {this.state.forecasts.city.name}</h3>
      );
    }
  }
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
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app-root'));
