import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import WeatherCard from "../Components/WeatherCard";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation, route }) {
  /* const [cities, setCities] = useState([
    { name: "Stockholm", id: 1 },
    { name: "Gothenburg", id: 2 },
    { name: "London", id: 3 },
  ]); */
  const [cities, setCities] = useState([]);
  const [celcius, setCelsius] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Text style={styles.headerRight}>+</Text>
        </TouchableOpacity>
      ),
    });

    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>C</Text>
          <Switch
            trackColor={{ false: "#767577", true: "lightblue" }}
            thumbColor={"lightblue"}
            value={!celcius}
            onValueChange={() => {
              setCelsius((old) => !old);
            }}
          />
          <Text>F</Text>
        </View>
      ),
    });
  }, [celcius]);

  useEffect(() => {
    console.log(route);
    if (route.params != undefined) {
      console.log("YESY");
      console.log(route.params.city);
      setCities((prev) => [
        ...prev,
        { name: route.params.city, id: Date.now() },
      ]);
    }
  }, [route.params]);

  function deleteCity(id) {
    const newCities = cities.filter((city, idx) => {
      if (city.id != id) {
        return city;
      }
    });
    console.log(newCities);
    setCities(newCities);
    navigation.reload;
  }
  function moveUp(id) {
    const pos = cities.map((city) => city.id).indexOf(id);
    const newCities = [...cities];
    if (pos != 0) {
      [newCities[pos - 1], newCities[pos]] = [
        newCities[pos],
        newCities[pos - 1],
      ];
      setCities(newCities);
    }
  }
  function moveDown(id) {
    const pos = cities.map((city) => city.id).indexOf(id);
    const newCities = [...cities];
    if (pos != cities.length - 1) {
      [newCities[pos + 1], newCities[pos]] = [
        newCities[pos],
        newCities[pos + 1],
      ];
      setCities(newCities);
    }
  }

  return (
    <LinearGradient
      colors={["lightblue", "white"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
      location={[0.25, 0.4, 1]}
    >
      <ScrollView>
        <View style={styles.container}>
          {cities.map((city, idx) => {
            return (
              <WeatherCard
                city={city.name}
                key={city.id}
                id={city.id}
                celcius={celcius}
                deleteCity={deleteCity}
                moveUp={moveUp}
                moveDown={moveDown}
              />
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 20,
    padding: 10,
    width: "100%",
    alignItems: "flex-start",
    paddingTop: 125,
  },
  headerRight: {
    fontSize: 35,
    color: "black",
    opacity: 0.3,
  },
  headerLeft: {
    fontSize: 35,
    color: "black",
    opacity: 0.3,
  },
});
