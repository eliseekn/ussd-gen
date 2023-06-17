import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Text,
    Dialog,
    Portal,
    RadioButton,
    Snackbar,
    Divider,
} from 'react-native-paper'
import PassMix from './PassMix'
import PassKdo from './PassKdo'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList, USSDCodeType} from '../../../interfaces'
import {CodeGenerator} from '../../../utils'
import {useAppDispatch, useAppSelector} from '../../../services/redux/hooks'
import {RootState} from '../../../services/redux/store'
import {addUSSDCode} from '../../../services/redux/reducers/USSDCodeReducer'

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
    const [pass, setPass] = useState<string>('')
    const [passVisible, setPassModalVisible] = useState<boolean>(false)
    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [USSDCodeId, setUSSDCodeId] = useState<number>(0)

    const togglePassModal = () => setPassModalVisible(!passVisible)
    const toggleAlert = () => setAlert(!alert)
    const toggleAlertModal = () => setAlertModal(!alert)

    const handleGenerateCode = () => {
        const USSDCode: string = CodeGenerator('ORANGE', pass, amount, duration)
        setUSSDCodeId(USSDCodeId + 1)

        const description: string = duration
            ? duration + ' - ' + amount
            : amount

        dispatch(
            addUSSDCode({
                id: USSDCodeId,
                mobileOperator: 'ORANGE',
                service: 'SOUSCRIPTION APPEL - PASS ' + pass,
                value: USSDCode,
                description: description,
            } as USSDCodeType),
        )

        setAlertMessage('Code USSD : ' + USSDCode)
        setAlertModal(true)
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <View>
                    <Text variant="bodyLarge" style={{marginBottom: 5}}>
                        Sélectionnez un PASS
                    </Text>

                    <Button
                        mode="outlined"
                        icon="arrow-down-drop-circle-outline"
                        contentStyle={{
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-between',
                        }}
                        onPress={togglePassModal}>
                        {pass}
                    </Button>

                    <Portal>
                        <Dialog
                            visible={passVisible}
                            onDismiss={togglePassModal}>
                            <Dialog.Title>PASS</Dialog.Title>
                            <Divider />
                            <Dialog.Content>
                                <RadioButton.Group
                                    onValueChange={value => {
                                        setPass(value)
                                        togglePassModal()
                                    }}
                                    value={pass}>
                                    <RadioButton.Item label="MIX" value="MIX" />
                                    <RadioButton.Item label="KDO" value="KDO" />
                                </RadioButton.Group>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                </View>

                {pass === 'MIX' && <PassMix />}
                {pass === 'KDO' && <PassKdo />}

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
                                <Button
                                    onPress={() => {
                                        setAlertModal(false)
                                        toggleAlert()
                                    }}>
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
