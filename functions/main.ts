import { IP } from "../ip";

export default async function makeRequest() {

    let response = await fetch(`http://${IP}/api/city/laholm`);

    let result = await response.json();

    console.log(result)


}