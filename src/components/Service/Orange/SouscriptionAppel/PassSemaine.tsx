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

const PassSemaine: React.FC = () => {
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
                            <RadioButton.Item
                                label="500 FCFA"
                                value="500 FCFA"
                            />
                            <RadioButton.Item
                                label="1000 FCFA"
                                value="1000 FCFA"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

export default PassSemaine
