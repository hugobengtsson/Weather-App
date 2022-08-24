import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
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

  const fetchFavorites = async () => {
    let response = await requestFavorites();

      setFavorites(response)

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
      return;
    }

    fetchFavorites()
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
          placeholderTextColor={"#A9A9A9"}
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
                <TouchableOpacity onPress={() => {navigation.navigate("WeatherResultScreen", city)}} key={city.cityName + city.region} style={colorCheck ? {...styles.resultContainer, backgroundColor:"#696969"} : styles.resultContainer}>
                  <Text style={colorCheck ? {...styles.cityName, color:"white"} : styles.cityName}>{city.cityName}, </Text>
                  <Text style={colorCheck ? {...styles.regionName, color:"white"} : styles.regionName}>{city.region}</Text>
                </TouchableOpacity>
            )

          }))
        : undefined}
      </View>

      {/* End InputComponent */}

      <ScrollView style={styles.favoritesContainer}>
        <Text style={{fontSize: 24, color:"white"}}>Dina sparade favoritplatser:</Text>
        {
          getFavorites ? (
            getFavorites.map((favorite) => {

              return(
                <TouchableOpacity key={favorite.id} style={styles.favoriteContainer} onPress={() => {navigation.navigate("WeatherResultScreen", favorite)}}>
                  <View style={styles.favoriteNameContainer}>
                    <Text style={{fontSize:22, color:"#696969"}}>{favorite.name}</Text>
                    <TouchableOpacity onPress={() => removeFavorites(favorite)}>
                      <FontAwesome name={"trash"} size={22} color="gray"/>
                    </TouchableOpacity>
                  </View>
                  <Text style={{color:"gray"}}>{favorite.cityName}, {favorite.region}</Text>
                </TouchableOpacity>
              )
            })
          ): (
            <Text style={{color:"white"}}>Du har inte sparat några favoriter...</Text>
          )}
          
          
      </ScrollView>



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
    color: "#696969",
    textAlign: "center"
  },
  resultContainer: {
    display: "flex",
    alignItems:"flex-end",
    minWidth: "80%",
    padding: "2%",
    flexDirection: "row",
    backgroundColor: "white"
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
    height: "50%",
    padding: "5%",
    borderRadius: 10,
    backgroundColor: "grey",
    color: "#696969",
  }, favoriteContainer: {
    padding: "3%",
    backgroundColor: "lightgray",
    marginTop: "3%",
    borderRadius: 10,
  }, favoriteNameContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"center",
    backgroundColor: "lightgray",
  }
});
