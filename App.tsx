import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RootStackParamList} from './src/interfaces'
import NavigationBar from './src/components/NavigationBar/NavigationBar'
import HomeScreen from './src/screens/HomeScreen'
import MobileOperatorScreen from './src/screens/MobileOperatorScreen'
import ServiceScreen from './src/screens/ServiceScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    header: props => <NavigationBar {...props} />,
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Historique des codes'}}
                />
                <Stack.Screen
                    name="MobileOperator"
                    component={MobileOperatorScreen}
                    options={{title: 'Générer un code USSD'}}
                />
                <Stack.Screen
                    name="Service"
                    component={ServiceScreen}
                    options={{title: 'Générer un code USSD'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
