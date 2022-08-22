import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalScreen from '../screens/ModalScreen';
import RootScreen from '../screens/RootScreen';
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
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen 
                        name="modal"
                        component={ModalScreen} 
                        options={{title: "Spara ort"}}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );

}
