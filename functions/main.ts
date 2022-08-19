import { IP } from "../ip";

export async function makeRequest(url: string) {

    let response = await fetch(url);

    return response;


}

export async function requestCity(city:string) {

    let response = await makeRequest(`http://${IP}/api/city/${city}`);

    let result: CityObject[] = await response.json();

    return result;

}

export async function requestWeather(long: string, lat: string) {

    let response = await makeRequest(`http://${IP}/api/weather/${long}/${lat}/`);

    let result: WeatherObject[] = await response.json();

    return result;


}


export interface CityObject {
    name: string,
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
