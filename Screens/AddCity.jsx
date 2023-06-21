import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import WeatherCard from '../Components/WeatherCard';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'b66e9a45d63021a36e85afc2d1daf31c';

export default function AddCity({ navigation }) {
  const [input, onChangeInput] = useState();

  async function checkInput() {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    if (data.length === 0) {
      Alert.alert(
        'Error!',
        'Invalid city name.',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }
    console.log('HIII');
    navigation.navigate({
      name: 'Home',
      params: { city: input },
    });
  }

  return (
    <LinearGradient
      colors={['lightblue', 'white']}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
      location={[0.25, 0.4, 1]}
    >
      <View style={styles.container}>
        <TextInput
          placeholder='City name'
          style={styles.input}
          value={input}
          onChangeText={onChangeInput}
        />
        <TouchableOpacity style={styles.button} onPress={checkInput}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
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
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 125,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    textAlign: 'center',
    fontSize: 30,
    borderRadius: 10,
    opacity: 0.8,
  },
  button: {
    width: '100%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 30,
  },
  errorModal: {},
});
