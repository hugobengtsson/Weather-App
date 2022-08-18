import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import makeRequest, { CityObject } from '../functions/main';
import { RootTabScreenProps } from '../types';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [getInputValue, setInputValue] = useState<undefined | string>();
  const [getResult, setResult] = useState<undefined | CityObject[]>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    if(getInputValue) {

      makeRequest(getInputValue).then((r) => {
        setResult(r);
        setLoading(false)

      })

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
                <TouchableOpacity key={city.name} style={colorCheck ? {...styles.resultContainer, backgroundColor:"lightgray"} : styles.resultContainer}>
                  <Text style={styles.cityName}>{city.name}, </Text>
                  <Text style={styles.regionName}>{city.region}</Text>
                </TouchableOpacity>
            )

          }))
        : undefined}
      </View>

      {/* End InputComponent */}

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
  },
});
