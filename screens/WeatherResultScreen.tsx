import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { requestWeather, WeatherObject } from '../functions/main';

interface WeatherResultProp {
    navigation: any,
    route: any,
}


export default function WeatherResultScreen({ navigation, route }: WeatherResultProp) {

    const [getResult, setResult] = useState<WeatherObject[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        const sendReq = async () => {
            let response = await requestWeather(route.params.long, route.params.lat)
            
            let listWithSymbol = setWeatherSymbol(response)
            setResult(listWithSymbol)
        }
        sendReq();
    },[isFocused]);

    function setWeatherSymbol(weatherResult: WeatherObject[]) {

        weatherResult.forEach((timeStamp) => {

            if(timeStamp.symbol === 1 || timeStamp.symbol === 2){
                timeStamp.image = require("./../assets/weatherImg/sun.png")
            } else if(timeStamp.symbol === 3 || timeStamp.symbol === 4 || timeStamp.symbol === 5 || timeStamp.symbol === 6 || timeStamp.symbol === 7) {
                timeStamp.image = require("./../assets/weatherImg/cloudy.png")
            } else if(timeStamp.symbol === 8 || timeStamp.symbol === 9 || timeStamp.symbol === 10 || timeStamp.symbol === 11 || timeStamp.symbol === 12 || timeStamp.symbol === 13 || timeStamp.symbol === 14 || timeStamp.symbol === 18 || timeStamp.symbol === 19 || timeStamp.symbol === 20 || timeStamp.symbol === 22 || timeStamp.symbol === 23 || timeStamp.symbol === 24) {
                timeStamp.image = require("./../assets/weatherImg/rain.png")
            } else if(timeStamp.symbol === 15 || timeStamp.symbol === 16 || timeStamp.symbol === 17 || timeStamp.symbol === 25 || timeStamp.symbol === 26 || timeStamp.symbol === 27){
                timeStamp.image = require("./../assets/weatherImg/snowing.png")
            } else if (timeStamp.symbol === 21) {
                timeStamp.image = require("./../assets/weatherImg/storm.png")
            }
        })

        return weatherResult;


    }
    const image = require("./../assets/weatherImg/cloudy.png")

    let today: Date | number = new Date();
    today = today.getDate();
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <View style={styles.bannerTitleContainer}>
                    <Text style={{...styles.cityname, marginRight: "2%", color: "#696969"}}>{route.params.name ? route.params.name: route.params.cityName}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("modal", route.params)}>
                        <FontAwesome name={route.params.name ? "pencil" : "save" } size={25} color="gray" />
                    </TouchableOpacity>
                </View>
                {route.params.name ? <Text style={{color: "gray"}}>{route.params.cityName + ", " + route.params.region}</Text> : undefined}
            </View>

            <ScrollView style={styles.weatherList}>

                {
                    getResult ? (

                        getResult.map((timeStamp) => {
                            timeStamp.symbol.toString()
                            return (
                                <View key={timeStamp.id} style={styles.weatherListItem}>
                                    <View style={styles.dateContainer}>
                                    <Text>{timeStamp.hour}:00</Text>
                                    {today != timeStamp.date ? (
                                        <Text>{timeStamp.date}/8</Text>
                                    ): <Text>Idag</Text>}
                                    </View>
                                    <View style={styles.tempContainer}>
                                        <Text style={{fontSize: 25, marginRight: "1%"}}>{timeStamp.temp}</Text>
                                        <Image style={{width: 30, height: 30}} source={timeStamp.image}/>
                                    </View>
                                </View>
                        )
                    })
                    ) : undefined
                }

            </ScrollView>


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
        height: "20%",
        backgroundColor: "lightgray",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    }, bannerTitleContainer: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "lightgray",
    }, cityname: {
        fontSize: 32,
    }, weatherList: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    }, weatherListItem: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2%",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
    }, dateContainer: {
        width: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }, tempContainer: {
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
