import React, {useState, useEffect} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {ParameterType, RootStackParamList, USSDCodeType} from '../../interfaces'
import type {RouteProp} from '@react-navigation/native'
import SouscriptionAppel from '../../components/Service/Orange/SouscriptionAppel'
import SouscriptionInternet from '../../components/Service/Orange/SouscriptionInternet'
import {Button, Dialog, Portal, Text} from 'react-native-paper'
import {copyCodeToPhone, generateUSSDCode} from '../../utils'
import {addUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks'
import {RootState} from '../../services/redux/store'
import {incrementUSSDCodeId} from '../../services/redux/reducers/USSDCodeIdReducer'
import FactureCIE from '../../components/Service/Orange/FactureCIE'
import FactureSODECIE from '../../components/Service/Orange/FactureSODECIE'
import ReabonnementCANAL from '../../components/Service/Orange/ReabonnementCANAL'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Rechargement from '../../components/Service/Orange/Rechargement'

type Props = RouteProp<RootStackParamList, 'Service'>
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Service'>

const serviceComponent = (
    mobileOperator: string,
    service: string,
): JSX.Element => {
    if (mobileOperator === 'ORANGE') {
        switch (service) {
            case 'SOUSCRIPTION APPEL':
                return <SouscriptionAppel />
            case 'SOUSCRIPTION INTERNET':
                return <SouscriptionInternet />
            case 'FACTURE CIE':
                return <FactureCIE />
            case 'FACTURE SODECIE':
                return <FactureSODECIE />
            case 'REABONNEMENT CANAL':
                return <ReabonnementCANAL />
            default:
                return <Rechargement />
        }
    }

    return <></>
}

const handleSetHeaderTitle = (service: string): string => {
    switch (service) {
        case 'SOUSCRIPTION APPEL':
            return 'Souscription Appel'
        case 'SOUSCRIPTION INTERNET':
            return 'Souscription Internet'
        case 'FACTURE CIE':
            return 'Facture CIE'
        case 'FACTURE SODECIE':
            return 'Facture SODECIE'
        case 'REABONNEMENT CANAL':
            return 'Réabonnement CANAL'
        default:
            return 'Rechargement'
    }
}

const ServiceScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const dispatch = useAppDispatch()

    const USSDCodeId: number = useAppSelector<number>(
        (state: RootState) => state.USSDCodeId,
    )

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    useEffect(() => {
        navigation.setOptions({
            title: handleSetHeaderTitle(route.params.service),
        })
    }, [])

    const route = useRoute<Props>()
    const mobileOperator: string = route.params.mobileOperator
    const service: string = route.params.service

    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const toggleAlert = () => setAlert(!alert)

    const handleSetDescription = () => {
        return [
            parameter.duration ?? '',
            parameter.account ?? '',
            parameter.amount ? parameter.amount + ' FCFA' : '',
            parameter.contact ?? '',
        ]
            .filter(Boolean)
            .join('-')
    }

    const handleGenerateCode = (): void => {
        const USSDCode: string = generateUSSDCode(
            mobileOperator,
            service,
            parameter,
        )

        dispatch(incrementUSSDCodeId())

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: mobileOperator,
                service: service,
                value: USSDCode,
                description: handleSetDescription(),
            } as USSDCodeType),
        )

        setAlertMessage('Code USSD : ' + USSDCode)
        setAlert(true)
    }

    const handleCopyCodeToPhone = async (): Promise<void> => {
        setAlert(false)
        await copyCodeToPhone(
            generateUSSDCode(mobileOperator, service, parameter),
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {serviceComponent(mobileOperator, service)}

            <View style={{marginTop: 20}}>
                <Button
                    mode="contained"
                    icon="content-save"
                    uppercase={true}
                    onPress={handleGenerateCode}>
                    Générer
                </Button>

                <Portal>
                    <Dialog visible={alert} onDismiss={toggleAlert}>
                        <Dialog.Content>
                            <Text variant="bodyLarge">{alertMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleCopyCodeToPhone}>
                                COPIER
                            </Button>
                            <Button onPress={() => setAlert(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </SafeAreaView>
    )
}

export default ServiceScreen
