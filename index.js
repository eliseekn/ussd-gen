import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import {Provider as StoreProvider} from 'react-redux'
import {store} from './src/services/redux/store'
import {PaperProvider, MD3LightTheme} from 'react-native-paper'

function Main() {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={MD3LightTheme}>
                <App />
            </PaperProvider>
        </StoreProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main)
