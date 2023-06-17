import React from 'react'
import {styles} from '../styles'
import {SafeAreaView} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {RootStackParamList} from '../../interfaces'
import type {RouteProp} from '@react-navigation/native'
import SouscriptionAppel from '../../components/Service/Orange/SouscriptionAppel'
import SouscriptionInternet from '../../components/Service/Orange/SouscriptionInternet'

type Props = RouteProp<RootStackParamList, 'Service'>

const ServiceScreen: React.FC = () => {
    const route = useRoute<Props>()
    const mobileOperator = route.params.mobileOperator
    const service = route.params.service

    return (
        <SafeAreaView style={styles.container}>
            {mobileOperator === 'ORANGE' &&
                service === 'SOUSCRIPTION APPEL' && <SouscriptionAppel />}

            {mobileOperator === 'ORANGE' &&
                service === 'SOUSCRIPTION INTERNET' && <SouscriptionInternet />}
        </SafeAreaView>
    )
}

export default ServiceScreen
