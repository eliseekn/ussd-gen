import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {RootStackParamList, USSDCodeType} from '../../interfaces'
import type {RouteProp} from '@react-navigation/native'
import SouscriptionAppel from '../../components/Service/Orange/SouscriptionAppel'
import SouscriptionInternet from '../../components/Service/Orange/SouscriptionInternet'
import {Button, Dialog, Portal, Snackbar, Text} from 'react-native-paper'
import {copyToClipboard, generateUSSDCode} from '../../utils'
import {addUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks'
import {RootState} from '../../services/redux/store'
import {incrementUSSDCodeId} from '../../services/redux/reducers/USSDCodeIdReducer'
import FactureCIE from '../../components/Service/Orange/FactureCIE'
import FactureSODECIE from '../../components/Service/Orange/FactureSODECIE'
import ReabonnementCANAL from '../../components/Service/Orange/ReabonnementCANAL'

type Props = RouteProp<RootStackParamList, 'Service'>

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
            case 'REABONNEMENT CANAL+':
                return <ReabonnementCANAL />
        }
    }

    return <></>
}

const ServiceScreen: React.FC = () => {
    const dispatch = useAppDispatch()

    const USSDCodeId: number = useAppSelector<number>(
        (state: RootState) => state.USSDCodeId,
    )

    const route = useRoute<Props>()
    const mobileOperator: string = route.params.mobileOperator
    const service: string = route.params.service

    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const toggleAlert = () => setAlert(!alert)
    const toggleAlertModal = () => setAlertModal(!alert)

    const amount: string = useAppSelector<string>(
        (state: RootState) => state.amount,
    )

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const handleGenerateCode = (): void => {
        const USSDCode: string = generateUSSDCode(
            mobileOperator,
            service,
            amount,
            duration,
        )

        dispatch(incrementUSSDCodeId())

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: mobileOperator,
                service: service,
                value: USSDCode,
                description: duration ? duration + ' - ' + amount : amount,
            } as USSDCodeType),
        )

        setAlertMessage('Code USSD : ' + USSDCode)
        setAlertModal(true)
    }

    const handleCopyToClipboard = (): void => {
        copyToClipboard(
            generateUSSDCode(mobileOperator, service, amount, duration),
        )
        setAlertModal(false)
        toggleAlert()
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
                    <Dialog visible={alertModal} onDismiss={toggleAlertModal}>
                        <Dialog.Content>
                            <Text variant="bodyLarge">{alertMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleCopyToClipboard}>
                                COPIER
                            </Button>
                            <Button onPress={() => setAlertModal(false)}>
                                OK
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

            <Snackbar
                visible={alert}
                onDismiss={toggleAlert}
                action={{label: 'OK', onPress: () => {}}}>
                Le code USSD a été copié avec succès.
            </Snackbar>
        </SafeAreaView>
    )
}

export default ServiceScreen
