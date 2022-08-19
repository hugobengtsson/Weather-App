import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { requestWeather, WeatherObject } from '../functions/main';

interface PopulationResultProp {
    route: any;
}


export default function WeatherResultScreen({ route }: PopulationResultProp) {

    const [getResult, setResult] = useState<WeatherObject[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {

        requestWeather(route.params.long, route.params.lat).then((r) => {

            setResult(r)

        })
    
    },[]);

    let today: Date | number = new Date();
    today = today.getDate();

    return (
        <View style={styles.container}>

            <View style={styles.banner}>
                <Text style={styles.cityname}>{route.params.name}</Text>
            </View>

            <ScrollView style={styles.weatherList}>

                {
                    getResult ? (

                        getResult.map((timeStamp) => {
                            
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
                                        <FontAwesome name="sun-o" size={25}/>
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
