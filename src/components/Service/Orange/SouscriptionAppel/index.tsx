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
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList, USSDCodeType} from '../../../../interfaces'
import {CodeGenerator} from '../../../../utils'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {addUSSDCode} from '../../../../services/redux/reducers/USSDCodeReducer'
import Clipboard from '@react-native-clipboard/clipboard'
import PassJour from './PassJour'
import PassSemaine from './PassSemaine'
import PassMois from './PassMois'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Service'>

const SouscriptionAppel: React.FC = () => {
    const dispatch = useAppDispatch()

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const amount: string = useAppSelector<string>(
        (state: RootState) => state.amount,
    )

    const navigation = useNavigation<NavigationProp>()
    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [USSDCodeId, setUSSDCodeId] = useState<number>(0)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)
    const toggleAlert = () => setAlert(!alert)
    const toggleAlertModal = () => setAlertModal(!alert)

    const handleSetDuration = (value: string) => {
        dispatch(setDuration(value))
    }

    const handleGenerateCode = () => {
        const USSDCode: string = CodeGenerator(
            'ORANGE',
            'SOUSCRIPTION APPEL',
            amount,
            duration,
        )
        setUSSDCodeId(USSDCodeId + 1)

        const description: string = duration
            ? duration + ' - ' + amount
            : amount

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: 'ORANGE',
                service: 'SOUSCRIPTION APPEL',
                value: USSDCode,
                description: description,
            } as USSDCodeType),
        )

        setAlertMessage('Code USSD : ' + USSDCode)
        setAlertModal(true)
    }

    const handleCopyToClipboard = () => {
        Clipboard.setString(
            CodeGenerator('ORANGE', 'SOUSCRIPTION APPEL', amount, duration),
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
                                        <RadioButton.Item
                                            label="JOUR"
                                            value="JOUR"
                                        />
                                        <RadioButton.Item
                                            label="SEMAINE"
                                            value="SEMAINE"
                                        />
                                        <RadioButton.Item
                                            label="MOIS"
                                            value="MOIS"
                                        />
                                    </RadioButton.Group>
                                </Dialog.Content>
                            </Dialog>
                        </Portal>
                    </View>

                    {duration === 'JOUR' && <PassJour />}
                    {duration === 'SEMAINE' && <PassSemaine />}
                    {duration === 'MOIS' && <PassMois />}
                </View>

                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Button
                        style={{width: 180}}
                        mode="contained"
                        icon="arrow-left"
                        uppercase={true}
                        onPress={() => navigation.navigate('MobileOperator')}>
                        Précédent
                    </Button>

                    <Button
                        style={{width: 180}}
                        mode="contained"
                        icon="content-save"
                        uppercase={true}
                        onPress={() => handleGenerateCode()}>
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
