import { IP } from "../ip";

export async function makeRequest(url: string, requestObject: RequestObject | undefined) {

    let response = await fetch(url, requestObject);

    return response;


}

export async function requestCity(city: string) {

    let response = await makeRequest(`http://${IP}/api/city/getcity/${city}`, undefined);

    let result: CityObject[] = await response.json();

    return result;

}

export async function requestWeather(long: string, lat: string) {

    let response = await makeRequest(`http://${IP}/api/weather/${long}/${lat}/`, undefined);

    let result: WeatherObject[] = await response.json();

    return result;

}

export async function requestFavorites() {

    let response = await makeRequest(`http://${IP}/api/city/favorites/all`, undefined);

    let result: FavoriteCity[] | false = await response.json();

    return result;

}

export async function addFavorite(city: NewFavoriteCity) {

    let body = JSON.stringify(city);

    let response = await makeRequest(`http://${IP}/api/city/savecity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })

    let result = response.json();

    return result;

}

export async function updateFavorite(favorite: FavoriteCity): Promise<Boolean> {

    let body = JSON.stringify(favorite);

    let response = await makeRequest(`http://${IP}/api/city/updatecity`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })

    let result = response.json();

    return result;

}

export async function removeFavorite(favorite: FavoriteCity): Promise<Boolean> {

    let body = JSON.stringify(favorite);

    let response = await makeRequest(`http://${IP}/api/city/removecity`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })

    let result = response.json();

    return result;

}

interface RequestObject {
    method: string,
    headers: {
        "Content-Type": string
    },
    body: string
}

export interface CityObject {
    cityName: string,
    region: string,
    long: string,
    lat: string,
}

export interface WeatherObject {
    id: string,
    hour: number,
    date: number,
    temp: number,
    symbol: number,
}

export interface NewFavoriteCity {
    name: string,
    cityName: string
    region: string,
    long: string,
    lat: string,
}

export interface FavoriteCity {
    name: string,
    cityName: string,
    region: string,
    lat: string,
    long: string,
    id: string,
}