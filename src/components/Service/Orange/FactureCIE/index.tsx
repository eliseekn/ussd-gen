import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Dialog,
    Divider,
    Portal,
    RadioButton,
    Text,
    TextInput,
} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'
import {setAmount} from '../../../../services/redux/reducers/amountReducer'

const FactureCIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const [amount, setTmpAmount] = useState<string>('')
    const [accountNumber, setAccountNumber] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetDuration = (value: string): void => {
        dispatch(setDuration(value))
    }

    const handleSetAmount = (value: string) => {
        setTmpAmount(value)
        dispatch(setAmount(value))
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez un service
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    style={{backgroundColor: 'white'}}
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleModal}>
                    {duration}
                </Button>

                <Portal>
                    <Dialog visible={modalVisible} onDismiss={toggleModal}>
                        <Dialog.Title>Service</Dialog.Title>
                        <Divider />
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={(value: string) => {
                                    handleSetDuration(value)
                                    toggleModal()
                                }}
                                value={duration}>
                                <RadioButton.Item
                                    label="SERVICE PREPAYE"
                                    value="SERVICE PREPAYE"
                                />
                                <RadioButton.Item
                                    label="SERVICE POSTPAYE"
                                    value="SERVICE POSTPAYE"
                                />
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            <View style={{marginTop: 15}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Numéro du compteur
                </Text>

                <TextInput
                    mode="outlined"
                    placeholder="Entrez le numéro du compteur (9 chiffres)"
                    outlineStyle={{
                        borderRadius: 30,
                        borderWidth: 0.8,
                    }}
                    style={{backgroundColor: 'white'}}
                    value={accountNumber}
                    onChangeText={(text: string) => setAccountNumber(text)}
                    maxLength={9}
                />
            </View>

            {duration === 'SERVICE PREPAYE' && (
                <View style={{marginTop: 15}}>
                    <Text variant="bodyLarge" style={{marginBottom: 5}}>
                        Montant du rechargement
                    </Text>

                    <TextInput
                        mode="outlined"
                        placeholder="Entrez le montant du rechargement"
                        outlineStyle={{borderRadius: 30, borderWidth: 0.8}}
                        style={{backgroundColor: 'white'}}
                        value={amount}
                        onChangeText={handleSetAmount}
                    />
                </View>
            )}
        </View>
    )
}

export default FactureCIE
