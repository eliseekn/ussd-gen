import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Text,
    Dialog,
    Portal,
    Snackbar,
    Divider,
    RadioButton,
} from 'react-native-paper'
import {generateUSSDCode, copyToClipboard} from '../../../../utils'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {addUSSDCode} from '../../../../services/redux/reducers/USSDCodeReducer'
import PassJour from './PassJour'
import PassSemaine from './PassSemaine'
import PassMois from './PassMois'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {DURATION_OPTIONS, STORAGE_KEY} from '../../../../const'
import {USSDCodeType} from '../../../../interfaces'

const SouscriptionAppel: React.FC = () => {
    const dispatch = useAppDispatch()

    const USSDCodes: USSDCodeType[] = useAppSelector<USSDCodeType[]>(
        (state: RootState) => state.USSDCode,
    )

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const amount: string = useAppSelector<string>(
        (state: RootState) => state.amount,
    )

    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [USSDCodeId, setUSSDCodeId] = useState<number>(0)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)
    const toggleAlert = () => setAlert(!alert)
    const toggleAlertModal = () => setAlertModal(!alert)

    const handleSetDuration = (value: string): void => {
        dispatch(setDuration(value))
    }

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

        setUSSDCodeId(USSDCodeId + 1)

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: 'ORANGE',
                service: 'SOUSCRIPTION APPEL',
                value: USSDCode,
                description: duration ? duration + ' ' + amount : amount,
            } as USSDCodeType),
        )

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
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <View>
                    <View>
                        <Text variant="bodyLarge" style={{marginBottom: 5}}>
                            Sélectionnez une durée
                        </Text>

                        <Button
                            mode="outlined"
                            icon="arrow-down-drop-circle-outline"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                                justifyContent: 'space-between',
                            }}
                            onPress={toggleModal}>
                            {duration}
                        </Button>

                        <Portal>
                            <Dialog
                                visible={modalVisible}
                                onDismiss={toggleModal}>
                                <Dialog.Title>Durée</Dialog.Title>
                                <Divider />
                                <Dialog.Content>
                                    <RadioButton.Group
                                        onValueChange={value => {
                                            handleSetDuration(value)
                                            toggleModal()
                                        }}
                                        value={duration}>
                                        {DURATION_OPTIONS.map(
                                            (value: string, i: number) => {
                                                return (
                                                    <RadioButton.Item
                                                        key={i}
                                                        label={value}
                                                        value={value}
                                                    />
                                                )
                                            },
                                        )}
                                    </RadioButton.Group>
                                </Dialog.Content>
                            </Dialog>
                        </Portal>
                    </View>

                    {duration === 'JOUR' && <PassJour />}
                    {duration === 'SEMAINE' && <PassSemaine />}
                    {duration === 'MOIS' && <PassMois />}
                </View>

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
                        <Dialog
                            visible={alertModal}
                            onDismiss={toggleAlertModal}>
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
            </View>

            <Snackbar
                visible={alert}
                onDismiss={toggleAlert}
                action={{label: 'OK', onPress: () => {}}}>
                Le code USSD a été copier avec succès
            </Snackbar>
        </View>
    )
}

export default SouscriptionAppel
