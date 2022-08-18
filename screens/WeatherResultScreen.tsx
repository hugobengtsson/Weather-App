import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

interface PopulationResultProp {
    route: any;
}


export default function WeatherResultScreen({ route }: PopulationResultProp) {

    console.log(route.params)
    return (
        <View>
            <Text>Väder osv.</Text>
        </View>
    );




}

const styles = StyleSheet.create({

});
