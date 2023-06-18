import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {RootStackParamList, USSDCodeType} from '../../interfaces'
import type {RouteProp} from '@react-navigation/native'
import SouscriptionAppel from '../../components/Service/Orange/SouscriptionAppel'
import SouscriptionInternet from '../../components/Service/Orange/SouscriptionInternet'
import {Button, Dialog, Portal, Snackbar, Text} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY} from '../../const'
import {copyToClipboard, generateUSSDCode} from '../../utils'
import {addUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks'
import {RootState} from '../../services/redux/store'

type Props = RouteProp<RootStackParamList, 'Service'>

const ServiceScreen: React.FC = () => {
    const dispatch = useAppDispatch()

    const route = useRoute<Props>()
    const mobileOperator: string = route.params.mobileOperator
    const service: string = route.params.service

    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [USSDCodeId, setUSSDCodeId] = useState<number>(1)

    const toggleAlert = () => setAlert(!alert)
    const toggleAlertModal = () => setAlertModal(!alert)

    const USSDCodes: USSDCodeType[] = useAppSelector<USSDCodeType[]>(
        (state: RootState) => state.USSDCode,
    )

    const amount: string = useAppSelector<string>(
        (state: RootState) => state.amount,
    )

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const handleStoreData = async (): Promise<void> => {
        try {
            if (USSDCodes) {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(USSDCodes),
                )
            }
        } catch (err) {}
    }

    const handleGenerateCode = (): void => {
        const USSDCode: string = generateUSSDCode(
            'ORANGE',
            'SOUSCRIPTION APPEL',
            amount,
            duration,
        )

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: 'ORANGE',
                service: 'SOUSCRIPTION APPEL',
                value: USSDCode,
                description: duration ? duration + ' ' + amount : amount,
            } as USSDCodeType),
        )

        setUSSDCodeId((value: number) => value + 1)

        setAlertMessage('Code USSD : ' + USSDCode)
        setAlertModal(true)
    }

    const handleCopyToClipboard = (): void => {
        copyToClipboard(
            generateUSSDCode('ORANGE', 'SOUSCRIPTION APPEL', amount, duration),
        )
        setAlertModal(false)
        toggleAlert()
    }

    return (
        <SafeAreaView style={styles.container}>
            {mobileOperator === 'ORANGE' &&
                service === 'SOUSCRIPTION APPEL' && <SouscriptionAppel />}

            {mobileOperator === 'ORANGE' &&
                service === 'SOUSCRIPTION INTERNET' && <SouscriptionInternet />}

            <View style={{marginTop: 20}}>
                <Button
                    mode="contained"
                    icon="content-save"
                    uppercase={true}
                    onPress={() => {
                        handleGenerateCode()
                        handleStoreData()
                    }}>
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
