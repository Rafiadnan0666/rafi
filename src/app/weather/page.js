"use client"
import React, { Component } from 'react'
import axios from 'axios'

const API_KEY = "f0cf2b4c945c882fa07b5f41be3ea461"

export default class Weather extends Component {
  state = {
    city: '',
    weather: null,
    error: null,
    loading: false,
    userCity: null
  }

  componentDidMount() {
    this.getLocationWeather()
  }

  getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          this.fetchWeatherByCoords(latitude, longitude)
        },
        (err) => {
          console.warn("Location access denied")
        }
      )
    }
  }

  fetchWeather = async (city) => {
    this.setState({ loading: true, error: null })
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      this.setState({ weather: res.data, loading: false, city: '', userCity: null })
    } catch (err) {
      this.setState({ error: 'City not found', loading: false, weather: null })
    }
  }

  fetchWeatherByCoords = async (lat, lon) => {
    this.setState({ loading: true, error: null })
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      this.setState({ weather: res.data, loading: false, userCity: res.data.name })
    } catch (err) {
      this.setState({ error: 'Could not get weather by coordinates', loading: false, weather: null })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.city.trim()) {
      this.fetchWeather(this.state.city)
    }
  }

  handlePredefinedClick = (city) => {
    this.fetchWeather(city)
  }

  render() {
    const { weather, error, loading, city, userCity } = this.state
    const predefinedCities = ["Jakarta", "Tokyo", "New York", "London", "Paris", "Dubai"]

    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "black", background: "#f2f2f2", minHeight: "100vh" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>☀️ Weather in Your City</h1>
        <title>Weather in Your City</title>
        <form onSubmit={this.handleSubmit} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => this.setState({ city: e.target.value })}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "5px",
              marginRight: "0.5rem"
            }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>Search</button>
          <button
            type="button"
            onClick={this.getLocationWeather}
            style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}
          >
            📍 Use My Location
          </button>
        </form>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Try:</strong>{' '}
          {predefinedCities.map((c) => (
            <button
              key={c}
              onClick={() => this.handlePredefinedClick(c)}
              style={{
                margin: "0.25rem",
                padding: "0.3rem 0.8rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p>Loading weather...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div style={{ background: "white", padding: "1rem", borderRadius: "10px", maxWidth: "400px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p style={{ fontSize: "2rem" }}>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
          </div>
        )}

        {userCity && !weather && (
          <p>Showing weather for your current location: <strong>{userCity}</strong></p>
        )}
      </div>
    )
  }
}
