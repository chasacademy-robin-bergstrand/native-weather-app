import { MenuView } from '@react-native-menu/menu';
import { useState } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const API_KEY = 'b66e9a45d63021a36e85afc2d1daf31c';

export default function WeatherCard({ city, celcius }) {
  const [weather, setWeather] = useState();

  async function getLocationData(city) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    //console.log(data);
    getWeatherData(data[0].lat, data[0].lon);
  }

  async function getWeatherData(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    setWeather(data);
  }

  useState(() => {
    getLocationData(city);
    //console.log('FETCHING: ', city);
  }, []);

  function toCelcius(deg) {
    return (deg - 273.15).toFixed(1);
  }

  function toFahrenheit(deg) {
    return (((deg - 273.15) * 9) / 5 + 32).toFixed(1);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ position: 'absolute', top: -10, right: 20 }}>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          ...
        </Text>
      </TouchableOpacity>

      {weather ? (
        <>
          <Text style={styles.city}>{weather.name} </Text>

          <Text>
            {
              new Date(
                new Date(new Date().getTime()).getTime() +
                  weather.timezone * 1000
              )
                .toUTCString()
                .split('GMT')[0]
                .split(' ')[4]
            }
          </Text>
          <Text style={styles.temp}>
            {celcius
              ? toCelcius(weather.main.temp)
              : toFahrenheit(weather.main.temp)}
            {celcius ? 'C' : 'F'}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like{' '}
            {celcius
              ? toCelcius(weather.main.feels_like)
              : toFahrenheit(weather.main.feels_like)}
            {celcius ? 'C' : 'F'}
          </Text>
        </>
      ) : (
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>
            {city}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Unable to fetch weather data
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    width: '100%',
    //backgroundColor: '#EEEEEE',
    backgroundColor: 'hsla(360, 100%, 100%, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 30,
  },
  temp: {
    fontSize: 70,
    color: `hsla(${-140}, 100%, 80%, 1)`,
  },
  feelsLike: {
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
