import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { CityObject, FavoriteCity, requestCity, requestFavorites } from '../functions/main';
import navigation from '../navigation';
import { RootTabScreenProps } from '../types';

interface HomeScreenProp {
  navigation: any;
}


export default function RootScreen({ navigation }: HomeScreenProp) {
  const [getInputValue, setInputValue] = useState<undefined | string>();
  const [getResult, setResult] = useState<undefined | CityObject[]>(undefined);
  const [getFavorites, setFavorites] = useState <false | FavoriteCity[]>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    if(getInputValue) {
      const sendReq = async () => {
          let response = await requestCity(getInputValue)
          setResult(response);
          setLoading(false)
      }
      sendReq()
    }

  },[getInputValue]);

  var timer: undefined | NodeJS.Timeout = undefined;

  function setInputTimer(value: string) {
    setLoading(true)
    if(value.length == 0 || value === "" || value === " "){
      setResult(undefined)
      setLoading(false)
    }

    if(value.length == 1) {
      setInputValue(value);
      return;
    }

    if(timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {

      setInputValue(value)

    }, 1000)

  }


  useEffect(() => {

    if(!getFavorites) {
      const sendReq = async () => {
        let response = await requestFavorites();
        setFavorites(response)
      };
      sendReq();
    }


  }, [])


  var colorCheck = false;

  return (
    <View style={styles.container}>
      {/* InputComponent */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Sök efter din stad!'
          autoCapitalize="characters"
          maxLength={17}
          onChangeText={setInputTimer}
        />
        <ActivityIndicator
        style={styles.activity}
        size="large"
        color="#000000"
        animating={loading}
        />
      </View>

      <View>
        { getResult ? ( 
          getResult.map((city) => {
              colorCheck = !colorCheck
              return( 
                <TouchableOpacity onPress={() => {navigation.navigate("WeatherResultScreen", city)}} key={city.name} style={colorCheck ? {...styles.resultContainer, backgroundColor:"lightgray"} : styles.resultContainer}>
                  <Text style={styles.cityName}>{city.name}, </Text>
                  <Text style={styles.regionName}>{city.region}</Text>
                </TouchableOpacity>
            )

          }))
        : undefined}
      </View>

      {/* End InputComponent */}

      <View style={styles.favoritesContainer}>
        <Text style={{fontSize: 24,}}>Dina sparade favoritplatser:</Text>
        {
          getFavorites ? (
            getFavorites.map((favorite) => {

              return(
                <TouchableOpacity key={favorite.id} style={styles.favoriteContainer} onPress={() => {navigation.navigate("WeatherResultScreen", favorite)}}>
                  <Text>{favorite.name}</Text>
                  <Text>{favorite.cityName}, {favorite.region}</Text>
                  <Text>{favorite.long + " " + favorite.lat}</Text>
                </TouchableOpacity>
              )
            })
          ): (
            <Text>Du har inte sparat några favoriter...</Text>
          )}
          
          
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: 'lightgray'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "white",
    width: "90%",
    height: "8%",
    justifyContent:"space-between",
    alignItems: 'center',
    borderRadius: 10,
    padding: '1%',
  },
  input: {
    fontSize: 20,
    width: "100%",
  },
  resultContainer: {
    display: "flex",
    alignItems:"flex-end",
    minWidth: "80%",
    padding: "2%",
    flexDirection: "row",
  }, cityName: {
    fontSize: 18,
  }, regionName: {
    fontSize: 16,
  }, activity: {
    position: "absolute",
    right: "2%",
  }, favoritesContainer: {
    position: "absolute",
    marginTop: "70%",
    width: "90%",
    padding: "5%",
    borderRadius: 10,
  }, favoriteContainer: {
    padding: "3%",
    backgroundColor: "grey",
    marginTop: "3%",
    borderRadius: 10,
  }
});
