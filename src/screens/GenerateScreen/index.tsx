import React from 'react'
import {styles} from '../styles'
import {SafeAreaView} from 'react-native'
import {Text} from 'react-native-paper'

const GenerateScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Generate Screen</Text>
        </SafeAreaView>
    )
}

export default GenerateScreen
