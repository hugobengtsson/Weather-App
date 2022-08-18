import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootScreen from '../screens/RootScreen';
import TabOneScreen from '../screens/RootScreen';
import WeatherResultScreen from '../screens/WeatherResultScreen';

const Stack = createNativeStackNavigator();



export default function NavigationComponent() {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={RootScreen}
                    options={{ title: "Super Awesome Weather App" }}
                />
                <Stack.Screen
                name="WeatherResultScreen"
                component={WeatherResultScreen}
                options={{ title: "Vädret blir såhär:" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

}
