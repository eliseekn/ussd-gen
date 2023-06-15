import {StatusBar, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 10,
        marginBottom: 10,
    },
})
