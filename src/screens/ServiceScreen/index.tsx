import React, {useState, useEffect} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View, Alert} from 'react-native'
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

    const handleSetAlertMessage = (code: string) => {
        setAlertMessage('Code USSD : ' + code)
        setAlert(true)
    }

    const handleSetDescription = (): string => {
        return [
            parameter.duration ?? '',
            parameter.account ?? '',
            parameter.amount ? parameter.amount + ' FCFA' : '',
            parameter.contact ? parameter.contactNumber : '',
        ]
            .filter(Boolean)
            .join('-')
    }

    const handleValidateParameter = (): boolean => {
        if (service === 'RECHARGEMENT' && parameter.amount === '') {
            Alert.alert('', 'Vous devez entrer un montant.')
            return false
        }

        if (
            ['SOUSCRIPTION APPEL', 'SOUSCRIPTION INTERNET'].includes(service) &&
            parameter.duration === ''
        ) {
            Alert.alert('', 'Vous devez sélectionner une durée.')
            return false
        }

        if (
            ['SOUSCRIPTION APPEL', 'SOUSCRIPTION INTERNET'].includes(service) &&
            parameter.amount === ''
        ) {
            Alert.alert('', 'Vous devez sélectionner un montant.')
            return false
        }

        if (
            [
                'SOUSCRIPTION APPEL',
                'SOUSCRIPTION INTERNET',
                'RECHARGEMENT',
            ].includes(service) &&
            parameter.contact &&
            parameter.contactNumber?.length !== 10
        ) {
            Alert.alert(
                '',
                'Le numéro de téléphone du contact doit être de 10 chiffres.',
            )
            return false
        }

        if (
            ['FACTURE CIE', 'FACTURE SODECIE', 'REABONNEMENT CANAL'].includes(
                service,
            )
        ) {
            if (parameter.account === '') {
                Alert.alert(
                    '',
                    `Vous devez entrer le numéro${
                        service === 'REABONNEMENT CANAL'
                            ? ' d\'abonnement'
                            : ' du compteur'
                    }.`,
                )
                return false
            } else {
                if (
                    service === 'FACTURE CIE' &&
                    parameter.account?.length !== 11
                ) {
                    Alert.alert(
                        '',
                        'Le numéro du compteur doit être de 11 chiffres.',
                    )
                    return false
                }

                if (
                    service === 'FACTURE SODECIE' &&
                    parameter.account?.length !== 9
                ) {
                    Alert.alert(
                        '',
                        'Le numéro du compteur doit être de 9 chiffres.',
                    )
                    return false
                }

                if (
                    service === 'REABONNEMENT CANAL' &&
                    parameter.account?.length !== 14
                ) {
                    Alert.alert(
                        '',
                        'Le numéro d\'abonnement doit être de 14 chiffres.',
                    )
                    return false
                }
            }
        }

        if (
            service === 'FACTURE CIE' &&
            parameter.prepaidBill &&
            parameter.amount === ''
        ) {
            Alert.alert('', 'Vous devez entrer un montant.')
            return false
        }

        return true
    }

    const handleGenerateCode = (): void => {
        if (handleValidateParameter()) {
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

            handleSetAlertMessage(USSDCode)
        }
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
