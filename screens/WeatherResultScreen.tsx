import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

interface PopulationResultProp {
    route: any;
}


export default function WeatherResultScreen({ route }: PopulationResultProp) {

    console.log(route.params)




    return (
        <View style={styles.container}>

            <View style={styles.banner}>
                <Text style={styles.cityname}>{route.params.name}</Text>
            </View>

            <View style={styles.weatherList}>



            </View>


        </View>
    );




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgray'
    }, banner: {
        width: "100%",
        height: "30%",
        backgroundColor: "white",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    }, cityname: {
        fontSize: 32,
    }, weatherList: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    }
});
