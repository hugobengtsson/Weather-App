import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { CityObject, FavoriteCity, requestCity, requestFavorites, removeFavorite } from '../functions/main';

interface HomeScreenProp {
  navigation: any;
}


export default function RootScreen({ navigation }: HomeScreenProp) {
  const [getInputValue, setInputValue] = useState<undefined | string>();
  const [getResult, setResult] = useState<undefined | CityObject[]>(undefined);
  const [getFavorites, setFavorites] = useState <FavoriteCity[] | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isFocused = useIsFocused();


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
    if(value.length === 0 || value === "" || value === " "){
      setLoading(false)
      clearTimeout(timer)
      setResult(undefined)
      return;
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

  var fetchFavorites = async () => {
    let response = await requestFavorites();

    if(response) {
      setFavorites(response)
    }
  };


  useEffect(() => {

    setResult(undefined)
    setInputValue(undefined)

    fetchFavorites();


  }, [isFocused])

  async function removeFavorites(favorite: FavoriteCity) {

    let response = await removeFavorite(favorite);

    if(!response) {
      console.log("error..")
    }

    // reload and resync is needed for the favorites. 

  }


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
                <TouchableOpacity onPress={() => {navigation.navigate("WeatherResultScreen", city)}} key={city.cityName + city.region} style={colorCheck ? {...styles.resultContainer, backgroundColor:"lightgray"} : styles.resultContainer}>
                  <Text style={styles.cityName}>{city.cityName}, </Text>
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
                  <View style={styles.favoriteNameContainer}>
                    <Text style={{fontSize:22}}>{favorite.name}</Text>
                    <TouchableOpacity onPress={() => removeFavorites(favorite)}>
                      <FontAwesome name={"trash"} size={22}/>
                    </TouchableOpacity>
                  </View>
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
  }, favoriteNameContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"center",
    backgroundColor: "gray",
  }
});
