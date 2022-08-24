import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { addFavorite, FavoriteCity, NewFavoriteCity, updateFavorite } from '../functions/main';

interface ModalProps {
  navigation: any,
  route: any,
}



export default function ModalScreen({ navigation, route }: ModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const saveFavorite = async () => {

    setLoading(true);

    if(inputValue){
      let newFavoriteCity: NewFavoriteCity = {
        name: inputValue,
        cityName: route.params.cityName,
        region: route.params.region,
        long: route.params.long,
        lat: route.params.lat
      }

      let response = await addFavorite(newFavoriteCity)

      if(response) {
        setLoading(false)
        navigation.navigate("WeatherResultScreen", response)
      }
      else {
        setErrorMessage("Det gick inte att spara...")
        setLoading(false)
      }

    }

  }

  const updateFavorites = async (favorite: FavoriteCity) => {
    setLoading(true);

    if(inputValue){
      
      favorite.name = inputValue;

      let response = await updateFavorite(favorite)

      if(response) {
        setLoading(false)
        navigation.navigate("WeatherResultScreen", response)
      }
      else {
        setErrorMessage("Det gick inte att spara...")
        setLoading(false)
      }
      }

  }


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{route.params.name}</Text>
        <Text style={styles.titleText}>Spara dina favoritorter så att du snabbt kan kolla vädret på dina smultronställen</Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={styles.input} 
          placeholder="Namn på objekt"
          onChangeText={setInputValue}
          />
        </View>
        <TouchableOpacity onPress={() =>{
          route.params.id ? updateFavorites(route.params) : saveFavorite() 
        }} style={styles.button}>
            <Text>{route.params.id ? "Uppdatera!" : "Spara!"}</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.loader, display: loading ? "flex": "none",}}>
      <ActivityIndicator
        size="large"
        color="black"
        animating={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
  }, title: {
    fontSize: 32,
    fontWeight: "bold",
  }, titleText: {
    width: "80%",
    marginTop: "2%",
    textAlign: "center",
  }, inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "lightgray",
    width: "90%",
    height: "8%",
    marginTop: "5%",
    justifyContent:"space-between",
    alignItems: 'center',
    borderRadius: 10,
    padding: '3%',
  }, input: {
    fontSize: 20,
    width: "100%",
  }, button: {
    marginTop: "3%",
    backgroundColor: "lightgray",
    padding: "3%",
    borderRadius: 10,
  }, loader: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200, 200, 200, 0.6)",
  }
});
