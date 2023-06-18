import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Dialog,
    Divider,
    Portal,
    RadioButton,
    Text,
} from 'react-native-paper'
import {useAppDispatch} from '../../../../services/redux/hooks'
import {setAmount} from '../../../../services/redux/reducers/amountReducer'
import {AMOUNT_OPTIONS} from '../../../../const'

const PassJour: React.FC = () => {
    const dispatch = useAppDispatch()

    const [amount, setTmpAmount] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetAmount = (value: string) => {
        setTmpAmount(value)
        dispatch(setAmount(value))
    }

    return (
        <View style={{marginTop: 15}}>
            <Text variant="bodyLarge" style={{marginBottom: 5}}>
                Sélectionnez un montant
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
                {amount}
            </Button>

            <Portal>
                <Dialog visible={modalVisible} onDismiss={toggleModal}>
                    <Dialog.Title>Montant</Dialog.Title>
                    <Divider />
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => {
                                handleSetAmount(value)
                                toggleModal()
                            }}
                            value={amount}>
                            {AMOUNT_OPTIONS[0].APPEL[0].JOUR.map(
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
    )
}

export default PassJour
