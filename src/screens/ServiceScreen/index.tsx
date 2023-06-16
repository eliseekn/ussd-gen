import React from 'react'
import {styles} from '../styles'
import {SafeAreaView, ScrollView} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {RootStackParamList} from '../../interfaces'
import type {RouteProp} from '@react-navigation/native'
import SouscriptionAppel from '../../components/Service/Orange/SouscriptionAppel'

type Props = RouteProp<RootStackParamList, 'Service'>

const ServiceScreen: React.FC = () => {
    const route = useRoute<Props>()
    const mobileOperator = route.params.mobileOperator
    const service = route.params.service

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {mobileOperator === 'ORANGE' &&
                    service === 'SOUSCRIPTION APPEL' && <SouscriptionAppel />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ServiceScreen
