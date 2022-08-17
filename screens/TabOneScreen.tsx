import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import makeRequest, { CityObject } from '../functions/main';
import { RootTabScreenProps } from '../types';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [getInputValue, setInputValue] = useState<undefined | string>();
  const [getResult, setResult] = useState<undefined | CityObject[]>(undefined);

  useEffect(() => {

    getInputValue ? (

      makeRequest(getInputValue).then((r) => {
        
        setResult(r)
        
      })
      ) : setResult(undefined)

  },[getInputValue]);

  var colorCheck = false;

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Sök efter din stad!'
          autoCapitalize="characters"
          maxLength={17}
          onChangeText={setInputValue}
        />
        <TouchableOpacity>
          <FontAwesome
            name="search"
            size={25}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>

      <View>
        { getResult ? ( 
          getResult.map((city) => {

              return( 
                <TouchableOpacity key={city.name} style={styles.resultContainer}>
                  <Text style={styles.cityName}t>{city.name}, </Text>
                  <Text style={styles.regionName}>{city.region}</Text>
                </TouchableOpacity>
            )

          }))
        : undefined}
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
  }
});
