import { IP } from "../ip";

export default async function makeRequest(city: string) {

    let response = await fetch(`http://${IP}/api/city/${city}`);

    let result: CityObject[] = await response.json();
    console.log(result)
    return result;


}



export interface CityObject {
    name: string,
    region: string,
    long: string,
    lat: string,
}